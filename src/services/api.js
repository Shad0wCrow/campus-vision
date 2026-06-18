import * as tmImage from "@teachablemachine/image";

let model;

const CAMPUS_CENTER = {
  lat: -17.3937491,
  lng: -66.1457166,
};

const BUILDING_CATALOG = {
  "biblioteca": {
    id: 1,
    mapNumber: 19,
    code: "BIB",
    name: "Biblioteca Facultad Ciencias y Tecnología",
    zone: "FCyT",
    lat: -17.3926863,
    lng: -66.1456984,
  },
  "c.a.e.": {
    id: 2,
    mapNumber: 47,
    code: "CAE",
    name: "Educación Asistida por Computador",
    zone: "FCyT",
    lat: -17.3928803,
    lng: -66.1457099,
  },
  "cafe docente": {
    id: 3,
    mapNumber: 48,
    code: "CAF",
    name: "Café Docente",
    zone: "Campus Central",
    lat: -17.3943318,
    lng: -66.1486572,
  },
  "central": {
    id: 4,
    mapNumber: 1,
    code: "UMSS",
    name: "Campus Central UMSS",
    zone: "Campus Central",
    lat: CAMPUS_CENTER.lat,
    lng: CAMPUS_CENTER.lng,
  },
  "centro de aguas": {
    id: 5,
    mapNumber: 3,
    code: "CASA",
    name: "Centro de Aguas y Saneamiento Ambiental",
    zone: "FCyT",
    lat: -17.3926928,
    lng: -66.1444563,
  },
  "centros alimentos y productos naturales": {
    id: 6,
    mapNumber: 6,
    code: "CAPN",
    name: "Centro de Alimentos y Productos Naturales",
    zone: "FCyT",
    lat: -17.3930682,
    lng: -66.1443999,
  },
  "centro de biodiversidad y genetica": {
    id: 7,
    mapNumber: 8,
    code: "CBG",
    name: "Centro de Biodiversidad y Genética",
    zone: "FCyT",
    lat: -17.3938465,
    lng: -66.1445719,
  },
  "centro de estudiantes de informatica": {
    id: 8,
    mapNumber: 35,
    code: "SCESI",
    name: "Centro de Estudiantes de Informática",
    zone: "FCyT",
    lat: -17.3932700,
    lng: -66.1449258,
  },
  "centro tecno agro industrial": {
    id: 9,
    mapNumber: 25,
    code: "CTA",
    name: "Centro de Tecnología Agroindustrial",
    zone: "FCyT",
    lat: -17.3938158,
    lng: -66.1443885,
  },
  "c.i.e.e. electronica": {
    id: 10,
    mapNumber: 17,
    code: "CEIEE",
    name: "Centro de Estudiantes de Ingeniería Eléctrica y Electrónica",
    zone: "FCyT",
    lat: -17.3934237,
    lng: -66.1453649,
  },
  "citema laproqui": {
    id: 11,
    mapNumber: 27,
    code: "CITEMA",
    name: "CITEMA LAPROQUI",
    zone: "FCyT",
    lat: -17.3938810,
    lng: -66.1442150,
  },
  "dpto. de fisica": {
    id: 12,
    mapNumber: 4,
    code: "FIS",
    name: "Departamento de Física",
    zone: "FCyT",
    lat: -17.3928730,
    lng: -66.1448097,
  },
  "dpto. ing. electrica y electronica": {
    id: 13,
    mapNumber: 15,
    code: "ELEC",
    name: "Departamento de Ingeniería Eléctrica y Electrónica",
    zone: "FCyT",
    lat: -17.3934237,
    lng: -66.1453649,
  },
  "dpto. ing. industrial": {
    id: 14,
    mapNumber: 31,
    code: "IND",
    name: "Departamento de Industrias",
    zone: "FCyT",
    lat: -17.3932996,
    lng: -66.1458220,
  },
  "dpto. ing. informatica y sistemas": {
    id: 15,
    mapNumber: 43,
    code: "INF",
    name: "Departamento de Informática y Sistemas",
    zone: "FCyT",
    lat: -17.3930574,
    lng: -66.1469087,
  },
  "dpto. quimica": {
    id: 16,
    mapNumber: 7,
    code: "QUI",
    name: "Departamento de Química",
    zone: "FCyT",
    lat: -17.3934854,
    lng: -66.1443164,
  },
  "edificio academico 1": {
    id: 17,
    mapNumber: 37,
    code: "EA1",
    name: "Edificio Académico 1",
    zone: "Campus Central",
    lat: -17.3940182,
    lng: -66.1474648,
  },
  "edificio academico 2": {
    id: 18,
    mapNumber: 38,
    code: "EA2",
    name: "Edificio Académico 2",
    zone: "FCyT",
    lat: -17.3948074,
    lng: -66.1447913,
  },
  "edificio c.a.d. y c.a.m.": {
    id: 19,
    mapNumber: 28,
    code: "CAD",
    name: "Edificio C.A.D. y C.A.M.",
    zone: "Campus Central",
    lat: -17.3940061,
    lng: -66.1473992,
  },
  "embate": {
    id: 20,
    mapNumber: 16,
    code: "EMB",
    name: "EMBATE",
    zone: "Campus Central",
    lat: -17.3937491,
    lng: -66.1457166,
  },
  "instituto de investigacion utt": {
    id: 21,
    mapNumber: 3,
    code: "UTT",
    name: "Instituto de Investigación UTT",
    zone: "FCyT",
    lat: -17.3936875,
    lng: -66.1455485,
  },
  "m.e.m.i.": {
    id: 22,
    mapNumber: 41,
    code: "MEMI",
    name: "Centro de Mejoramiento de la Enseñanza de la Matemática e Informática",
    zone: "FCyT",
    lat: -17.3932967,
    lng: -66.1469490,
  },
  "planta piloto de produccion industrial": {
    id: 23,
    mapNumber: 39,
    code: "PPI",
    name: "Planta Piloto de Procesos Industriales",
    zone: "FCyT",
    lat: -17.3947939,
    lng: -66.1452586,
  },
  "snack tecnologia": {
    id: 24,
    mapNumber: 2,
    code: "SNACK",
    name: "Snack Tecnología",
    zone: "FCyT",
    lat: -17.3936345,
    lng: -66.1457936,
  },
  "vakita": {
    id: 25,
    mapNumber: 49,
    code: "VAK",
    name: "Vakita",
    zone: "Campus Central",
    lat: -17.3943318,
    lng: -66.1486572,
  },
};

