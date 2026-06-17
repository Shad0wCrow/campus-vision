import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './router';

export default function App() {
  return (
    <BrowserRouter>
      <div className="sansilens-app">
        <Navbar />
        <div className="sansilens-main-layout">
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  );
}
