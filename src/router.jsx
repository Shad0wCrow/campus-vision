import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/"          element={<Home />} />
      <Route path="/resultado" element={<Result />} />
      <Route path="*"          element={<Navigate to="/" replace />} />
    </Routes>
  );
}
