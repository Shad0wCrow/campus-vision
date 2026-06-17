import { useSearchParams } from 'react-router-dom';

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}

function IconLugares() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconRutas() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

function IconFavoritos() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconHistorial() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconAyuda() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconSidebarBanner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'inicio';

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: <IconHome /> },
    { id: 'mapa', label: 'Mapa', icon: <IconMap /> },
    { id: 'lugares', label: 'Lugares', icon: <IconLugares /> },
    { id: 'rutas', label: 'Rutas', icon: <IconRutas /> },
    { id: 'favoritos', label: 'Favoritos', icon: <IconFavoritos /> },
    { id: 'historial', label: 'Historial', icon: <IconHistorial /> },
    { id: 'ayuda', label: 'Ayuda', icon: <IconAyuda /> },
  ];

  const handleTabChange = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="sansilens-sidebar">
        <div className="sansilens-sidebar-logo">
          <div className="sansilens-sidebar-logo-icon">
            <IconLogo />
          </div>
          <div className="sansilens-sidebar-logo-text">
            Sansi<span>Lens</span>
          </div>
        </div>

        <nav className="sansilens-sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`sansilens-sidebar-link ${currentTab === item.id ? 'active' : ''}`}
              onClick={() => handleTabChange(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sansilens-sidebar-banner">
          <div className="sansilens-sidebar-banner-img">
            <IconSidebarBanner />
          </div>
          <div className="sansilens-sidebar-banner-text">
            Explora tu<br />
            facultad de<br />
            forma inteligente
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="sansilens-mobile-header">
        <div className="sansilens-sidebar-logo" style={{ padding: 0 }}>
          <div className="sansilens-sidebar-logo-icon">
            <IconLogo />
          </div>
          <div className="sansilens-sidebar-logo-text">
            Sansi<span>Lens</span>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Limited to 5 primary items for space) */}
      <nav className="sansilens-mobile-nav">
        {menuItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            className={`sansilens-mobile-nav-item ${currentTab === item.id ? 'active' : ''}`}
            onClick={() => handleTabChange(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
