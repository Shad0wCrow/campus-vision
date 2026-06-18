import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadBox from '../components/UploadBox';
import { predictBuilding } from '../services/api';

function IconScan() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = useCallback((selectedFile) => {
    if (!selectedFile) {
      setFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setError('');
      return;
    }
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setError('');
  }, [previewUrl]);

  async function handleAnalyze() {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const result = await predictBuilding(file);
      navigate('/resultado', {
        state: { result, previewUrl, fileName: file.name },
      });
    } catch (err) {
      setError(err.message || 'Ocurrió un error al analizar la imagen. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="home-page">
      <div className="home-page-inner">

        {/* ── Left column: hero + features ── */}
        <div className="home-left fade-in">
          <div className="home-badge">
            <span className="home-badge-dot" />
            Inteligencia Artificial · UMSS
          </div>

          <h1 className="home-title">
            Identifica cualquier<br />
            <em>edificio del campus</em>
          </h1>

          <p className="home-subtitle">
            Sube una fotografía y el sistema analiza la imagen para
            reconocer a cuál de los 25 edificios registrados pertenece.
          </p>

          {/* Feature pills */}
          <div className="home-features">
            <div className="home-feature">
              <div className="home-feature-icon">
                <IconZap />
              </div>
              <div>
                <p className="home-feature-title">Análisis rápido</p>
                <p className="home-feature-desc">Resultado en menos de 3 segundos</p>
              </div>
            </div>
            <div className="home-feature">
              <div className="home-feature-icon">
                <IconShield />
              </div>
              <div>
                <p className="home-feature-title">Alta precisión</p>
                <p className="home-feature-desc">Modelos entrenados con fotos reales</p>
              </div>
            </div>
            <div className="home-feature">
              <div className="home-feature-icon">
                <IconBuilding />
              </div>
              <div>
                <p className="home-feature-title">25 edificios</p>
                <p className="home-feature-desc">Cobertura total del campus UMSS</p>
              </div>
            </div>
          </div>

          {/* Stats strip — desktop only */}
          <div className="home-stats">
            <div className="home-stat">
              <strong>25</strong>
              <span>Edificios</span>
            </div>
            <div className="home-stat-divider" />
            <div className="home-stat">
              <strong>IA</strong>
              <span>Reconocimiento</span>
            </div>
            <div className="home-stat-divider" />
            <div className="home-stat">
              <strong>UMSS</strong>
              <span>Universidad</span>
            </div>
            <div className="home-stat-divider" />
            <div className="home-stat">
              <strong>&lt;3s</strong>
              <span>Análisis</span>
            </div>
          </div>
        </div>

        {/* ── Right column: upload card ── */}
        <div className="home-right fade-in fade-in-delay-1">
          <div className="upload-card">
            <div className="upload-card-header">
              <div className="upload-card-header-icon">
                <IconCamera />
              </div>
              <div>
                <p className="upload-card-title">Identificar edificio</p>
                <p className="upload-card-subtitle">Sube o arrastra una fotografía del campus</p>
              </div>
            </div>

            <div className="upload-card-body">
              <UploadBox
                onFileSelect={handleFileSelect}
                selectedFile={file}
                previewUrl={previewUrl}
              />

              {error && (
                <div className="upload-error-banner">
                  <span>⚠</span>
                  {error}
                </div>
              )}

              <button
                className="btn btn-primary btn-full btn-analyze"
                onClick={handleAnalyze}
                disabled={!file || loading}
                type="button"
              >
                {loading ? (
                  <>
                    <div className="btn-spinner" aria-hidden="true" />
                    Analizando imagen…
                  </>
                ) : (
                  <>
                    <IconScan />
                    {file ? 'Analizar edificio' : 'Selecciona una imagen'}
                  </>
                )}
              </button>

              <p className="upload-card-hint">
                Formatos: JPG, PNG, WebP · Máx. 10 MB
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
