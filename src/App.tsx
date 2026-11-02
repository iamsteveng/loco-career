import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { CareerPage } from "./pages/CareerPage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { SignInPage } from "./pages/admin/SignInPage";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminJobsPage } from "./pages/admin/AdminJobsPage";
import { AdminJobFormPage } from "./pages/admin/AdminJobFormPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Homepage scroll sits on the job list. A client navigation keeps that
    // offset, so the job page opens at the bottom.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
