const trafficPoints = [
  { id: "RP-001", name: "Rond-point Marjane / Allal El Fassi (Route de Casablanca)", coords: [31.667559, -8.011077], counts: [34, 22, 48, 16] },
  { id: "RP-002", name: "Rond-point Ayachi (Route de Safi)", coords: [31.68063, -8.04774], counts: [28, 14, 39, 21] },
  { id: "RP-003", name: "Rond-point de la Palmeraie", coords: [31.685439, -7.994264], counts: [18, 11, 27, 15] },
  { id: "RP-004", name: "Place Al Massira (Gare - Mohammed VI / Hassan II)", coords: [31.6295, -8.0168], counts: [42, 19, 31, 24] },
  { id: "RP-005", name: "Place du 16 Novembre", coords: [31.633285, -8.007830], counts: [36, 17, 45, 22] },
  { id: "RP-006", name: "Avenue Mohammed V (Gueliz - zone congestionnee)", coords: [31.6318, -8.0082], counts: [52, 28, 46, 33] }
];

const cameraDirections = [
  { key: "N", direction: "North", label: "Entree Nord", offset: [0.0022, 0], far: [0.0042, 0], level: "medium" },
  { key: "S", direction: "South", label: "Entree Sud", offset: [-0.0022, 0], far: [-0.0042, 0], level: "low" },
  { key: "E", direction: "East", label: "Entree Est", offset: [0, 0.0028], far: [0, 0.0050], level: "high" },
  { key: "W", direction: "West", label: "Entree Ouest", offset: [0, -0.0028], far: [0, -0.0050], level: "medium" }
];

const levelColors = {
  low: "#22C55E",
  medium: "#F97316",
  high: "#EF4444"
};

function roundCoord(value) {
  return Number(value.toFixed(6));
}

function addCoords(coords, offset) {
  return [
    roundCoord(coords[0] + offset[0]),
    roundCoord(coords[1] + offset[1])
  ];
}

export const trafficIntersections = trafficPoints.map(point => ({
  id: point.id,
  name: point.name,
  coords: point.coords,
  roads: cameraDirections.map(direction => ({
    name: `${direction.label} - ${point.name}`,
    level: direction.level,
    color: levelColors[direction.level],
    coordinates: [
      point.coords,
      addCoords(point.coords, [direction.offset[0] * 0.45, direction.offset[1] * 0.45]),
      addCoords(point.coords, direction.offset),
      addCoords(point.coords, direction.far)
    ]
  })),
  cameras: cameraDirections.map((direction, index) => ({
    id: `CAM-${point.id.replace("RP-", "RP")}-${direction.key}`,
    direction: direction.direction,
    label: direction.label,
    coords: point.coords,
    vehicleCount: point.counts[index],
    roadSegment: [
      addCoords(point.coords, direction.far),
      addCoords(point.coords, direction.offset),
      point.coords
    ]
  }))
}));

if (typeof window !== "undefined") {
  window.initialTrafficIntersections = trafficIntersections;
}
