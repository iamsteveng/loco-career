import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import svgPaths from "../../assets/Landing/svg-kpsqtc8fir";

export function SignInPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn } = useAuthActions();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<"username" | "password" | null>(null);

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
      await signIn("password", { username, password, flow: "signIn" });
      void navigate("/admin");
    } catch {
      setError("用戶名稱或密碼不正確，請重試。");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #112c39 0%, #0d2130 100%)",
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
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.75rem",
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.32), 0 2px 8px rgba(0, 0, 0, 0.16)",
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
              color: "#111827",
              margin: "0 0 0.375rem",
            }}
          >
            管理員登入
          </h1>
          <p
            style={{
              fontFamily: "var(--font-family-roboto)",
              fontSize: "var(--text-label)",
              color: "#6b7280",
              margin: 0,
            }}
          >
            LocoBike Career 管理後台
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => { void handleSubmit(e); }}
          style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <span
              style={{
                fontFamily: "var(--font-family-roboto)",
                fontSize: "var(--text-label)",
                fontWeight: "var(--font-weight-medium)",
                color: "#374151",
              }}
            >
              用戶名稱
            </span>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusedField("username")}
              onBlur={() => setFocusedField(null)}
              placeholder="admin"
              aria-invalid={!!error}
              style={getInputStyle(focusedField === "username")}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <span
              style={{
                fontFamily: "var(--font-family-roboto)",
                fontSize: "var(--text-label)",
                fontWeight: "var(--font-weight-medium)",
                color: "#374151",
              }}
            >
              密碼
            </span>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              placeholder="••••••••"
              aria-invalid={!!error}
              style={getInputStyle(focusedField === "password")}
            />
          </label>

          {error && (
            <div
              role="alert"
              style={{
                backgroundColor: "#fff1f2",
                border: "1px solid #fecdd3",
                borderRadius: "8px",
                padding: "0.625rem 0.875rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-family-roboto)",
                  fontSize: "var(--text-label)",
                  color: "#be123c",
                  margin: 0,
                }}
              >
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: submitting ? "#7dcbee" : "var(--primary)",
              color: "#ffffff",
              fontFamily: "var(--font-family-roboto)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-semibold)",
              padding: "0.8125rem",
              borderRadius: "var(--radius-button)",
              border: "none",
              cursor: submitting ? "not-allowed" : "pointer",
              transition: "background-color 0.15s ease, transform 0.1s ease",
              marginTop: "0.25rem",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              if (!submitting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2d9fd4";
            }}
            onMouseLeave={(e) => {
              if (!submitting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--primary)";
            }}
          >
            {submitting ? "處理中…" : "登入"}
          </button>
        </form>
      </div>
    </div>
  );
}

function getInputStyle(focused: boolean): React.CSSProperties {
  return {
    fontFamily: "var(--font-family-roboto)",
    fontSize: "var(--text-base)",
    color: "#111827",
    backgroundColor: "#ffffff",
    border: focused ? "1.5px solid #44b0e2" : "1.5px solid #d1d5db",
    borderRadius: "8px",
    padding: "0.6875rem 0.875rem",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    boxShadow: focused ? "0 0 0 3px rgba(68, 176, 226, 0.18)" : "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  };
}