function normalizeLabel(label) {
  return label
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function enrichBuilding(className) {
  const key = normalizeLabel(className);
  const building = BUILDING_CATALOG[key];

  if (building) return building;

  return {
    id: key,
    code: className.slice(0, 4).trim().toUpperCase() || "UMSS",
    name: className.trim(),
    zone: "Campus Central",
    lat: CAMPUS_CENTER.lat,
    lng: CAMPUS_CENTER.lng,
  };
}

// Cargar modelo UNA sola vez
export async function loadModel() {
  if (model) return model;


  const modelURL = "/modelo/model.json";
  const metadataURL = "/modelo/metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  return model;
}

// Predecir imagen
export async function predictBuilding(file) {
  const model = await loadModel();

  const img = document.createElement("img");
  const imageUrl = URL.createObjectURL(file);
  img.src = imageUrl;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = () => reject(new Error("No se pudo leer la imagen seleccionada."));
  });

  try {
    const prediction = await model.predict(img);

    // ordenar mejor a peor
    prediction.sort((a, b) => b.probability - a.probability);

    const best = prediction[0];

   return {
        building: enrichBuilding(best.className),
        confidence: best.probability,

        matches: prediction
          .slice(1, 4)
          .map(p => ({
            building: enrichBuilding(p.className),
            confidence: p.probability,
          })),
      };
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}
