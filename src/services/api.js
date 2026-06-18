/**
 * services/api.js
 *
 * Capa de servicio para comunicación con el backend.
 * Por ahora devuelve datos mock.
 * Cuando el backend esté listo, solo se modifica este archivo.
 *
 * Base URL de ejemplo para producción:
 * const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
 */

// ─── Datos mock internos (solo para simular predicción) ───────

const MOCK_BUILDINGS = [
  { id: 1,  code: 'FCyT',  name: 'Facultad de Ciencias y Tecnología', zone: 'Norte',   year: 1987 },
  { id: 2,  code: 'FCA',   name: 'Facultad de Ciencias Agrícolas',     zone: 'Sur',     year: 1972 },
  { id: 3,  code: 'RECT',  name: 'Rectorado',                          zone: 'Central', year: 1954 },
  { id: 4,  code: 'BIBL',  name: 'Biblioteca Central',                 zone: 'Central', year: 1968 },
  { id: 5,  code: 'AUDIT', name: 'Auditorio Universitario',            zone: 'Central', year: 1975 },
  { id: 6,  code: 'FCEA',  name: 'Facultad de Ciencias Económicas',    zone: 'Este',    year: 1963 },
  { id: 7,  code: 'FD',    name: 'Facultad de Derecho',                zone: 'Este',    year: 1959 },
  { id: 8,  code: 'FM',    name: 'Facultad de Medicina',               zone: 'Norte',   year: 1948 },
  { id: 9,  code: 'FAU',   name: 'Facultad de Arquitectura',           zone: 'Oeste',   year: 1981 },
  { id: 10, code: 'FH',    name: 'Facultad de Humanidades',            zone: 'Sur',     year: 1966 },
  { id: 11, code: 'LABQ',  name: 'Laboratorio de Química',             zone: 'Norte',   year: 1992 },
  { id: 12, code: 'LABF',  name: 'Laboratorio de Física',              zone: 'Norte',   year: 1994 },
  { id: 13, code: 'CCINF', name: 'Centro de Cómputo',                 zone: 'Central', year: 1998 },
  { id: 14, code: 'GIM',   name: 'Gimnasio Universitario',             zone: 'Sur',     year: 1985 },
  { id: 15, code: 'CAF',   name: 'Cafetería Central',                  zone: 'Central', year: 1977 },
  { id: 16, code: 'MEDIC', name: 'Centro Médico Universitario',        zone: 'Central', year: 1983 },
  { id: 17, code: 'POSG',  name: 'Centro de Posgrado',                 zone: 'Este',    year: 2001 },
  { id: 18, code: 'IDI',   name: 'Instituto de Investigación',         zone: 'Norte',   year: 2005 },
  { id: 19, code: 'CULT',  name: 'Centro Cultural',                    zone: 'Oeste',   year: 1990 },
  { id: 20, code: 'ADMIN', name: 'Edificio Administrativo',            zone: 'Central', year: 1971 },
  { id: 21, code: 'FCOM',  name: 'Facultad de Comunicación',           zone: 'Oeste',   year: 1996 },
  { id: 22, code: 'FODO',  name: 'Facultad de Odontología',            zone: 'Sur',     year: 1969 },
  { id: 23, code: 'FARM',  name: 'Facultad de Farmacia',               zone: 'Sur',     year: 1973 },
  { id: 24, code: 'VET',   name: 'Facultad de Veterinaria',            zone: 'Norte',   year: 1978 },
  { id: 25, code: 'DEPO',  name: 'Complejo Deportivo',                 zone: 'Sur',     year: 2010 },
];

function getMockPrediction(building) {
  const others = MOCK_BUILDINGS.filter(b => b.id !== building.id);
  const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
  return {
    building,
    confidence: 0.88 + Math.random() * 0.10,
    matches: shuffled.map((b, i) => ({
      building: b,
      confidence: 0.35 - i * 0.10 + Math.random() * 0.08,
    })),
  };
}

// ─── Funciones públicas ───────────────────────────────────────

/**
 * Envía una imagen al backend para identificar el edificio.
 * Reemplazar el mock con:
 *
 *   const formData = new FormData();
 *   formData.append('image', imageFile);
 *   const res = await fetch(`${BASE_URL}/predict`, { method: 'POST', body: formData });
 *   if (!res.ok) throw new Error('Error en la predicción');
 *   return await res.json();
 *
 * @param {File} imageFile - Archivo de imagen seleccionado por el usuario
 * @returns {Promise<{building: Object, confidence: number, matches: Array}>}
 */
export async function predictBuilding(imageFile) {
  await new Promise(resolve => setTimeout(resolve, 2200));

  if (Math.random() < 0.05) {
    throw new Error('No se pudo conectar con el servidor de análisis.');
  }

  const randomBuilding = MOCK_BUILDINGS[Math.floor(Math.random() * MOCK_BUILDINGS.length)];
  return getMockPrediction(randomBuilding);
}
