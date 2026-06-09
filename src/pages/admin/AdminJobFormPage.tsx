import { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { type Id } from "../../../convex/_generated/dataModel";
import { ArrowLeft } from "lucide-react";
import { slugify } from "../../lib/utils";

export function AdminJobFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const job = useQuery(
    api.admin.getById,
    isEditing ? { id: id as Id<"jobs"> } : "skip"
  );

  const create = useMutation(api.admin.create);
  const update = useMutation(api.admin.update);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("全職");
  const [deadline, setDeadline] = useState("");
  const [overview, setOverview] = useState("");
  const [responsibilitiesText, setResponsibilitiesText] = useState("");
  const [requirementsText, setRequirementsText] = useState("");
  const [applyUrl, setApplyUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setSlug(job.slug);
      setSlugTouched(true);
      setDepartment(job.department);
      setLocation(job.location);
      setType(job.type);
      setDeadline(job.deadline);
      setOverview(job.overview);
      setResponsibilitiesText(job.responsibilities.join("\n"));
      setRequirementsText(job.requirements.join("\n"));
      setPublished(job.published);
      setApplyUrl(job.applyUrl ?? "");
    }
  }, [job]);

  // Auto-generate slug from title in create mode
  useEffect(() => {
    if (!isEditing && !slugTouched) {
      setSlug(slugify(title));
    }
  }, [title, isEditing, slugTouched]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const responsibilities = responsibilitiesText.split("\n").map((s) => s.trim()).filter(Boolean);
    const requirements = requirementsText.split("\n").map((s) => s.trim()).filter(Boolean);

    if (responsibilities.length === 0) {
      setError("請至少填寫一項職責。");
      setSubmitting(false);
      return;
    }
    if (requirements.length === 0) {
      setError("請至少填寫一項要求。");
      setSubmitting(false);
      return;
    }

    try {
      if (isEditing) {
        await update({
          id: id as Id<"jobs">,
          title,
          slug,
          department,
          location,
          type,
          deadline,
          overview,
          responsibilities,
          requirements,
          published,
          applyUrl,
        });
      } else {
        await create({ title, slug, department, location, type, deadline, overview, responsibilities, requirements, published, applyUrl });
      }
      void navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "儲存失敗，請重試。");
    } finally {
      setSubmitting(false);
    }
  }

  if (isEditing && job === undefined) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", fontFamily: "var(--font-family-roboto)", color: "var(--muted-foreground)" }}>
        載入中…
      </div>
    );
  }

  if (isEditing && job === null) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", fontFamily: "var(--font-family-roboto)", color: "var(--destructive)" }}>
        找不到此職位。
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px" }}>
      {/* Page header */}
      <div>
        <button
          onClick={() => void navigate("/admin")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontFamily: "var(--font-family-roboto)",
            fontSize: "var(--text-label)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--muted-foreground)",
            marginBottom: "0.75rem",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--primary)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)")}
        >
          <ArrowLeft size={14} />
          返回職位列表
        </button>
        <h1
          style={{
            fontFamily: "var(--font-family-roboto)",
            fontSize: "var(--text-h3)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--foreground)",
            margin: 0,
          }}
        >
          {isEditing ? "編輯職位" : "新增職位"}
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => { void handleSubmit(e); }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-card)",
          padding: "2rem",
        }}
      >
        {/* Title + Slug row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <Field label="職位名稱 *">
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Frontend Engineer"
              style={inputStyle}
            />
          </Field>
          <Field label="URL Slug *" hint="用於頁面網址">
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
              placeholder="e.g. frontend-engineer"
              style={inputStyle}
            />
          </Field>
        </div>

        {/* Department + Location */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <Field label="部門 *">
            <input
              type="text"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. Engineering"
              style={inputStyle}
            />
          </Field>
          <Field label="地點 *">
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. 香港"
              style={inputStyle}
            />
          </Field>
        </div>

        {/* Type + Deadline */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <Field label="工作類型 *">
            <select
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option value="全職">全職</option>
              <option value="兼職">兼職</option>
              <option value="全職或兼職">全職或兼職</option>
              <option value="合約">合約</option>
              <option value="實習">實習</option>
            </select>
          </Field>
          <Field label="截止日期 *" hint="格式：DD/MM/YYYY">
            <input
              type="text"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="e.g. 31/07/2026"
              style={inputStyle}
            />
          </Field>
        </div>

        {/* Overview */}
        <Field label="職位概覽 *">
          <textarea
            required
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            rows={5}
            placeholder="請描述此職位的主要職責及背景…"
            style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
          />
        </Field>

        {/* Responsibilities */}
        <Field label="職責 *" hint="每行一項">
          <textarea
            required
            value={responsibilitiesText}
            onChange={(e) => setResponsibilitiesText(e.target.value)}
            rows={6}
            placeholder={"Design and develop end-to-end systems…\nCollaborate with cross-functional teams…"}
            style={{ ...inputStyle, resize: "vertical", minHeight: "140px" }}
          />
        </Field>

        {/* Requirements */}
        <Field label="要求 *" hint="每行一項">
          <textarea
            required
            value={requirementsText}
            onChange={(e) => setRequirementsText(e.target.value)}
            rows={6}
            placeholder={"Bachelor's degree in Computer Science…\n3+ years of experience…"}
            style={{ ...inputStyle, resize: "vertical", minHeight: "140px" }}
          />
        </Field>

        {/* Apply URL */}
        <Field label="申請連結 (Google Form URL) *">
          <input
            type="url"
            required
            value={applyUrl}
            onChange={(e) => setApplyUrl(e.target.value)}
            placeholder="https://forms.gle/..."
            style={inputStyle}
          />
        </Field>

        {/* Published toggle */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            fontFamily: "var(--font-family-roboto)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--card-foreground)",
          }}
        >
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "var(--primary)" }}
          />
          立即發布（顯示於公開頁面）
        </label>

        {error && (
          <p style={{ fontFamily: "var(--font-family-roboto)", fontSize: "var(--text-label)", color: "var(--destructive)", margin: 0 }}>
            {error}
          </p>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
          <button
            type="button"
            onClick={() => void navigate("/admin")}
            style={{
              fontFamily: "var(--font-family-roboto)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--muted-foreground)",
              backgroundColor: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-button)",
              padding: "0.625rem 1.5rem",
              cursor: "pointer",
              transition: "border-color 0.15s ease",
            }}
          >
            取消
          </button>
          <button
            type="submit"
            disabled={submitting}
            style={{
              fontFamily: "var(--font-family-roboto)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--primary-foreground)",
              backgroundColor: "var(--primary)",
              border: "none",
              borderRadius: "var(--radius-button)",
              padding: "0.625rem 1.75rem",
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.7 : 1,
              transition: "opacity 0.15s ease",
            }}
          >
            {submitting ? "儲存中…" : isEditing ? "儲存更改" : "建立職位"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
        <span
          style={{
            fontFamily: "var(--font-family-roboto)",
            fontSize: "var(--text-label)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--card-foreground)",
          }}
        >
          {label}
        </span>
        {hint && (
          <span style={{ fontFamily: "var(--font-family-roboto)", fontSize: "var(--text-label)", color: "var(--muted-foreground)" }}>
            {hint}
          </span>
        )}
      </div>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-family-roboto)",
  fontSize: "var(--text-base)",
  color: "var(--card-foreground)",
  backgroundColor: "var(--input-background)",
  border: "1px solid var(--border)",
  borderRadius: 0,
  padding: "0.625rem 0.875rem",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};
