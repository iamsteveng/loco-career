import { useParams, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { useBreakpoints } from "../hooks/useBreakpoints";

export function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isMobile, isTablet, isDesktop } = useBreakpoints();
  const job = useQuery(api.jobs.getBySlug, { slug: slug ?? "" });

  const hPad = isMobile ? "20px" : isTablet ? "40px" : "80px";

  if (job === undefined) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--background)" }}>
        <SiteHeader />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-family-roboto)", color: "var(--muted-foreground)" }}>載入中…</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (job === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--background)",
          fontFamily: "var(--font-family-roboto)",
        }}
      >
        <SiteHeader />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "2rem",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-family-comfortaa)",
              fontSize: "var(--text-h2)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--foreground)",
            }}
          >
            找不到此職位
          </h1>
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              fontFamily: "var(--font-family-roboto)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-medium)",
              padding: "0.75rem 1.75rem",
              borderRadius: "var(--radius-button)",
              border: "none",
              cursor: "pointer",
            }}
          >
            返回招聘頁面
          </button>
        </div>
        <SiteFooter />
      </div>
    );
  }

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
        {/* Back breadcrumb */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: `1.25rem ${hPad} 0` }}>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "var(--font-family-roboto)",
              fontSize: "var(--text-label)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--colour\\/grey\\/500, #515151)",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--colour\\/grey\\/500, #515151)")}
          >
            <ArrowLeft size={14} />
            所有職位
          </button>
        </div>

        {/* Hero strip */}
        <div
          style={{
            backgroundColor: "var(--primary)",
            padding: `${isMobile ? "2rem" : isTablet ? "2.5rem" : "3.5rem"} ${hPad}`,
            marginTop: "1rem",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <p
              style={{
                fontFamily: "var(--font-family-roboto)",
                fontSize: "var(--text-label)",
                fontWeight: "var(--font-weight-semibold)",
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {job.department}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-family-comfortaa)",
                fontSize: isMobile ? "var(--text-h2)" : "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--primary-foreground)",
                lineHeight: "1.25",
                marginBottom: "1.25rem",
              }}
            >
              {job.title}
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? "0.5rem" : "1rem" }}>
              <MetaChip icon={<MapPin size={13} />} label={job.location} />
              <MetaChip icon={<Clock size={13} />} label={job.type} />
            </div>
          </div>
        </div>

        {/* Content + Sidebar */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: `${isMobile ? "2rem" : "3rem"} ${hPad} ${isMobile ? "3rem" : "5rem"}`,
            display: "grid",
            gridTemplateColumns: isDesktop ? "1fr 320px" : "1fr",
            gap: isDesktop ? "3rem" : "2.5rem",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", order: 1 }}>
            {job.overview && (
              <Section title="職位概覽">
                <p
                  style={{
                    fontFamily: "var(--font-family-roboto)",
                    fontSize: "var(--text-base)",
                    color: "var(--foreground)",
                    lineHeight: "1.8",
                    margin: 0,
                  }}
                >
                  {job.overview}
                </p>
              </Section>
            )}

            <Section title="職責">
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {job.responsibilities.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      fontFamily: "var(--font-family-roboto)",
                      fontSize: "var(--text-base)",
                      color: "var(--foreground)",
                      lineHeight: "1.7",
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "3px" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="要求">
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {job.requirements.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      fontFamily: "var(--font-family-roboto)",
                      fontSize: "var(--text-base)",
                      color: "var(--foreground)",
                      lineHeight: "1.7",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "var(--primary)",
                        marginTop: "10px",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Sidebar */}
          <aside style={{ position: isDesktop ? "sticky" : "static", top: isDesktop ? "126px" : undefined, order: isDesktop ? 2 : 0 }}>
            <div
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-card)",
                padding: isMobile ? "1.5rem" : "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-family-roboto)",
                  fontSize: "var(--text-h4)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--card-foreground)",
                  margin: 0,
                }}
              >
                職位詳情
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: !isDesktop && !isMobile ? "1fr 1fr" : "1fr",
                  gap: "1rem",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "1.5rem",
                }}
              >
                <DetailRow label="部門" value={job.department} />
                <DetailRow label="地點" value={job.location} />
                <DetailRow label="工作類型" value={job.type} />
                {job.salary && <DetailRow label="人工" value={job.salary} />}
                {job.benefits && <DetailRow label="待遇" value={job.benefits} />}
              </div>
              <a
                href={job.applyUrl ?? `mailto:careers@locolla.com?subject=Application: ${encodeURIComponent(job.title)}`}
                {...(job.applyUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                style={{
                  width: "100%",
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  fontFamily: "var(--font-family-roboto)",
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-semibold)",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "var(--radius-button)",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.15s ease",
                  lineHeight: "1.5",
                  letterSpacing: "0.15px",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
              >
                立即申請
              </a>
            </div>
          </aside>
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-family-comfortaa)",
          fontSize: "var(--text-h3)",
          fontWeight: "var(--font-weight-regular)",
          color: "var(--foreground)",
          marginBottom: "1rem",
          paddingBottom: "0.75rem",
          borderBottom: "2px solid var(--muted)",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function MetaChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        backgroundColor: "rgba(255,255,255,0.18)",
        borderRadius: "var(--radius-button)",
        padding: "0.35rem 0.875rem",
        color: "var(--primary-foreground)",
        fontFamily: "var(--font-family-roboto)",
        fontSize: "var(--text-label)",
        fontWeight: "var(--font-weight-medium)",
      }}
    >
      {icon}
      {label}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-family-roboto)",
          fontSize: "var(--text-label)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--colour\\/grey\\/500, #515151)",
          margin: "0 0 0.2rem",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-family-roboto)",
          fontSize: "var(--text-base)",
          fontWeight: "var(--font-weight-regular)",
          color: "var(--card-foreground)",
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}
