import { useNavigate } from "react-router";
import svgPaths from "../../imports/Landing/svg-kpsqtc8fir";
import { useBreakpoints } from "./useBreakpoints";

export function SiteHeader() {
  const navigate = useNavigate();
  const { isCompact } = useBreakpoints();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
        width: "100%",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isCompact ? "20px 20px" : "20px 80px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/")}
        >
          <div
            style={{
              width: isCompact ? "60px" : "72.54px",
              height: isCompact ? "25px" : "30px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 72.55 30.01"
            >
              <path d={svgPaths.p30f9a200} fill="var(--primary)" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
