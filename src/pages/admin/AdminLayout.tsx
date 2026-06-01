import { Outlet, Navigate, useNavigate } from "react-router";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { LogOut, Briefcase } from "lucide-react";
import svgPaths from "../../assets/Landing/svg-kpsqtc8fir";

export function AdminLayout() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--background)",
        }}
      >
        <p style={{ fontFamily: "var(--font-family-roboto)", color: "var(--muted-foreground)" }}>載入中…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/sign-in" replace />;
  }

  async function handleSignOut() {
    await signOut();
    void navigate("/admin/sign-in");
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", display: "flex", flexDirection: "column" }}>
      {/* Admin Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "var(--colour\\/blue\\/800, #112c39)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo + label */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "56px", height: "23px", position: "relative", overflow: "hidden" }}>
              <svg
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 109.015 45.015"
              >
                <path d={svgPaths.p1c831400} fill="var(--primary)" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--font-family-roboto)",
                fontSize: "var(--text-label)",
                fontWeight: "var(--font-weight-medium)",
                color: "rgba(255,255,255,0.55)",
                paddingLeft: "12px",
                borderLeft: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Career Admin
            </span>
          </div>

          {/* Nav + Sign Out */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => void navigate("/admin")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-family-roboto)",
                fontSize: "var(--text-label)",
                fontWeight: "var(--font-weight-medium)",
                color: "rgba(255,255,255,0.8)",
                padding: "6px 10px",
                borderRadius: "var(--radius-button)",
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.08)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent")}
            >
              <Briefcase size={14} />
              職位管理
            </button>
            <button
              onClick={() => { void handleSignOut(); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
                fontFamily: "var(--font-family-roboto)",
                fontSize: "var(--text-label)",
                fontWeight: "var(--font-weight-medium)",
                color: "rgba(255,255,255,0.7)",
                padding: "6px 12px",
                borderRadius: "var(--radius-button)",
                transition: "opacity 0.15s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.75")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            >
              <LogOut size={14} />
              登出
            </button>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main style={{ flex: 1, maxWidth: "1280px", width: "100%", margin: "0 auto", padding: "2rem 24px" }}>
        <Outlet />
      </main>
    </div>
  );
}
