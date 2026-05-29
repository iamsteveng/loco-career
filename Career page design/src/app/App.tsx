import { BrowserRouter, Routes, Route } from "react-router";
import { CareerPage } from "./components/CareerPage";
import { JobDetailPage } from "./components/JobDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CareerPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
