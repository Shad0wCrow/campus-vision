import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';

function IconArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function IconRepeat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function IconWarning() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconNavigation() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

// ─── Improved Map Placeholder ─────────────────────────────────
// Ready for: Google Maps, Leaflet, OpenStreetMap
// To integrate Leaflet:
//   1. npm install react-leaflet leaflet
//   2. Replace #map-container contents with <MapContainer ...>
// To integrate Google Maps:
//   1. npm install @googlemaps/js-api-loader
//   2. Add <div ref={mapRef} /> inside #map-container and init in useEffect

function MapPlaceholder({ building }) {
  const code = building?.code?.slice(0, 2) || '??';
  const name = building?.name || 'Edificio identificado';
  const zone = building?.zone ? `Zona ${building.zone}` : 'Campus UMSS';

  return (
    <div className="map-card fade-in fade-in-delay-3">
      {/* Header */}
      <div className="map-card-header">
        <div className="map-card-header-icon">
          <IconMapPin />
        </div>
        <div className="map-card-header-text">
          <span className="map-card-header-title">Ubicación del edificio</span>
          <span className="map-card-header-sub">Campus Universitario UMSS · Cochabamba, Bolivia</span>
        </div>
        <div className="map-layer-btns">
          <button className="map-layer-btn active" title="Mapa" type="button">
            <IconLayers />
          </button>
          <button className="map-layer-btn" title="Satélite" type="button">
            <IconCompass />
          </button>
        </div>
      </div>

      {/* Map viewport — replace inner content when integrating real map */}
      <div id="map-container" className="map-viewport" role="img" aria-label={`Mapa de ubicación: ${name}`}>

        {/* ── Decorative map background ── */}
        {/* Street grid */}
        <svg className="map-bg-grid" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-minor" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#C9D9F0" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid-major" width="144" height="144" patternUnits="userSpaceOnUse">
              <rect width="144" height="144" fill="url(#grid-minor)" />
              <path d="M 144 0 L 0 0 0 144" fill="none" stroke="#B8CCE8" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-major)" />
        </svg>

        {/* Road network */}
        <svg className="map-bg-roads" aria-hidden="true" viewBox="0 0 700 320" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Main avenues */}
          <rect x="0" y="140" width="700" height="16" rx="2" fill="#DDEAF8" />
          <rect x="330" y="0" width="16" height="320" rx="2" fill="#DDEAF8" />
          {/* Secondary streets */}
          <rect x="0" y="72" width="700" height="8" rx="1" fill="#E8F0F8" />
          <rect x="0" y="230" width="700" height="8" rx="1" fill="#E8F0F8" />
          <rect x="165" y="0" width="8" height="320" rx="1" fill="#E8F0F8" />
          <rect x="512" y="0" width="8" height="320" rx="1" fill="#E8F0F8" />
          {/* Street center lines */}
          <line x1="0" y1="148" x2="700" y2="148" stroke="#C4D8F0" strokeWidth="1" strokeDasharray="12 8" />
          <line x1="338" y1="0" x2="338" y2="320" stroke="#C4D8F0" strokeWidth="1" strokeDasharray="12 8" />
          {/* Campus blocks */}
          <rect x="190" y="28" width="120" height="88" rx="8" fill="#D4E8C2" opacity="0.7" />
          <rect x="370" y="28" width="120" height="88" rx="8" fill="#D4E8C2" opacity="0.6" />
          <rect x="60" y="168" width="90" height="68" rx="8" fill="#C8DFF8" opacity="0.6" />
          <rect x="190" y="168" width="120" height="68" rx="8" fill="#C8DFF8" opacity="0.5" />
          <rect x="370" y="168" width="100" height="68" rx="8" fill="#C8DFF8" opacity="0.5" />
          <rect x="520" y="168" width="100" height="68" rx="8" fill="#C8DFF8" opacity="0.6" />
          {/* Building labels */}
          <text x="250" y="68" fill="#8AAAC8" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">Bloque A</text>
          <text x="430" y="68" fill="#8AAAC8" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">Bloque B</text>
          <text x="250" y="200" fill="#8AAAC8" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">Bloque C</text>
          <text x="420" y="200" fill="#8AAAC8" fontSize="9" textAnchor="middle" fontFamily="Inter, sans-serif">Bloque D</text>
          {/* Parking */}
          <rect x="560" y="28" width="80" height="50" rx="6" fill="#EEF0F4" opacity="0.8" />
          <text x="600" y="58" fill="#9AAAB8" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">P</text>
          {/* Green areas */}
          <circle cx="100" cy="100" r="28" fill="#C8E6B0" opacity="0.5" />
          <circle cx="600" cy="260" r="22" fill="#C8E6B0" opacity="0.5" />
        </svg>

        {/* Marker shadow */}
        <div className="map-marker-shadow" />

        {/* Main location marker */}
        <div className="map-marker">
          <div className="map-marker-pin">
            <div className="map-marker-pin-inner">
              <IconMapPin />
            </div>
          </div>
          <div className="map-marker-pulse-ring" />
          <div className="map-marker-pulse-ring map-marker-pulse-ring-2" />
          {/* Tooltip */}
          <div className="map-marker-tooltip">
            <span className="map-marker-tooltip-code">{code}</span>
            <span className="map-marker-tooltip-name">{name}</span>
          </div>
        </div>

        {/* Map controls */}
        <div className="map-controls">
          <button className="map-control-btn" title="Acercar" type="button" aria-label="Acercar mapa">+</button>
          <div className="map-control-divider" />
          <button className="map-control-btn" title="Alejar" type="button" aria-label="Alejar mapa">−</button>
        </div>

        {/* Compass */}
        <div className="map-compass" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="12 2 14 10 12 12 10 10" fill="var(--primary)" stroke="none" />
            <polygon points="12 22 10 14 12 12 14 14" fill="#94A3B8" stroke="none" />
          </svg>
          <span>N</span>
        </div>

        {/* Integration badge */}
        <div className="map-integration-badge">
          <span className="map-integration-dot" />
          Mapa en integración · Leaflet / Google Maps / OSM
        </div>

        {/* Scale bar */}
        <div className="map-scale-bar" aria-hidden="true">
          <div className="map-scale-line" />
          <span>100 m</span>
        </div>
      </div>

      {/* Footer */}
      <div className="map-card-footer">
        <div className="map-building-chip">
          <div className="map-building-chip-icon">{code}</div>
          <div className="map-building-chip-info">
            <p className="map-building-chip-name">{name}</p>
            <p className="map-building-chip-loc">
              <IconMapPin />
              {zone} · Campus Universitario UMSS
            </p>
          </div>
        </div>

        <div className="map-footer-actions">
          <button className="map-action-btn" type="button">
            <IconNavigation />
            Cómo llegar
          </button>
          <button className="map-action-btn map-action-btn-primary" type="button">
            <IconMapPin />
            Ver en mapa
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Result page ──────────────────────────────────────────────

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state || !state.result) {
    return (
      <main className="result-page">
        <div className="container">
          <div className="state-box">
            <div className="state-icon warning-icon">
              <IconWarning />
            </div>
            <h2 className="state-title">Sin resultado disponible</h2>
            <p className="state-body">
              No hay una imagen analizada para mostrar.
              Vuelve al inicio y sube una fotografía del edificio.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/')}
              type="button"
            >
              <IconArrowLeft />
              Ir al inicio
            </button>
          </div>
        </div>
      </main>
    );
  }

  const { result, previewUrl, fileName } = state;

  return (
    <main className="result-page">
      <div className="container">

        {/* Header */}
        <div className="result-header fade-in">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate('/')}
            type="button"
          >
            <IconArrowLeft />
            Volver
          </button>
          <h1>Resultado del análisis</h1>
        </div>

        {/* Two-column: image + result card */}
        <div className="result-layout">
          <div className="result-image-card fade-in fade-in-delay-1">
            <img src={previewUrl} alt="Imagen analizada del edificio" />
            <div className="result-image-meta">
              <p><strong>Archivo analizado:</strong>&nbsp;{fileName || 'imagen.jpg'}</p>
            </div>
          </div>

          <div className="fade-in fade-in-delay-2">
            <ResultCard result={result} />
            <div style={{ marginTop: 16 }}>
              <button
                className="btn btn-secondary btn-full"
                onClick={() => navigate('/')}
                type="button"
              >
                <IconRepeat />
                Analizar otra imagen
              </button>
            </div>
          </div>
        </div>

        {/* Map — full width */}
        <MapPlaceholder building={result.building} />

      </div>
    </main>
  );
}
