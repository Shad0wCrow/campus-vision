import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
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

const CAMPUS_CENTER = {
  lat: -17.3937491,
  lng: -66.1457166,
};

function getMapCoordinates(building) {
  const lat = Number(building?.lat);
  const lng = Number(building?.lng);

  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return { lat, lng };
  }

  return CAMPUS_CENTER;
}

function RecenterMap({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 19);
  }, [lat, lng, map]);

  return null;
}

function RouteBounds({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(positions, { padding: [36, 36], maxZoom: 19 });
    }
  }, [positions, map]);

  return null;
}

const buildingIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width:36px; height:36px;
      background:#2563EB;
      border-radius:50% 50% 50% 4px;
      transform:rotate(-45deg);
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 4px 14px rgba(37,99,235,0.45);
      border:2px solid white;
    ">
      <div style="
        transform:rotate(45deg);
        color:white; font-size:14px;
        display:flex; align-items:center; justify-content:center;
        width:100%; height:100%;
      ">📍</div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -38],
});

const userLocationIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width:22px; height:22px;
      background:#0EA5E9;
      border:3px solid white;
      border-radius:50%;
      box-shadow:0 0 0 5px rgba(14,165,233,0.22), 0 4px 12px rgba(15,23,42,0.22);
    "></div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -12],
});

const ROUTE_SERVICES = [
  (from, to) => `https://routing.openstreetmap.de/routed-foot/route/v1/foot/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`,
  (from, to) => `https://router.project-osrm.org/route/v1/foot/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`,
  (from, to) => `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`,
];

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    });
  });
}

async function fetchRoutePositions(from, to) {
  let lastError;

  for (const createUrl of ROUTE_SERVICES) {
    try {
      const response = await fetch(createUrl(from, to));
      if (!response.ok) throw new Error('No se pudo consultar el servicio de rutas.');

      const data = await response.json();
      const coordinates = data.routes?.[0]?.geometry?.coordinates;

      if (Array.isArray(coordinates) && coordinates.length > 1) {
        return coordinates.map(([routeLng, routeLat]) => [routeLat, routeLng]);
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('No se pudo calcular la ruta.');
}

function MapPlaceholder({ building }) {
  const [locating, setLocating] = useState(false);
  const [userPosition, setUserPosition] = useState(null);
  const [routePositions, setRoutePositions] = useState([]);
  const [routeIsFallback, setRouteIsFallback] = useState(false);
  const [routeMessage, setRouteMessage] = useState('');
  const code = building?.code?.slice(0, 2) || '??';
  const name = building?.name || 'Edificio identificado';
  const zone = building?.zone ? `Zona ${building.zone}` : 'Campus UMSS';
  const { lat, lng } = getMapCoordinates(building);

  useEffect(() => {
    setUserPosition(null);
    setRoutePositions([]);
    setRouteIsFallback(false);
    setRouteMessage('');
  }, [lat, lng]);

  async function handleDirectionsClick() {
    if (!navigator.geolocation) {
      setRouteMessage('Tu navegador no permite obtener ubicación.');
      return;
    }

    setLocating(true);
    setRouteMessage('Buscando tu ubicación...');
    setRouteIsFallback(false);

    try {
      const { coords } = await getCurrentPosition();
      const origin = { lat: coords.latitude, lng: coords.longitude };
      const destination = { lat, lng };

      setUserPosition([origin.lat, origin.lng]);
      setRouteMessage('Calculando ruta...');

      try {
        const positions = await fetchRoutePositions(origin, destination);
        setRoutePositions(positions);
        setRouteMessage('Ruta trazada desde tu ubicación.');
      } catch {
        setRoutePositions([[origin.lat, origin.lng], [destination.lat, destination.lng]]);
        setRouteIsFallback(true);
        setRouteMessage('Ruta no disponible; se muestra línea directa.');
      }
    } catch {
      setUserPosition(null);
      setRoutePositions([]);
      setRouteMessage('Permite tu ubicación para trazar la ruta.');
    } finally {
      setLocating(false);
    }
  }

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

      <div id="map-container" className="map-viewport">
        <MapContainer
          center={[lat, lng]}
          zoom={19}
          maxZoom={21}
          style={{ width: '100%', height: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}
          attributionControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
            maxNativeZoom={19}
            maxZoom={21}
          />
          <RecenterMap lat={lat} lng={lng} />
          {routePositions.length > 1 && (
            <>
              <Polyline
                positions={routePositions}
                pathOptions={{
                  color: '#2563EB',
                  weight: 5,
                  opacity: 0.86,
                  dashArray: routeIsFallback ? '8 10' : undefined,
                }}
              />
              <RouteBounds positions={routePositions} />
            </>
          )}
          {userPosition && (
            <Marker position={userPosition} icon={userLocationIcon}>
              <Popup>
                <div style={{ fontFamily: 'Inter, sans-serif', minWidth: 120 }}>
                  <p style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', margin: '0 0 4px' }}>
                    Tu ubicación
                  </p>
                  <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>
                    Punto de partida
                  </p>
                </div>
              </Popup>
            </Marker>
          )}
          <Marker position={[lat, lng]} icon={buildingIcon}>
            <Popup>
              <div style={{ fontFamily: 'Inter, sans-serif', minWidth: 160 }}>
                <p style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', margin: '0 0 4px' }}>
                  {name}
                </p>
                <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 2px' }}>
                  {zone} · Campus UMSS
                </p>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>
                  {lat.toFixed(4)}, {lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
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
          <button className="map-action-btn map-action-btn-primary" onClick={handleDirectionsClick} disabled={locating} type="button">
            <IconNavigation />
            {locating ? 'Trazando ruta...' : routePositions.length > 1 ? 'Actualizar ruta' : 'Cómo llegar'}
          </button>
          {routeMessage && (
            <span style={{ maxWidth: 220, fontSize: 11, lineHeight: 1.3, color: '#64748B' }}>
              {routeMessage}
            </span>
          )}
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
