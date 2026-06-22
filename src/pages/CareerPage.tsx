import { useNavigate } from "react-router";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { useBreakpoints } from "../hooks/useBreakpoints";
import heroBanner from "../assets/IMG_1759_retouch.jpg";
import whyImage1 from "../assets/Frame_2.jpg";
import whyImage2 from "../assets/j6mlo8j6mlo8j6ml.png";

export function CareerPage() {
  const navigate = useNavigate();
  const { isMobile, isTablet, isDesktop } = useBreakpoints();
  const jobs = useQuery(api.jobs.list) ?? [];

  const hPad = isMobile ? "20px" : isTablet ? "40px" : "80px";

  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        fontFamily: "var(--font-family-roboto)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SiteHeader />

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: isMobile ? "380px" : isTablet ? "460px" : "520px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={heroBanner}
            alt="LocoBike team"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(17,44,57,0.88) 0%, rgba(17,44,57,0.5) 60%, rgba(17,44,57,0.15) 100%)",
            }}
          />
          <div
            style={{
              position: "relative",
              maxWidth: "1280px",
              margin: "0 auto",
              padding: isMobile ? "3rem 20px" : isTablet ? "4rem 40px" : "5rem 80px",
              width: "100%",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-family-roboto)",
                fontSize: "var(--text-label)",
                fontWeight: "var(--font-weight-semibold)",
                color: "var(--primary)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              誠徵人才
            </p>
            <h1
              style={{
                fontFamily: "var(--font-family-roboto)",
                fontSize: isMobile ? "var(--text-h2)" : "clamp(2rem, 5vw, 3rem)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--primary-foreground)",
                lineHeight: "1.2",
                maxWidth: "560px",
                marginBottom: "1.25rem",
              }}
            >
              共建有意義的事業
            </h1>
            <p
              style={{
                fontFamily: "var(--font-family-roboto)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-regular)",
                color: "rgba(255,255,255,0.8)",
                maxWidth: isMobile ? "100%" : "440px",
                lineHeight: "1.7",
                marginBottom: "2rem",
              }}
            >
              加入我們，一起實踐改變人們出行方式。
            </p>
            <button
              onClick={() => document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                fontFamily: "var(--font-family-roboto)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-semibold)",
                padding: "0.875rem 1.75rem",
                borderRadius: "var(--radius-button)",
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.15s ease",
                letterSpacing: "0.15px",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            >
              查看職位空缺
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* Why join us */}
        <section
          style={{
            backgroundColor: "var(--accent)",
            padding: isMobile ? "3rem 20px" : isTablet ? "4rem 40px" : "5rem 80px",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
              gap: isDesktop ? "4rem" : "2.5rem",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-family-roboto)",
                  fontSize: "var(--text-h2)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--foreground)",
                  lineHeight: "1.3",
                  marginBottom: "1.25rem",
                }}
              >
                為何加入 LocoBike？
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-family-roboto)",
                  fontSize: "var(--text-base)",
                  color: "var(--accent-foreground)",
                  lineHeight: "1.9",
                  margin: 0,
                }}
              >
                在 LocoBike，我們深信每一段偉大的旅程都需要夥伴同行。隨著我們從香港邁向新起點，運用專利的 AI
                與物聯網科技推動越南電動摩托車的綠色發展，我們誠摯地邀請您前來加入我們。不論您的背景如何，只要您同樣關心綠色科技與可持續發展，我們都衷心歡迎您成為我們的一員，一起成長，攜手前行！
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[whyImage1, whyImage2].map((src, i) => (
                <div key={i} style={{ borderRadius: "var(--radius-card)", overflow: "hidden", aspectRatio: "3 / 4" }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open positions */}
        <section
          id="openings"
          style={{ padding: isMobile ? "3rem 20px" : isTablet ? "4rem 40px" : "5rem 80px" }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ marginBottom: "2rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-family-roboto)",
                  fontSize: "var(--text-h2)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--foreground)",
                  marginBottom: "0.5rem",
                }}
              >
                職位空缺
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-family-roboto)",
                  fontSize: "var(--text-base)",
                  color: "var(--colour\\/grey\\/500, #515151)",
                }}
              >
                {jobs.length > 0 ? `現有 ${jobs.length} 個職位空缺` : "職位空缺即將更新"}
              </p>
            </div>

            {jobs.length === 0 && (
              <p
                style={{
                  fontFamily: "var(--font-family-roboto)",
                  fontSize: "var(--text-base)",
                  color: "var(--muted-foreground)",
                  padding: "3rem 0",
                  textAlign: "center",
                }}
              >
                暫時沒有空缺，請稍後再查看。
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {jobs.map((job) => (
                <button
                  key={job._id}
                  onClick={() => navigate(`/jobs/${job.slug}`)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-card)",
                    padding: isMobile ? "1.25rem" : "1.75rem 2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    transition: "box-shadow 0.15s ease, border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.boxShadow = "var(--elevation-sm)";
                    el.style.borderColor = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.boxShadow = "none";
                    el.style.borderColor = "var(--border)";
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-family-roboto)",
                          fontSize: isMobile ? "var(--text-h4)" : "var(--text-h3)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--card-foreground)",
                          margin: 0,
                        }}
                      >
                        {job.title}
                      </h3>
                      <span
                        style={{
                          backgroundColor: "var(--muted)",
                          color: "var(--primary)",
                          fontFamily: "var(--font-family-roboto)",
                          fontSize: "var(--text-label)",
                          fontWeight: "var(--font-weight-medium)",
                          padding: "0.15rem 0.65rem",
                          borderRadius: "var(--radius-button)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {job.department}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          fontFamily: "var(--font-family-roboto)",
                          fontSize: "var(--text-label)",
                          color: "var(--colour\\/grey\\/500, #515151)",
                        }}
                      >
                        <MapPin size={13} />
                        {job.location}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          fontFamily: "var(--font-family-roboto)",
                          fontSize: "var(--text-label)",
                          color: "var(--colour\\/grey\\/500, #515151)",
                        }}
                      >
                        <Clock size={13} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      flexShrink: 0,
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary)",
                    }}
                  >
                    <ArrowRight size={16} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
