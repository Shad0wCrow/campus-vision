function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M3 9h18M9 21V9" />
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

function getPlaceholderGradient(id) {
  const gradients = [
    ['#EFF6FF', '#DBEAFE'], 
    ['#F0FDF4', '#DCFCE7'], 
    ['#FFF7ED', '#FED7AA'], 
    ['#FDF4FF', '#F3E8FF'], 
    ['#F0FDFA', '#CCFBF1'], 
  ];
  return gradients[(id - 1) % gradients.length];
}

export default function BuildingCard({ building }) {
  const [from, to] = getPlaceholderGradient(building.id);

  return (
    <article className="building-card">
      {building.image ? (
        <img
          className="building-card-img"
          src={building.image}
          alt={`Fotografía del edificio ${building.name}`}
          loading="lazy"
        />
      ) : (
        <div
          className="building-card-img-placeholder"
          style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
          aria-label={`Edificio ${building.name}, sin imagen disponible`}
        >
          <IconBuilding />
          <span>{building.code}</span>
        </div>
      )}

      <div className="building-card-body">
        <p className="building-card-id">{building.code}</p>
        <h3 className="building-card-name">{building.name}</h3>
        {building.zone && (
          <span className="building-card-zone">
            <IconPin />
            Zona {building.zone}
          </span>
        )}
      </div>
    </article>
  );
}
