/**
 * Ungefähre Koordinaten (Stadtzentrum, WGS84) für die schematische Karte.
 * Bewusst getrennt von cities.json, damit die Datendatei unverändert bleibt.
 */
export const coords: Record<string, [lat: number, lon: number]> = {
  aachen: [50.776, 6.084],
  aschaffenburg: [49.977, 9.152],
  bielefeld: [52.021, 8.532],
  bonn: [50.737, 7.098],
  bremen: [53.079, 8.802],
  bremerhaven: [53.54, 8.581],
  dortmund: [51.514, 7.468],
  duesseldorf: [51.227, 6.774],
  essen: [51.456, 7.012],
  freiburg: [47.999, 7.842],
  giessen: [50.584, 8.678],
  hamburg: [53.551, 9.994],
  hannover: [52.376, 9.732],
  kaiserslautern: [49.444, 7.769],
  karlsruhe: [49.007, 8.404],
  kehl: [48.573, 7.815],
  koblenz: [50.356, 7.594],
  koeln: [50.938, 6.96],
  luxemburg: [49.612, 6.13],
  mainz: [49.993, 8.247],
  mannheim: [49.488, 8.467],
  marburg: [50.81, 8.771],
  metz: [49.12, 6.176],
  muenchen: [48.137, 11.576],
  nuernberg: [49.452, 11.077],
  offenbach: [50.096, 8.766],
  paderborn: [51.719, 8.757],
  passau: [48.567, 13.432],
  regensburg: [49.013, 12.102],
  saarbruecken: [49.24, 6.997],
  strassburg: [48.573, 7.752],
  stuttgart: [48.776, 9.183],
  trier: [49.75, 6.637],
  ulm: [48.401, 9.988],
  wiesbaden: [50.078, 8.24],
  wolfsburg: [52.423, 10.787],
  worms: [49.632, 8.359],
  wuerzburg: [49.792, 9.953],
  wuppertal: [51.256, 7.15],
};

/** Stark vereinfachte Flussverläufe (Rhein, Mosel, Main) für die Hintergrundgrafik. */
export const rivers: Record<string, [number, number][]> = {
  rhein: [
    [47.56, 7.59], [48.0, 7.57], [48.58, 7.8], [49.03, 8.3], [49.49, 8.45], [49.63, 8.37],
    [50.0, 8.27], [49.97, 7.9], [50.36, 7.6], [50.73, 7.1], [50.94, 6.96], [51.23, 6.77],
    [51.43, 6.75], [51.83, 6.25],
  ],
  mosel: [
    [49.12, 6.18], [49.36, 6.17], [49.47, 6.36], [49.75, 6.64], [49.92, 7.07], [50.14, 7.17],
    [50.36, 7.6],
  ],
  main: [
    [49.9, 10.9], [50.05, 10.23], [49.79, 9.95], [49.76, 9.52], [49.98, 9.15], [50.1, 8.77],
    [50.11, 8.68], [50.0, 8.27],
  ],
};

export interface Box {
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
}

/** Einfache Abstandstreue Projektion (ausreichend für eine schematische Darstellung). */
export function projector(box: Box, width: number) {
  const k = Math.cos(((box.latMin + box.latMax) / 2) * (Math.PI / 180));
  const scale = width / ((box.lonMax - box.lonMin) * k);
  const height = (box.latMax - box.latMin) * scale;
  const project = ([lat, lon]: [number, number]): [number, number] => [
    +((lon - box.lonMin) * k * scale).toFixed(1),
    +((box.latMax - lat) * scale).toFixed(1),
  ];
  return { project, width, height: Math.round(height) };
}

export function pathFrom(points: [number, number][]): string {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
}
