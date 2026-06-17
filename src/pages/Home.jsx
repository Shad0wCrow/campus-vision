import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadBox from '../components/UploadBox';
import { predictBuilding } from '../services/api';

function IconScan() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
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
    <main className="home">
      <div className="container">

        <div className="home-hero fade-in">
          <div className="home-badge">
            <span />
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
        </div>

        <div className="upload-section fade-in fade-in-delay-1">
          <UploadBox
            onFileSelect={handleFileSelect}
            selectedFile={file}
            previewUrl={previewUrl}
          />

          {error && (
            <div style={{
              marginTop: '12px',
              padding: '12px 16px',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#991B1B',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span>⚠</span>
              {error}
            </div>
          )}

          <div className="upload-actions">
            <button
              className="btn btn-primary btn-full"
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
                  Analizar edificio
                </>
              )}
            </button>

            {!file && (
              <p style={{
                textAlign: 'center',
                fontSize: '13px',
                color: 'var(--text-3)',
              }}>
                Selecciona una imagen para habilitar el análisis
              </p>
            )}
          </div>
        </div>

        <div className="home-stats fade-in fade-in-delay-2">
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

        {/* Nav hint */}
        <div style={{ textAlign: 'center', marginTop: '40px' }} className="fade-in fade-in-delay-3">
          <a
            href="/edificios"
            onClick={(e) => { e.preventDefault(); navigate('/edificios'); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              color: 'var(--primary)',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Ver catálogo de edificios
            <IconArrow />
          </a>
        </div>

      </div>
    </main>
  );
}
