import { ArrowUp, Mail } from "lucide-react";
import svgPaths from "../assets/Landing/svg-kpsqtc8fir";
import { useBreakpoints } from "../hooks/useBreakpoints";
import IcFacebook from "../assets/IcFacebook/IcFacebook";
import IcInstagram from "../assets/IcInstagram/IcInstagram";
import IcYoutube from "../assets/IcYoutube/IcYoutube";

const SOCIAL_LINKS = [
  { Component: IcFacebook, label: "Facebook", href: "https://www.facebook.com/locobikehk" },
  { Component: IcInstagram, label: "Instagram", href: "https://www.instagram.com/loco.bike" },
  { Component: IcYoutube, label: "YouTube", href: "https://www.youtube.com/channel/UCpd1BDpjvPZB1q7wlgp_PDg/featured" },
];

const SERVICE_LINKS = [
  { label: "LocoBike", href: "https://loco.hk/zh-HK/bike" },
  { label: "LocoMart", href: "https://mart.loco.hk/" },
];

export function SiteFooter() {
  const { isMobile, isTablet, isDesktop } = useBreakpoints();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const hPad = isMobile ? "20px" : isTablet ? "40px" : "80px";
  const vPad = isMobile ? "40px" : isTablet ? "56px" : "80px";

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-family-roboto)",
    fontSize: "var(--text-base)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--primary-foreground)",
    letterSpacing: "0.15px",
    lineHeight: "24px",
    textDecoration: "none",
    padding: "2px 0",
    display: "block",
    transition: "opacity 0.15s ease",
  };

  return (
    <footer
      style={{
        backgroundColor: "var(--colour\\/blue\\/800, #112c39)",
        padding: `${vPad} ${hPad}`,
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "32px" : "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          gap: isDesktop ? "20px" : "32px",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* Left cluster: logo + columns */}
        <div
          style={{
            flex: isDesktop ? "1 1 0" : "none",
            width: isDesktop ? undefined : "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            flexWrap: isMobile ? "nowrap" : "wrap",
            gap: isMobile ? "28px" : "20px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <div style={{ width: "109px", height: "45px", position: "relative", overflow: "hidden" }}>
              <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 109.015 45.015"
              >
                <path d={svgPaths.p1c831400} fill="var(--primary)" />
              </svg>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "auto auto",
              gap: isMobile ? "28px 20px" : "0 40px",
              flex: 1,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <p
                style={{
                  fontFamily: "var(--font-family-roboto)",
                  fontSize: "var(--text-h3)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--primary-foreground)",
                  margin: 0,
                  lineHeight: "28px",
                }}
              >
                服務範圍
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {SERVICE_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div
              style={{
                gridColumn: isMobile ? "1 / -1" : undefined,
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-family-roboto)",
                  fontSize: "var(--text-h3)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--primary-foreground)",
                  margin: 0,
                  lineHeight: "28px",
                }}
              >
                追蹤我們
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {SOCIAL_LINKS.map(({ Component, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      padding: 0,
                      flexShrink: 0,
                      position: "relative",
                      overflow: "hidden",
                      display: "block",
                      transition: "opacity 0.15s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.8")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                  >
                    <Component />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: scroll-to-top + Contact Us */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: isDesktop ? "column" : "row",
            alignItems: isDesktop ? "flex-end" : "center",
            justifyContent: isDesktop ? undefined : "space-between",
            gap: "24px",
            width: isDesktop ? undefined : "100%",
          }}
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "1px solid var(--primary)",
              background: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--primary)",
              flexShrink: 0,
              transition: "background-color 0.15s ease",
              order: isDesktop ? 0 : 1,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(68,176,226,0.1)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent")}
          >
            <ArrowUp size={24} />
          </button>

          <a
            href="https://www.locolla.com/contact/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              height: "48px",
              padding: "8px 16px",
              borderRadius: "360px",
              border: "2px solid var(--primary)",
              backgroundColor: "var(--primary)",
              fontFamily: "var(--font-family-roboto)",
              fontSize: "var(--text-label)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--primary-foreground)",
              letterSpacing: "0.1px",
              whiteSpace: "nowrap",
              textDecoration: "none",
              transition: "opacity 0.15s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            <Mail size={16} />
            聯絡我們
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          gap: "12px",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: "24px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-family-roboto)",
            fontSize: "var(--text-label)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--primary-foreground)",
            margin: 0,
            letterSpacing: "0.1px",
            lineHeight: "20px",
          }}
        >
          Copyright © 2026 Locolla.com
        </p>
        <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
          {[
            { label: "隱私政策", href: "https://loco.hk/zh-HK/bike/tnc" },
            { label: "條款及細則", href: "https://loco.hk/zh-HK/bike/tnc" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-family-roboto)",
                fontSize: "var(--text-label)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--primary-foreground)",
                letterSpacing: "0.1px",
                lineHeight: "20px",
                textDecoration: "none",
                transition: "opacity 0.15s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
