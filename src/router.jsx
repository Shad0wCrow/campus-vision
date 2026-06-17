import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import Reconocimiento from "./pages/Reconocimiento";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/"          element={<Home />} />
      <Route path="/resultado" element={<Result />} />
      <Route path="/reconocimiento" element={<Reconocimiento />} />
      <Route path="*"          element={<Navigate to="/" replace />} />
    </Routes>
  );
}
