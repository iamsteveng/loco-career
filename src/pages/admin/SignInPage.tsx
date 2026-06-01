import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import svgPaths from "../../assets/Landing/svg-kpsqtc8fir";

export function SignInPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn } = useAuthActions();

  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      void navigate("/admin");
    }
  }, [isAuthenticated, isLoading, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn("password", { email, password, flow: mode });
      void navigate("/admin");
    } catch {
      setError(mode === "signIn" ? "電郵或密碼不正確，請重試。" : "無法建立帳戶，請重試。");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--colour\\/blue\\/800, #112c39)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "var(--card)",
          borderRadius: "var(--radius-card)",
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.75rem",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "90px", height: "37px", position: "relative", overflow: "hidden" }}>
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

        {/* Heading */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-family-roboto)",
              fontSize: "var(--text-h3)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--card-foreground)",
              margin: "0 0 0.25rem",
            }}
          >
            {mode === "signIn" ? "管理員登入" : "建立管理員帳戶"}
          </h1>
          <p style={{ fontFamily: "var(--font-family-roboto)", fontSize: "var(--text-label)", color: "var(--muted-foreground)", margin: 0 }}>
            LocoBike Career 管理後台
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => { void handleSubmit(e); }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <span style={{ fontFamily: "var(--font-family-roboto)", fontSize: "var(--text-label)", fontWeight: "var(--font-weight-medium)", color: "var(--card-foreground)" }}>
              電郵地址
            </span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={inputStyle}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <span style={{ fontFamily: "var(--font-family-roboto)", fontSize: "var(--text-label)", fontWeight: "var(--font-weight-medium)", color: "var(--card-foreground)" }}>
              密碼
            </span>
            <input
              type="password"
              required
              autoComplete={mode === "signIn" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
            />
          </label>

          {error && (
            <p style={{ fontFamily: "var(--font-family-roboto)", fontSize: "var(--text-label)", color: "var(--destructive)", margin: 0 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              fontFamily: "var(--font-family-roboto)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-semibold)",
              padding: "0.875rem",
              borderRadius: "var(--radius-button)",
              border: "none",
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.7 : 1,
              transition: "opacity 0.15s ease",
              marginTop: "0.25rem",
            }}
          >
            {submitting ? "處理中…" : mode === "signIn" ? "登入" : "建立帳戶"}
          </button>
        </form>

        {/* Toggle */}
        <p style={{ textAlign: "center", fontFamily: "var(--font-family-roboto)", fontSize: "var(--text-label)", color: "var(--muted-foreground)", margin: 0 }}>
          {mode === "signIn" ? "首次設定？" : "已有帳戶？"}
          {" "}
          <button
            onClick={() => { setError(""); setMode(mode === "signIn" ? "signUp" : "signIn"); }}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "var(--font-family-roboto)",
              fontSize: "var(--text-label)",
              color: "var(--primary)",
              fontWeight: "var(--font-weight-medium)",
              textDecoration: "underline",
            }}
          >
            {mode === "signIn" ? "建立帳戶" : "登入"}
          </button>
        </p>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-family-roboto)",
  fontSize: "var(--text-base)",
  color: "var(--card-foreground)",
  backgroundColor: "var(--input-background)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-button)",
  padding: "0.625rem 0.875rem",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};
