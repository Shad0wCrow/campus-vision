import { useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";

export default function Reconocimiento() {
  const [model, setModel] = useState(null);
  const [resultado, setResultado] = useState("");

  const modelURL = "/modelo/model.json";
  const metadataURL = "/modelo/metadata.json";

  // Cargar modelo UNA sola vez
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !model) return;

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      const prediction = await model.predict(img);

      let best = prediction[0];

      prediction.forEach((p) => {
        if (p.probability > best.probability) {
          best = p;
        }
      });

      setResultado(
        `${best.className} (${(best.probability * 100).toFixed(2)}%)`
      );
    };
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Reconocimiento de Edificios</h2>

      <input type="file" accept="image/*" onChange={handleImage} />

      <h3>{resultado}</h3>
    </div>
  );
}