import { ImageResponse } from "next/og";

export const alt =
  "AlurKPR — Panduan KPR Rumah Pertama dari A sampai Z";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = ["8 tahap panduan", "Simulasi angsuran", "Cek kelayakan FLPP"];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#faf6ef",
          color: "#1c1917",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px", fontSize: "34px", fontWeight: 700 }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "18px",
                backgroundColor: "#0f766e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11.5 12 4l9 7.5" />
                <path d="M5 10v9h4.5v-4.5h5V19H19v-9" />
              </svg>
            </div>
            <span>
              Alur<span style={{ color: "#0f766e" }}>KPR</span>
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
            <div style={{ fontSize: "84px", fontWeight: 700, lineHeight: 1.05, maxWidth: "980px" }}>
              Rumah pertama itu mungkin, kalau alurnya kamu pahami.
            </div>
            <div style={{ fontSize: "40px", color: "#57534e" }}>
              Panduan KPR subsidi & komersial — dari A sampai Z.
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            {chips.map((t) => (
              <div
                key={t}
                style={{
                  borderRadius: "999px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e7e0d5",
                  padding: "14px 26px",
                  fontSize: "24px",
                  color: "#0f766e",
                  fontWeight: 600,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}