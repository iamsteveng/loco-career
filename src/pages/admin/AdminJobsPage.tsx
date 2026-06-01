import { useNavigate } from "react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { type Id } from "../../../convex/_generated/dataModel";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

export function AdminJobsPage() {
  const navigate = useNavigate();
  const jobs = useQuery(api.admin.listAll);
  const togglePublished = useMutation(api.admin.togglePublished);
  const remove = useMutation(api.admin.remove);

  async function handleDelete(id: Id<"jobs">, title: string) {
    if (!confirm(`確定要刪除「${title}」？此操作無法復原。`)) return;
    await remove({ id });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-family-roboto)",
              fontSize: "var(--text-h3)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--foreground)",
              margin: 0,
            }}
          >
            職位管理
          </h1>
          <p style={{ fontFamily: "var(--font-family-roboto)", fontSize: "var(--text-label)", color: "var(--muted-foreground)", margin: "4px 0 0" }}>
            {jobs ? `共 ${jobs.length} 個職位` : "載入中…"}
          </p>
        </div>
        <button
          onClick={() => void navigate("/admin/jobs/new")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            fontFamily: "var(--font-family-roboto)",
            fontSize: "var(--text-label)",
            fontWeight: "var(--font-weight-semibold)",
            padding: "0.625rem 1.25rem",
            borderRadius: "var(--radius-button)",
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        >
          <Plus size={15} />
          新增職位
        </button>
      </div>

      {/* Jobs table */}
      {!jobs ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "var(--muted-foreground)", fontFamily: "var(--font-family-roboto)" }}>
          載入中…
        </div>
      ) : jobs.length === 0 ? (
        <div
          style={{
            padding: "4rem",
            textAlign: "center",
            border: "2px dashed var(--border)",
            borderRadius: "var(--radius-card)",
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-family-roboto)",
          }}
        >
          <p style={{ margin: "0 0 1rem", fontSize: "var(--text-base)" }}>暫時沒有職位</p>
          <button
            onClick={() => void navigate("/admin/jobs/new")}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              fontFamily: "var(--font-family-roboto)",
              fontSize: "var(--text-label)",
              fontWeight: "var(--font-weight-medium)",
              padding: "0.5rem 1.25rem",
              borderRadius: "var(--radius-button)",
              border: "none",
              cursor: "pointer",
            }}
          >
            建立第一個職位
          </button>
        </div>
      ) : (
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-card)",
            overflow: "hidden",
            backgroundColor: "var(--card)",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 160px 80px 120px",
              padding: "0.75rem 1.25rem",
              backgroundColor: "var(--muted)",
              borderBottom: "1px solid var(--border)",
              gap: "1rem",
            }}
          >
            {["職位名稱", "部門", "地點", "狀態", "操作"].map((h) => (
              <span
                key={h}
                style={{
                  fontFamily: "var(--font-family-roboto)",
                  fontSize: "var(--text-label)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {jobs.map((job, idx) => (
            <div
              key={job._id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px 160px 80px 120px",
                padding: "1rem 1.25rem",
                borderBottom: idx < jobs.length - 1 ? "1px solid var(--border)" : "none",
                gap: "1rem",
                alignItems: "center",
                transition: "background-color 0.1s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent")}
            >
              {/* Title */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-family-roboto)",
                    fontSize: "var(--text-base)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--card-foreground)",
                    margin: 0,
                  }}
                >
                  {job.title}
                </p>
                <p style={{ fontFamily: "var(--font-family-roboto)", fontSize: "var(--text-label)", color: "var(--muted-foreground)", margin: "2px 0 0" }}>
                  /{job.slug}
                </p>
              </div>

              {/* Department */}
              <span style={{ fontFamily: "var(--font-family-roboto)", fontSize: "var(--text-label)", color: "var(--card-foreground)" }}>
                {job.department}
              </span>

              {/* Location */}
              <span style={{ fontFamily: "var(--font-family-roboto)", fontSize: "var(--text-label)", color: "var(--card-foreground)" }}>
                {job.location}
              </span>

              {/* Published toggle */}
              <button
                onClick={() => void togglePublished({ id: job._id, published: !job.published })}
                title={job.published ? "點擊隱藏" : "點擊發布"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "none",
                  border: `1px solid ${job.published ? "var(--primary)" : "var(--border)"}`,
                  borderRadius: "var(--radius-button)",
                  padding: "3px 8px",
                  cursor: "pointer",
                  fontFamily: "var(--font-family-roboto)",
                  fontSize: "var(--text-label)",
                  fontWeight: "var(--font-weight-medium)",
                  color: job.published ? "var(--primary)" : "var(--muted-foreground)",
                  transition: "opacity 0.15s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {job.published ? <Eye size={12} /> : <EyeOff size={12} />}
                {job.published ? "已發布" : "草稿"}
              </button>

              {/* Actions */}
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => void navigate(`/admin/jobs/${job._id}`)}
                  title="編輯"
                  style={iconBtnStyle}
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => { void handleDelete(job._id, job.title); }}
                  title="刪除"
                  style={{ ...iconBtnStyle, color: "var(--destructive)" }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const iconBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "30px",
  height: "30px",
  background: "none",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-button)",
  cursor: "pointer",
  color: "var(--muted-foreground)",
  transition: "border-color 0.15s ease, color 0.15s ease",
};
