import { NavLink } from 'react-router-dom';

function IconLens() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        <NavLink to="/" className="navbar-brand">
          <div className="navbar-logo">
            <IconLens />
          </div>
          <div className="navbar-brand-text">
            <span>Campus Vision</span>
            <span>UMSS · Sistema de Reconocimiento</span>
          </div>
        </NavLink>

        <div className="navbar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <IconHome />
            <span>Inicio</span>
          </NavLink>
        </div>

      </div>
    </nav>
  );
}
