import { useEffect, useState } from 'react';
import BuildingCard from '../components/BuildingCard';
import { getBuildings } from '../services/api';

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, color: 'var(--text-3)', flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function Buildings() {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getBuildings()
      .then(data => { if (!cancelled) setBuildings(data); })
      .catch(err => { if (!cancelled) setError(err.message || 'No se pudo cargar el catálogo.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const filtered = buildings.filter(b =>
    b.name.toLowerCase().includes(query.toLowerCase()) ||
    b.code.toLowerCase().includes(query.toLowerCase()) ||
    (b.zone && b.zone.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <main className="buildings-page">
      <div className="container">

        <div className="buildings-header fade-in">
          <h1>Catálogo de edificios</h1>
          <p>Todos los edificios registrados en el sistema de reconocimiento.</p>
          {!loading && !error && (
            <div className="buildings-count">
              {filtered.length} de {buildings.length} edificios
            </div>
          )}
        </div>

        {!loading && !error && buildings.length > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            padding: '10px 14px',
            marginBottom: '28px',
            maxWidth: '380px',
          }}>
            <IconSearch />
            <input
              type="text"
              placeholder="Buscar por nombre, código o zona…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '14px',
                color: 'var(--text)',
                width: '100%',
                fontFamily: 'var(--font)',
              }}
              aria-label="Buscar edificio"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-3)',
                  fontSize: '16px',
                  padding: 0,
                  lineHeight: 1,
                }}
                aria-label="Limpiar búsqueda"
                type="button"
              >
                ×
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="loading-wrap">
            <div className="loading-spinner" aria-label="Cargando edificios" />
            <p className="loading-text">Cargando catálogo…</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-box">
            <div className="state-icon error-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2 className="state-title">Error al cargar</h2>
            <p className="state-body">{error}</p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
              type="button"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Empty search result */}
        {!loading && !error && filtered.length === 0 && query && (
          <div className="state-box">
            <div className="state-icon warning-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h2 className="state-title">Sin resultados</h2>
            <p className="state-body">
              Ningún edificio coincide con "{query}".
              Intenta con otro nombre o código.
            </p>
            <button className="btn btn-ghost" onClick={() => setQuery('')} type="button">
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="buildings-grid">
            {filtered.map((building, i) => (
              <div
                key={building.id}
                className="fade-in"
                style={{ animationDelay: `${Math.min(i * 0.03, 0.4)}s` }}
              >
                <BuildingCard building={building} />
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
