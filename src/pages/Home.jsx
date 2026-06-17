import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Inline Icons
function IconColumns() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19h16M4 5h16M6 5v14M10 5v14M14 5v14M18 5v14" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconCoffee() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

function IconBooks() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20" />
    </svg>
  );
}

function IconRestroom() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 22V12h6v10M12 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4Z" />
      <path d="M6 12h12v-3a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3Z" />
    </svg>
  );
}

function IconMicroscope() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18h8M3 22h18M14 22a7 7 0 1 0-14 0" />
      <path d="M9 14h2M9 12a3 3 0 0 1-3-3V6M12 12a3 3 0 0 0 3-3V6M12 4h-4" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function IconUpload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
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

function IconCheckCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function IconImageLabel() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// Mock database for buildings
const BUILDINGS_DATA = {
  ingenieria: {
    id: 'ingenieria',
    name: 'Edificio de Ingeniería',
    floor: 'Segundo piso',
    confidence: 97,
    aulas: 'Aulas: 692 A – 692 F',
    labs: 'Laboratorios de Ingeniería disponibles',
    horario: 'Horario: 7:00 a. m. – 10:00 p. m.',
    wifi: 'Wi-Fi de alta velocidad, libre en cercanías',
    markerLeft: 55, // coordinates for pulsing dot (%)
    markerTop: 58,
    nearby: [
      { name: 'Lactobar bakita', distance: '25 m', time: 'Abierta hasta 8:00 p. m.', type: 'coffee' },
      { name: 'Biblioteca', distance: '45 m', time: 'Abierta hasta 9:00 p. m.', type: 'library' },
      { name: 'Baños', distance: '15 m', time: 'Planta baja', type: 'restroom' },
      { name: 'Laboratorio de física', distance: '60 m', time: 'Abierto', type: 'lab' }
    ]
  },
  biblioteca: {
    id: 'biblioteca',
    name: 'Biblioteca Central',
    floor: 'Primer piso',
    confidence: 94,
    aulas: 'Aulas de estudio y Colección Central',
    labs: 'Salas de lectura general',
    horario: 'Horario: 8:00 a. m. – 9:00 p. m.',
    wifi: 'Wi-Fi libre (UMSS_BIBLIO)',
    markerLeft: 22,
    markerTop: 28,
    nearby: [
      { name: 'Baños', distance: '30 m', time: 'Planta baja', type: 'restroom' },
      { name: 'Lactobar bakita', distance: '90 m', time: 'Abierta hasta 8:00 p. m.', type: 'coffee' },
      { name: 'Edificio de Ingeniería', distance: '45 m', time: 'Abierto', type: 'lab' }
    ]
  },
  laboratorios: {
    id: 'laboratorios',
    name: 'Laboratorios de Tecnología',
    floor: 'Planta baja',
    confidence: 93,
    aulas: 'Aulas prácticas de Física y Química',
    labs: 'Laboratorio de Física Moderna',
    horario: 'Horario: 8:00 a. m. – 8:30 p. m.',
    wifi: 'Wi-Fi libre (Laboratorios_Wifi)',
    markerLeft: 79,
    markerTop: 28,
    nearby: [
      { name: 'Laboratorio de física', distance: '20 m', time: 'Abierto', type: 'lab' },
      { name: 'Baños', distance: '40 m', time: 'Planta baja', type: 'restroom' },
      { name: 'Biblioteca', distance: '120 m', time: 'Abierta hasta 9:00 p. m.', type: 'library' }
    ]
  },
  cafeteria: {
    id: 'cafeteria',
    name: 'Cafetería de Docentes',
    floor: 'Planta baja',
    confidence: 95,
    aulas: 'Área de comedores y café social',
    labs: 'Kioscos de comida rápida',
    horario: 'Horario: 7:00 a. m. – 8:00 p. m.',
    wifi: 'Wi-Fi libre (Cafeteria_Docentes)',
    markerLeft: 22,
    markerTop: 72,
    nearby: [
      { name: 'Lactobar bakita', distance: '120 m', time: 'Abierta hasta 8:00 p. m.', type: 'coffee' },
      { name: 'Baños', distance: '35 m', time: 'Planta baja', type: 'restroom' },
      { name: 'Edificio de Ingeniería', distance: '90 m', time: 'Abierto', type: 'lab' }
    ]
  },
  estudiantes: {
    id: 'estudiantes',
    name: 'Centro de Estudiantes',
    floor: 'Planta baja',
    confidence: 88,
    aulas: 'Salas de reuniones y asambleas',
    labs: 'Impresiones y fotocopiadora del centro',
    horario: 'Horario: 8:30 a. m. – 7:30 p. m.',
    wifi: 'Wi-Fi libre (Centro_Estudiantes)',
    markerLeft: 77,
    markerTop: 72,
    nearby: [
      { name: 'Baños', distance: '12 m', time: 'Planta baja', type: 'restroom' },
      { name: 'Laboratorio de física', distance: '45 m', time: 'Abierto', type: 'lab' }
    ]
  }
};

