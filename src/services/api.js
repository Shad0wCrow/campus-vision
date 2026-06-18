import * as tmImage from "@teachablemachine/image";

let model;

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
  img.src = URL.createObjectURL(file);

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const prediction = await model.predict(img);

  // ordenar mejor a peor
  prediction.sort((a, b) => b.probability - a.probability);

  const best = prediction[0];

  return {
    building: {
      name: best.className,
      code: best.className.slice(0, 4),
    },
    confidence: best.probability,
    matches: prediction.map(p => ({
      building: {
        name: p.className,
        code: p.className.slice(0, 4),
      },
      confidence: p.probability,
    })),
  };
}