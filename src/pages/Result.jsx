import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';

function IconArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function IconRepeat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
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

function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function MapPlaceholder({ building }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-xl)',
      boxShadow: 'var(--shadow-md)',
      overflow: 'hidden',
    }}>
      {/* Section label */}
      <div style={{
        padding: '16px 20px 12px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: 'var(--r-sm)',
          background: 'var(--primary-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          flexShrink: 0,
        }}>
          <IconMapPin />
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
          Ubicación del edificio
        </span>
      </div>

      {/* Map area — replace this div's contents when integrating a real map */}
      <div
        id="map-container"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/7',
          background: 'linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 40%, #E0F2FE 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 12,
          minHeight: 160,
        }}
      >
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563EB" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
        </svg>

        <svg
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}
          viewBox="0 0 560 200"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="100" x2="560" y2="100" stroke="#1E293B" strokeWidth="6" />
          <line x1="280" y1="0" x2="280" y2="200" stroke="#1E293B" strokeWidth="6" />
          <line x1="0" y1="55" x2="560" y2="55" stroke="#1E293B" strokeWidth="3" />
          <line x1="140" y1="0" x2="140" y2="200" stroke="#1E293B" strokeWidth="3" />
          <line x1="420" y1="0" x2="420" y2="200" stroke="#1E293B" strokeWidth="3" />
          <rect x="180" y="70" width="60" height="40" rx="4" fill="#93C5FD" opacity="0.5" />
          <rect x="320" y="110" width="50" height="35" rx="4" fill="#93C5FD" opacity="0.5" />
          <rect x="80" y="110" width="45" height="50" rx="4" fill="#93C5FD" opacity="0.4" />
        </svg>

        <div style={{
          position: 'relative',
          zIndex: 1,
          width: 48,
          height: 48,
          borderRadius: '50% 50% 50% 4px',
          background: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 4px 16px rgba(37,99,235,.40)',
          transform: 'rotate(-45deg)',
        }}>
          <div style={{ transform: 'rotate(45deg)', display: 'flex' }}>
            <IconGrid />
          </div>
        </div>

        <div style={{
          position: 'relative',
          zIndex: 1,
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(6px)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-xl)',
          padding: '5px 14px',
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--text-2)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--warning)', display: 'inline-block', flexShrink: 0 }} />
          Mapa pendiente de integración
        </div>
      </div>

      <div style={{
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 'var(--r-sm)',
          background: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          flexShrink: 0,
          fontSize: 11,
          fontWeight: 700,
        }}>
          {building?.code?.slice(0, 2) || '??'}
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.3 }}>
            {building?.name || 'Edificio identificado'}
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-2)', margin: 0 }}>
            Campus Universitario
            {building?.zone ? ` · Zona ${building.zone}` : ''}
          </p>
        </div>
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--primary)',
            background: 'var(--primary-light)',
            padding: '3px 10px',
            borderRadius: 'var(--r-xl)',
          }}>
            Ver en mapa
          </span>
        </div>
      </div>
    </div>
  );
}


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

        <div className="result-layout">

          <div className="result-image-card fade-in fade-in-delay-1">
            <img
              src={previewUrl}
              alt="Imagen analizada del edificio"
            />
            <div className="result-image-meta">
              <p>
                <strong>Archivo analizado:</strong>&nbsp;
                {fileName || 'imagen.jpg'}
              </p>
            </div>
          </div>

          <div className="fade-in fade-in-delay-2">
            <ResultCard result={result} />

            <div style={{ marginTop: '16px' }}>
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

        <div className="fade-in fade-in-delay-3" style={{ marginTop: '28px' }}>
          <MapPlaceholder building={result.building} />
        </div>

      </div>
    </main>
  );
}
