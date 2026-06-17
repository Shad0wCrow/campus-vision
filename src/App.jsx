import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './router';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <div className="page-content">
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  );
}
