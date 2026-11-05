import { ImageResponse } from "next/og";
export const alt =
  "BETAROG — We Build What's Next. AI & Software Innovation Studio.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#07080D",
        color: "#F5F7FF",
        padding: "60px 70px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: 3 }}>
          BETAROG
        </span>
        <span style={{ color: "#bda0ff", fontSize: 18 }}>
          INNOVATION IN MOTION
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 103,
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: -5,
        }}
      >
        <span>WE BUILD</span>
        <span style={{ color: "#c5a2ff" }}>WHAT’S NEXT.</span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #37323f",
          paddingTop: 25,
          fontSize: 20,
          color: "#969AAC",
          letterSpacing: 3,
        }}
      >
        AI & SOFTWARE INNOVATION STUDIO
      </div>
    </div>,
    size,
  );
}