export default function Home() {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'inicio';

  // State management for mock active building
  const [selectedBuildingId, setSelectedBuildingId] = useState('ingenieria');
  const selectedBuilding = BUILDINGS_DATA[selectedBuildingId] || BUILDINGS_DATA.ingenieria;

  // Zoom control level (for CSS transform scale)
  const [zoomLevel, setZoomLevel] = useState(1.1);

  // Upload Box simulated interaction states
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(97);
  const [lastAnalyzedTime, setLastAnalyzedTime] = useState('5 segundos');

  // Time tracker for mock analysis duration
  useEffect(() => {
    let interval;
    if (uploadedImage && !loading) {
      let seconds = 5;
      interval = setInterval(() => {
        seconds += 5;
        if (seconds < 60) {
          setLastAnalyzedTime(`${seconds} segundos`);
        } else {
          setLastAnalyzedTime(`${Math.floor(seconds / 60)} min`);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [uploadedImage, loading]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.15, 1.7));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.15, 0.95));
  };

  // Mock photo upload triggers loading process
  const triggerImageAnalysis = (imageSrc) => {
    setLoading(true);
    // Simulate API analysis response delay
    setTimeout(() => {
      setUploadedImage(imageSrc);
      setSelectedBuildingId('ingenieria'); // focus ingeniería by default on photo match
      setConfidence(95 + Math.floor(Math.random() * 4)); // randomize score
      setLastAnalyzedTime('5 segundos');
      setLoading(false);
    }, 1800);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      triggerImageAnalysis(previewUrl);
    }
  };

  const handleTomarFoto = () => {
    // Simulated webcam photo
    const mockPhoto = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop';
    triggerImageAnalysis(mockPhoto);
  };

  // Render Section Placeholder when not on "Inicio" tab
  if (currentTab !== 'inicio') {
    const tabDetails = {
      mapa: { name: 'Mapa completo', icon: <IconPin style={{ width: 48, height: 48 }} /> },
      lugares: { name: 'Catálogo de Lugares', icon: <IconBooks style={{ width: 48, height: 48 }} /> },
      rutas: { name: 'Planificador de Rutas', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 48, height: 48 }}><polyline points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /></svg> },
      favoritos: { name: 'Favoritos Guardados', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 48, height: 48 }}><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" /></svg> },
      historial: { name: 'Historial de Escaneos', icon: <IconClock style={{ width: 48, height: 48 }} /> },
      ayuda: { name: 'Ayuda y FAQs', icon: <IconInfo style={{ width: 48, height: 48 }} /> },
    };
    const activeDetails = tabDetails[currentTab] || { name: currentTab, icon: <IconInfo /> };
    return (
      <main style={{ flex: 1 }}>
        <div className="tab-placeholder fade-in">
          {activeDetails.icon}
          <h2>{activeDetails.name}</h2>
          <p>Esta sección está en desarrollo. Toda la funcionalidad interactiva se encuentra en el botón "Inicio".</p>
        </div>
      </main>
    );
  }

  return (
    <main className="sansilens-main-layout">
      <div className="sansilens-dashboard">
        
        {/* Central Layout Column: Map + Upload / Analysis */}
        <section className="sansilens-content-center">
          
          {/* Custom Campus Map Component */}
          <div className="campus-map-card fade-in">
            <div className="campus-map-container">
              
              {/* Zoom buttons */}
              <div className="map-zoom-controls">
                <button className="zoom-btn" onClick={handleZoomIn} title="Acercar">+</button>
                <button className="zoom-btn" onClick={handleZoomOut} title="Alejar">-</button>
              </div>

              {/* Vector SVG Campus Map Layout */}
              <div 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  transform: `scale(${zoomLevel})`, 
                  transformOrigin: 'center center',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <svg 
                  viewBox="0 0 800 500" 
                  width="100%" 
                  height="100%" 
                  style={{ display: 'block', backgroundColor: 'var(--sansilens-green-map)' }}
                >
                  {/* Decorative roads / path grid */}
                  <g stroke="#EAE6D6" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
                    <line x1="140" y1="0" x2="140" y2="500" />
                    <line x1="0" y1="230" x2="800" y2="230" />
                    <line x1="530" y1="0" x2="530" y2="500" />
                  </g>
                  
                  {/* Narrow pathways */}
                  <g stroke="#F8F6EB" strokeWidth="10" strokeLinecap="round" opacity="0.8">
                    <line x1="0" y1="120" x2="800" y2="120" />
                    <line x1="330" y1="0" x2="330" y2="500" strokeDasharray="5,5" />
                    <line x1="0" y1="410" x2="800" y2="410" />
                  </g>

                  {/* Scattered Trees (decorations) */}
                  <g fill="#A9DFBF" opacity="0.6">
                    <circle cx="80" cy="40" r="14" />
                    <circle cx="100" cy="30" r="10" />
                    <circle cx="480" cy="30" r="15" />
                    <circle cx="680" cy="40" r="8" />
                    <circle cx="700" cy="50" r="12" />
                    <circle cx="60" cy="270" r="12" />
                    <circle cx="480" cy="470" r="16" />
                    <circle cx="720" cy="450" r="15" />
                  </g>

                  {/* 1. Biblioteca Central Building (beige-brown) */}
                  <g 
                    className={`map-building-svg ${selectedBuildingId === 'biblioteca' ? 'active' : ''}`}
                    onClick={() => setSelectedBuildingId('biblioteca')}
                  >
                    <rect 
                      x="50" 
                      y="60" 
                      width="200" 
                      height="120" 
                      rx="14" 
                      fill="#E0A988" 
                      stroke={selectedBuildingId === 'biblioteca' ? '#4F46E5' : '#C5916C'} 
                      strokeWidth={selectedBuildingId === 'biblioteca' ? '3' : '1.5'}
                    />
                    
                    {/* Small grid inside to represent windows */}
                    <g fill="#A77A56" opacity="0.3">
                      <rect x="70" y="80" width="30" height="24" rx="4" />
                      <rect x="110" y="80" width="30" height="24" rx="4" />
                      <rect x="150" y="80" width="30" height="24" rx="4" />
                      <rect x="190" y="80" width="30" height="24" rx="4" />
                    </g>
                    
                    {/* Badge Icon (book) */}
                    <rect x="60" y="70" width="22" height="22" rx="6" fill="#14B8A6" />
                    <g transform="translate(63, 73) scale(0.65)" stroke="white" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20" fill="none" />
                    </g>

                    <text x="150" y="140" fill="#78350F" fontSize="13.5" fontWeight="700" textAnchor="middle">Biblioteca</text>
                    <text x="150" y="156" fill="#B45309" fontSize="11" textAnchor="middle">Central</text>
                  </g>

                  {/* 2. Edificio de Ingeniería Building (central Hexagon) */}
                  <g 
                    className={`map-building-svg ${selectedBuildingId === 'ingenieria' ? 'active' : ''}`}
                    onClick={() => setSelectedBuildingId('ingenieria')}
                  >
                    {/* Elongated Hexagon Shape */}
                    <polygon 
                      points="310 100, 480 100, 520 210, 480 350, 310 350, 270 210"
                      fill="#A5B4FC" 
                      stroke={selectedBuildingId === 'ingenieria' ? '#4F46E5' : '#818CF8'} 
                      strokeWidth={selectedBuildingId === 'ingenieria' ? '3' : '1.5'}
                    />
                    
                    {/* Grid of window squares */}
                    <g fill="#FFFFFF" opacity="0.6">
                      <rect x="330" y="125" width="36" height="30" rx="6" />
                      <rect x="380" y="125" width="36" height="30" rx="6" />
                      <rect x="430" y="125" width="36" height="30" rx="6" />
                      <rect x="330" y="165" width="36" height="30" rx="6" />
                      <rect x="380" y="165" width="36" height="30" rx="6" />
                      <rect x="430" y="165" width="36" height="30" rx="6" />
                      <rect x="330" y="205" width="36" height="30" rx="6" />
                      <rect x="380" y="205" width="36" height="30" rx="6" />
                      <rect x="430" y="205" width="36" height="30" rx="6" />
                    </g>
                    
                    <text x="395" y="295" fill="#312E81" fontSize="15" fontWeight="800" textAnchor="middle">Edificio de</text>
                    <text x="395" y="315" fill="#312E81" fontSize="15" fontWeight="800" textAnchor="middle">Ingeniería</text>
                  </g>

                  {/* 3. Laboratorios Building (gray, top-right) */}
                  <g 
                    className={`map-building-svg ${selectedBuildingId === 'laboratorios' ? 'active' : ''}`}
                    onClick={() => setSelectedBuildingId('laboratorios')}
                  >
                    <rect 
                      x="580" 
                      y="60" 
                      width="180" 
                      height="120" 
                      rx="14" 
                      fill="#CBD5E1" 
                      stroke={selectedBuildingId === 'laboratorios' ? '#4F46E5' : '#94A3B8'} 
                      strokeWidth={selectedBuildingId === 'laboratorios' ? '3' : '1.5'}
                    />
                    {/* Small grid inside */}
                    <g fill="#94A3B8" opacity="0.3">
                      <rect x="600" y="80" width="26" height="24" rx="4" />
                      <rect x="635" y="80" width="26" height="24" rx="4" />
                      <rect x="670" y="80" width="26" height="24" rx="4" />
                    </g>
                    
                    {/* Badge Icon (microscope) */}
                    <rect x="590" y="70" width="22" height="22" rx="6" fill="#3B82F6" />
                    <g transform="translate(593, 73) scale(0.65)" stroke="white" strokeWidth="2" fill="none">
                      <path d="M6 18h8M3 22h18M14 22a7 7 0 1 0-14 0 M9 14h2M9 12a3 3 0 0 1-3-3V6 M12 12a3 3 0 0 0 3-3V6" />
                    </g>

                    <text x="670" y="145" fill="#1E293B" fontSize="13.5" fontWeight="700" textAnchor="middle">Laboratorios</text>
                  </g>

                  {/* 4. Cafetería Building (peach-orange, bottom-left) */}
                  <g 
                    className={`map-building-svg ${selectedBuildingId === 'cafeteria' ? 'active' : ''}`}
                    onClick={() => setSelectedBuildingId('cafeteria')}
                  >
                    <rect 
                      x="50" 
                      y="330" 
                      width="190" 
                      height="130" 
                      rx="14" 
                      fill="#FCA5A5" 
                      stroke={selectedBuildingId === 'cafeteria' ? '#4F46E5' : '#F87171'} 
                      strokeWidth={selectedBuildingId === 'cafeteria' ? '3' : '1.5'}
                    />
                    
                    {/* Small grid inside */}
                    <g fill="#DC2626" opacity="0.15">
                      <rect x="70" y="350" width="24" height="24" rx="4" />
                      <rect x="105" y="350" width="24" height="24" rx="4" />
                      <rect x="140" y="350" width="24" height="24" rx="4" />
                    </g>
                    
                    {/* Badge Icon (coffee) */}
                    <rect x="60" y="340" width="22" height="22" rx="6" fill="#F59E0B" />
                    <g transform="translate(63, 343) scale(0.65)" stroke="white" strokeWidth="2" fill="none">
                      <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                    </g>

                    <text x="145" y="415" fill="#7F1D1D" fontSize="13.5" fontWeight="700" textAnchor="middle">Cafetería</text>
                    <text x="145" y="432" fill="#991B1B" fontSize="11" textAnchor="middle">Centro de docentes</text>
                  </g>

                  {/* 5. Centro de Estudiantes Building (slate, bottom-right) */}
                  <g 
                    className={`map-building-svg ${selectedBuildingId === 'estudiantes' ? 'active' : ''}`}
                    onClick={() => setSelectedBuildingId('estudiantes')}
                  >
                    <rect 
                      x="580" 
                      y="330" 
                      width="180" 
                      height="130" 
                      rx="14" 
                      fill="#CBD5E1" 
                      stroke={selectedBuildingId === 'estudiantes' ? '#4F46E5' : '#94A3B8'} 
                      strokeWidth={selectedBuildingId === 'estudiantes' ? '3' : '1.5'}
                    />
                    {/* Small grid inside */}
                    <g fill="#64748B" opacity="0.2">
                      <rect x="600" y="350" width="26" height="24" rx="4" />
                      <rect x="635" y="350" width="26" height="24" rx="4" />
                      <rect x="670" y="350" width="26" height="24" rx="4" />
                    </g>
                    
                    {/* Badge Icon (restroom/users) */}
                    <rect x="590" y="340" width="22" height="22" rx="6" fill="#10B981" />
                    <g transform="translate(593, 343) scale(0.65)" stroke="white" strokeWidth="2" fill="none">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8Z" />
                    </g>

                    <text x="670" y="415" fill="#334155" fontSize="13.5" fontWeight="700" textAnchor="middle">Centro de</text>
                    <text x="670" y="432" fill="#475569" fontSize="11" textAnchor="middle">Estudiantes</text>
                  </g>
                </svg>
              </div>

              {/* Dotted indicator line from marker to bottom of focused building */}
              <div 
                style={{
                  position: 'absolute',
                  left: `${selectedBuilding.markerLeft}%`,
                  top: `${selectedBuilding.markerTop}%`,
                  height: '60px',
                  width: '2px',
                  borderLeft: '2px dotted var(--sansilens-teal)',
                  pointerEvents: 'none',
                  zIndex: 15
                }}
              />

              {/* Pulsing "Estás aquí" User Marker */}
              <div 
                className="map-marker-pulse"
                style={{ 
                  left: `${selectedBuilding.markerLeft}%`,
                  top: `${selectedBuilding.markerTop + 10}%`
                }}
              >
                <div className="pulse-circle-container">
                  <div className="pulse-ring"></div>
                  <div className="pulse-dot"></div>
                </div>
                <div className="map-marker-label">Estás aquí</div>
              </div>

              {/* Bottom mobile centered indicator (only visible on mobile via CSS) */}
              <div className="map-mobile-indicator">
                <div className="map-mobile-indicator-dot"></div>
                <span>{selectedBuilding.name} &mdash; {selectedBuilding.floor}</span>
              </div>

            </div>
          </div>

          {/* Image Analysis Details Card */}
          <div className="analysis-panel fade-in fade-in-delay-1">
            <div className="analysis-thumb-container">
              <div className="analysis-label">
                <IconImageLabel />
                Imagen analizada
              </div>
              <div className={`analysis-img-box ${!uploadedImage ? 'green-mock' : ''}`}>
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Fotografía subida del campus" />
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 32, height: 32, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <div className="analysis-img-overlay">Edificio A</div>
                  </>
                )}
              </div>
            </div>

            <div className="analysis-info-row">
              <div>
                <div className="coincidence-status">
                  <IconCheckCircle />
                  Coincidencia encontrada
                </div>
                <div className="coincidence-desc">La IA detectó tu ubicación</div>
              </div>

              <div className="mini-building-pill">
                <div className="mini-building-icon">
                  <IconColumns style={{ width: 18, height: 18 }} />
                </div>
                <div className="mini-building-details">
                  <div className="mini-building-name">{selectedBuilding.name}</div>
                  <div className="mini-building-floor">{selectedBuilding.floor}</div>
                </div>
              </div>

              <div className="analysis-stats-bar">
                <div className="analysis-progress-group">
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#4B5563', minWidth: 92 }}>
                    Confianza: {confidence}%
                  </span>
                  <div className="analysis-progress-bar">
                    <div 
                      className="analysis-progress-fill" 
                      style={{ width: `${confidence}%`, transition: 'width 0.5s' }}
                    ></div>
                  </div>
                </div>
                
                <div className="analysis-stat-item" style={{ minWidth: 150, justifyContent: 'flex-end' }}>
                  <IconClock />
                  <span>Analizado hace {lastAnalyzedTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Upload Control Bar */}
          <div className="bottom-upload-bar fade-in fade-in-delay-2">
            <div className="upload-prompt-info">
              <div className="upload-prompt-icon">
                <IconCamera />
              </div>
              <div className="upload-prompt-text">
                <div className="upload-prompt-title">Sube una foto para identificar tu ubicación</div>
                <div className="upload-prompt-desc">La IA analizará la imagen y te mostrará dónde estás</div>
              </div>
            </div>

            <div className="upload-btn-group">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <button 
                className="upload-btn-violet" 
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-spinner"></span>
                ) : (
                  <>
                    <IconUpload style={{ width: 16, height: 16 }} />
                    <span>Subir imagen</span>
                  </>
                )}
              </button>
              
              <button 
                className="upload-btn-black" 
                onClick={handleTomarFoto}
                disabled={loading}
              >
                <IconCamera style={{ width: 16, height: 16 }} />
                <span>Tomar foto</span>
              </button>
            </div>
          </div>

        </section>

        {/* Right Layout Column: Sidebar details */}
        <aside className="sansilens-content-right fade-in">
          
          {/* Card: Location Detected */}
          <div className="sansilens-card">
            <div className="sansilens-card-header">
              <IconPin />
              <div className="sansilens-card-header-title">Ubicación detectada</div>
            </div>

            <div className="detected-box">
              <div className="detected-icon">
                <IconColumns />
              </div>
              <div className="detected-info">
                <div className="detected-title">{selectedBuilding.name}</div>
                <div className="detected-subtitle">{selectedBuilding.floor}</div>
              </div>
            </div>

            <div className="confidence-section">
              <div className="confidence-header">
                <span className="confidence-label">Confianza de la IA</span>
                <span className="confidence-number">{confidence}%</span>
              </div>
              <div className="confidence-bar-wrapper">
                <div 
                  className="confidence-bar-fill-gradient" 
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
            </div>

            <div className="card-footer-link">
              <span>Ver detalles del lugar</span>
              <span>&rsaquo;</span>
            </div>
          </div>

          {/* Card: Nearby places */}
          <div className="sansilens-card">
            <div className="nearby-header-row">
              <div className="nearby-title">Lugares cercanos</div>
              <div className="nearby-see-all">Ver todos</div>
            </div>

            <div className="nearby-list">
              {selectedBuilding.nearby.map((place, idx) => (
                <div className="nearby-item" key={idx}>
                  <div className={`nearby-avatar ${place.type}`}>
                    {place.type === 'coffee' && <IconCoffee />}
                    {place.type === 'library' && <IconBooks />}
                    {place.type === 'restroom' && <IconRestroom />}
                    {place.type === 'lab' && <IconMicroscope />}
                  </div>
                  <div className="nearby-details">
                    <div className="nearby-place-name">{place.name}</div>
                    <div className={`nearby-place-desc ${place.time === 'Planta baja' ? 'inactive' : ''}`}>
                      {place.time}
                    </div>
                  </div>
                  <div className="nearby-distance">{place.distance}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Place Information */}
          <div className="sansilens-card">
            <div className="sansilens-card-header" style={{ marginBottom: 16 }}>
              <IconInfo />
              <div className="sansilens-card-header-title" style={{ color: '#1F2937' }}>
                Información del lugar
              </div>
            </div>

            <div className="info-details-list">
              <div className="info-details-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /></svg>
                <span>{selectedBuilding.aulas}</span>
              </div>
              <div className="info-details-item">
                <IconMicroscope />
                <span>{selectedBuilding.labs}</span>
              </div>
              <div className="info-details-item">
                <IconClock />
                <span>{selectedBuilding.horario}</span>
              </div>
              <div className="info-details-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" /></svg>
                <span>{selectedBuilding.wifi}</span>
              </div>
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}
