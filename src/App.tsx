import { BrowserRouter, Routes, Route } from "react-router";
import { CareerPage } from "./pages/CareerPage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { SignInPage } from "./pages/admin/SignInPage";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminJobsPage } from "./pages/admin/AdminJobsPage";
import { AdminJobFormPage } from "./pages/admin/AdminJobFormPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<CareerPage />} />
        {/* Splat: a slash inside the slug is part of the slug, encoded or not. */}
        <Route path="/jobs/*" element={<JobDetailPage />} />

        {/* Admin auth */}
        <Route path="/admin/login" element={<SignInPage />} />

        {/* Admin portal (protected via AdminLayout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminJobsPage />} />
          <Route path="jobs/new" element={<AdminJobFormPage />} />
          <Route path="jobs/:id" element={<AdminJobFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
