const { chromium } = require('playwright');

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = {
    url: 'http://localhost:3111',
    timestamp: new Date().toISOString(),
    headings: [],
    images: [],
    forms: [],
    links: [],
    buttons: [],
    landmarks: [],
    focusable: [],
    contrast: [],
    aria: [],
    other: []
  };

  try {
    await page.goto('http://localhost:3111', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    // 1. Heading hierarchy
    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', els => 
      els.map(el => ({
        tag: el.tagName.toLowerCase(),
        text: el.textContent?.trim().slice(0, 100),
        id: el.id || null,
        level: parseInt(el.tagName[1])
      }))
    );
    results.headings = headings;

    // Check heading order
    let lastLevel = 0;
    for (const h of headings) {
      if (h.level > lastLevel + 1) {
        results.other.push({ type: 'heading-skip', message: `Heading level jump: ${lastLevel} -> ${h.level}`, text: h.text });
      }
      lastLevel = h.level;
    }
    if (headings.filter(h => h.level === 1).length !== 1) {
      results.other.push({ type: 'h1-count', message: `Expected exactly 1 H1, found ${headings.filter(h => h.level === 1).length}` });
    }

    // 2. Images - alt text
    const images = await page.$$eval('img', els =>
      els.map(el => ({
        src: el.src,
        alt: el.alt,
        hasAlt: el.hasAttribute('alt'),
        altEmpty: el.alt === '',
        role: el.getAttribute('role'),
        width: el.naturalWidth,
        height: el.naturalHeight
      }))
    );
    results.images = images;
    for (const img of images) {
      if (!img.hasAlt) {
        results.other.push({ type: 'missing-alt', message: `Image missing alt attribute`, src: img.src });
      } else if (img.altEmpty && img.role !== 'presentation') {
        results.other.push({ type: 'empty-alt', message: `Image has empty alt but not decorative`, src: img.src });
      }
    }

    // 3. Forms - labels, required, autocomplete
    const inputs = await page.$$eval('input, select, textarea', els =>
      els.map(el => ({
        tag: el.tagName.toLowerCase(),
        type: el.type || (el.tagName.toLowerCase() === 'select' ? 'select' : 'textarea'),
        id: el.id,
        name: el.name,
        required: el.required,
        ariaLabel: el.getAttribute('aria-label'),
        ariaLabelledBy: el.getAttribute('aria-labelledby'),
        placeholder: el.placeholder,
        autocomplete: el.getAttribute('autocomplete'),
        labelText: null
      }))
    );
    // Find associated labels
    for (const input of inputs) {
      if (input.id) {
        const label = await page.$(`label[for="${input.id}"]`);
        if (label) {
          input.labelText = await label.textContent();
        }
      }
      // Check if wrapped in label
      const parentLabel = await page.$(`label:has(#${input.id})`);
      if (parentLabel && !input.labelText) {
        input.labelText = await parentLabel.textContent();
      }
    }
    results.forms = inputs;
    for (const input of inputs) {
      if (!input.labelText && !input.ariaLabel && !input.ariaLabelledBy) {
        results.other.push({ type: 'missing-label', message: `Input missing accessible name`, input });
      }
      if (input.required && !input.autocomplete) {
        results.other.push({ type: 'missing-autocomplete', message: `Required input missing autocomplete`, input });
      }
    }

    // 4. Links - discernible text
    const links = await page.$$eval('a[href]', els =>
      els.map(el => ({
        href: el.href,
        text: el.textContent?.trim(),
        ariaLabel: el.getAttribute('aria-label'),
        title: el.getAttribute('title'),
        hasText: (el.textContent?.trim().length || 0) > 0
      }))
    );
    results.links = links;
    for (const link of links) {
      if (!link.hasText && !link.ariaLabel) {
        results.other.push({ type: 'link-no-name', message: `Link has no discernible text`, href: link.href });
      }
    }

    // 5. Buttons - accessible name
    const buttons = await page.$$eval('button, [role="button"]', els =>
      els.map(el => ({
        tag: el.tagName.toLowerCase(),
        text: el.textContent?.trim(),
        ariaLabel: el.getAttribute('aria-label'),
        ariaLabelledBy: el.getAttribute('aria-labelledby'),
        disabled: el.disabled || el.getAttribute('aria-disabled') === 'true',
        type: el.getAttribute('type') || 'button'
      }))
    );
    results.buttons = buttons;
    for (const btn of buttons) {
      if (!btn.text && !btn.ariaLabel && !btn.ariaLabelledBy) {
        results.other.push({ type: 'button-no-name', message: `Button has no accessible name`, button: btn });
      }
    }

    // 6. Landmarks
    const landmarks = await page.$$eval('main, nav, header, footer, aside, section[aria-label], section[aria-labelledby], [role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], [role="complementary"], [role="search"]', els =>
      els.map(el => ({
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute('role') || (el.tagName.toLowerCase() === 'main' ? 'main' : el.tagName.toLowerCase()),
        ariaLabel: el.getAttribute('aria-label'),
        ariaLabelledBy: el.getAttribute('aria-labelledby'),
        id: el.id
      }))
    );
    results.landmarks = landmarks;
    const hasMain = landmarks.some(l => l.role === 'main' || l.tag === 'main');
    if (!hasMain) {
      results.other.push({ type: 'missing-main', message: 'Page missing main landmark' });
    }

    // 7. Focusable elements - tab order, focus styles
    const focusable = await page.$$eval('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"], [role="link"], [role="menuitem"]', async (els) => {
      const out = [];
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const style = window.getComputedStyle(el);
          out.push({
            tag: el.tagName.toLowerCase(),
            id: el.id,
            class: el.className,
            tabindex: el.getAttribute('tabindex'),
            visible: style.visibility !== 'hidden' && style.display !== 'none',
            focusStyle: style.outline || style.boxShadow
          });
        }
      }
      return out;
    });
    results.focusable = focusable;

    // 8. ARIA attributes validation
    const allElements = await page.$$eval('*', els =>
      els.filter(el => [...el.attributes].some(a => a.name.startsWith('aria-'))).map(el => {
        const attrs = {};
        for (const a of el.attributes) {
          if (a.name.startsWith('aria-')) attrs[a.name] = a.value;
        }
        return {
          tag: el.tagName.toLowerCase(),
          id: el.id,
          class: el.className,
          attrs
        };
      })
    );
    results.aria = allElements;

    // 9. Color contrast - simplified check using computed styles
    const textElements = await page.$$eval('p, h1, h2, h3, h4, h5, h6, span, a, button, label, li, td, th', async (els) => {
      const out = [];
      for (const el of els) {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bgColor = style.backgroundColor;
        if (color && bgColor && color !== 'rgba(0, 0, 0, 0)' && bgColor !== 'rgba(0, 0, 0, 0)') {
          out.push({
            tag: el.tagName.toLowerCase(),
            text: el.textContent?.trim().slice(0, 50),
            color,
            bgColor,
            fontSize: style.fontSize
          });
        }
      }
      return out;
    });
    results.contrast = textElements.slice(0, 50);

    // 10. Check for specific patterns
    const skipLink = await page.$('a[href="#main"], a[href="#content"], a.skip-link');
    if (!skipLink) {
      results.other.push({ type: 'missing-skip-link', message: 'No skip-to-main link found' });
    }

    const htmlLang = await page.getAttribute('html', 'lang');
    if (!htmlLang) {
      results.other.push({ type: 'missing-lang', message: 'HTML element missing lang attribute' });
    }

    const viewport = await page.$('meta[name="viewport"]');
    if (!viewport) {
      results.other.push({ type: 'missing-viewport', message: 'Missing viewport meta tag' });
    }

    const reducedMotion = await page.evaluate(() => 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    results.other.push({ type: 'reduced-motion', prefersReduced: reducedMotion });

  } catch (e) {
    results.error = e.message;
  }

  await browser.close();
  return results;
}

runAudit().then(r => {
  console.log(JSON.stringify(r, null, 2));
}).catch(e => {
  console.error(e);
  process.exit(1);
});