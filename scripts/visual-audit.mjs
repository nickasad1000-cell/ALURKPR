import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const BASE = 'http://localhost:3000';
const OUT = path.join(process.env.TEMP || '.', 'alurkpr-maudit');
fs.mkdirSync(OUT, { recursive: true });

const DESKTOP = { width: 1280, height: 960 };
const MOBILE = { width: 390, height: 844 }; // iPhone 14 Pro

const DESKTOP_ROUTES = [
  '', 'kalkulator', 'mampu-beli', 'planner-dp', 'sewa-vs-beli',
  'checklist', 'profil-kamu', 'tentang', 'faq', 'glosarium',
  'syarat', 'privasi', 'hubungi', 'panduan',
  'panduan/tahap-1-cek-keuangan-dan-kelayakan',
  'panduan/tahap-4-ajukan-kpr',
  'panduan/tahap-8-serah-terima',
];

const MOBILE_ROUTES = ['', 'kalkulator', 'checklist', 'planner-dp', 'panduan'];

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();

// Desktop screenshots
for (const route of DESKTOP_ROUTES) {
  const slug = route === '' ? 'home' : route.replace(/\//g, '-');
  await page.setViewport(DESKTOP);
  await page.goto(`${BASE}/${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
  // Wait a bit for fonts/animations to settle
  await new Promise(r => setTimeout(r, 800));
  // Full page screenshot
  await page.screenshot({ path: path.join(OUT, `desktop-${slug}.png`), fullPage: true });
  console.log(`✓ desktop-${slug}`);
}

// Mobile screenshots
for (const route of MOBILE_ROUTES) {
  const slug = route === '' ? 'home' : route.replace(/\//g, '-');
  await page.setViewport(MOBILE);
  await page.goto(`${BASE}/${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUT, `mobile-${slug}.png`), fullPage: true });
  console.log(`✓ mobile-${slug}`);
}

await browser.close();
console.log(`\nAll screenshots saved to: ${OUT}`);
