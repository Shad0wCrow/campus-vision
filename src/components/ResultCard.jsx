import { useEffect, useState } from 'react';

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function getConfidenceClass(value) {
  if (value >= 0.75) return 'high';
  if (value >= 0.50) return 'medium';
  return 'low';
}

function getConfidenceLabel(value) {
  if (value >= 0.85) return 'Alta confianza';
  if (value >= 0.65) return 'Confianza media';
  return 'Confianza baja';
}

export default function ResultCard({ result }) {
  const [animated, setAnimated] = useState(false);

  // Trigger bar animation after mount
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  const { building, confidence, matches } = result;
  const pct = Math.round(confidence * 100);
  const cls = getConfidenceClass(confidence);

  return (
    <div className="result-main-card fade-in">
      {/* Header bar */}
      <div className="result-top-bar">
        <IconCheck />
        <span>Edificio identificado</span>
      </div>

      {/* Main result */}
      <div className="result-building-info">
        <h2 className="result-building-name">{building.name}</h2>

        <div className="confidence-block">
          <div className="confidence-label-row">
            <span>{getConfidenceLabel(confidence)}</span>
            <span className="confidence-value">{pct}%</span>
          </div>
          <div className="confidence-bar-bg" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div
              className={`confidence-bar-fill ${cls}`}
              style={{ width: animated ? `${pct}%` : '0%' }}
            />
          </div>
        </div>

        {building.zone && (
          <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-2)' }}>
            📍 Zona {building.zone}
            {building.year ? ` · Construido en ${building.year}` : ''}
          </p>
        )}
      </div>

      {/* Top matches */}
      {matches && matches.length > 0 && (
        <div className="result-matches">
          <h3>Otras coincidencias</h3>
          {matches.map((m, i) => {
            const mPct = Math.round(m.confidence * 100);
            return (
              <div key={m.building.id} className="match-item">
                <div className="match-rank">{i + 2}</div>
                <div className="match-info">
                  <div className="match-name">{m.building.name}</div>
                  <div className="match-bar-row">
                    <div className="match-bar-bg">
                      <div
                        className="match-bar-fill"
                        style={{ width: animated ? `${mPct}%` : '0%', transition: `width 0.8s ease ${0.1 + i * 0.08}s` }}
                      />
                    </div>
                    <span className="match-pct">{mPct}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
