import { useRef, useState } from 'react';

function IconUpload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 10;

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadBox({ onFileSelect, selectedFile, previewUrl }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  function validateAndSet(file) {
    if (!file) return;
    setError('');

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Formato no compatible. Usa JPG, PNG o WebP.');
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`El archivo supera el límite de ${MAX_SIZE_MB} MB.`);
      return;
    }

    onFileSelect(file);
  }

  function handleInputChange(e) {
    const file = e.target.files?.[0];
    validateAndSet(file);
    // reset input so the same file can be re-selected after clearing
    e.target.value = '';
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    validateAndSet(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleClear(e) {
    e.stopPropagation();
    onFileSelect(null);
    setError('');
  }

  function openFileDialog() {
    if (!selectedFile) {
      inputRef.current?.click();
    }
  }

  function handleClick(e) {
    if (e.target === inputRef.current) return;
    openFileDialog();
  }

  const hasImage = Boolean(selectedFile && previewUrl);

  return (
    <div>
      <div
        className={`upload-box${dragging ? ' dragging' : ''}${hasImage ? ' has-image' : ''}`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role="button"
        tabIndex={0}
        aria-label="Área para subir imagen del edificio"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFileDialog();
          }
        }}
      >
        {!hasImage && (
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
            aria-hidden="true"
            tabIndex={-1}
          />
        )}

        {hasImage ? (
          <div className="upload-preview">
            <img src={previewUrl} alt="Vista previa del edificio seleccionado" />
            <div className="upload-preview-info">
              <span>
                <IconCheck />
                {selectedFile.name} &mdash; {formatSize(selectedFile.size)}
              </span>
              <button className="btn-clear" onClick={handleClear} type="button">
                Cambiar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="upload-icon-wrap">
              {dragging ? <IconCamera /> : <IconUpload />}
            </div>
            <p className="upload-title">
              {dragging ? 'Suelta la imagen aquí' : 'Sube o arrastra una foto'}
            </p>
            <p className="upload-hint">Toma una fotografía de cualquier edificio del campus</p>
            <p className="upload-formats">JPG · PNG · WebP · máx. {MAX_SIZE_MB} MB</p>
          </>
        )}
      </div>

      {error && (
        <p style={{
          marginTop: '8px',
          fontSize: '13px',
          color: 'var(--error)',
          fontWeight: 500,
          paddingLeft: '4px',
        }}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
}
