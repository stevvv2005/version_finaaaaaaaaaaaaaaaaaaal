// TODO: Replace approximate coordinates with official GTFS / operator coordinates.
const commonStops = {
  babDoukkala: { name: "Bab Doukkala", coords: [31.6359, -7.9986] },
  jamaaElFna: { name: "Jamaa El Fna", coords: [31.6258, -7.9891] },
  babGhmat: { name: "Bab Ghmat", coords: [31.6173, -7.9741] },
  sidiMimoun: { name: "Sidi Mimoun", coords: [31.6227, -7.9972] },
  mhamid: { name: "Mhamid", coords: [31.5905, -8.0273] },
  massira3: { name: "Massira 3", coords: [31.6500, -8.0500] },
  airport: { name: "Aeroport Marrakech Menara", coords: [31.6069, -8.0363] },
  koutoubia: { name: "Koutoubia", coords: [31.6244, -7.9932] },
  gueliz: { name: "Gueliz", coords: [31.6370, -8.0100] },
  carreEden: { name: "Carre Eden", coords: [31.6317, -8.0081] },
  semlalia: { name: "Faculte De Semlalia", coords: [31.6394, -8.0066] },
  marcheGros: { name: "Marche de Gros", coords: [31.6686, -7.9743] },
  sidiYoussef: { name: "Sidi Youssef Ben Ali", coords: [31.6118, -7.9717] },
  izdihar: { name: "Izdihar", coords: [31.6588, -8.0208] },
  sidiGhanem: { name: "Sidi Ghanem", coords: [31.6710, -8.0360] },
  azli: { name: "Azli Sud", coords: [31.6075, -8.0610] },
  socoma: { name: "Socoma", coords: [31.5987, -7.9530] },
  tamensourt: { name: "Tamensourt", coords: [31.7175, -8.1118] },
  tahennaout: { name: "Tahanaout", coords: [31.3565, -7.9479] },
  aitOurir: { name: "Ait Ourir", coords: [31.5631, -7.6612] },
  amizmiz: { name: "Amizmiz", coords: [31.2167, -8.2333] },
  chichaoua: { name: "Chichaoua", coords: [31.5435, -8.7644] },
  benguerir: { name: "Benguerir", coords: [32.2359, -7.9538] }
};

const palette = [
  "#2563EB", "#0EA5E9", "#16A34A", "#7C3AED", "#0891B2", "#4F46E5",
  "#059669", "#0284C7", "#9333EA", "#0F766E", "#1D4ED8", "#65A30D"
];

function stop(order, name, coords) {
  return { order, name, coords };
}

function buildStops(points) {
  return points.map((point, index) => stop(index + 1, point.name, point.coords));
}

function makeLine(id, from, to, type, points, options = {}) {
  const stops = buildStops(points);
  return {
    id,
    name: options.name || `Ligne ${id}`,
    operator: "ALSA Marrakech",
    from,
    to,
    type,
    color: options.color || palette[Math.abs(String(id).split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)) % palette.length],
    frequency: options.frequency || "15-25 min",
    duration: options.duration || "35-55 min",
    serviceHours: options.serviceHours || "06:30 - 22:00",
    stops,
    route: options.route || stops.map(item => item.coords)
  };
}

export const busLines = [
  {
    id: "1",
    name: "Ligne 1",
    operator: "ALSA Marrakech",
    from: "Bab Doukkala",
    to: "Jamaa El Fna",
    type: "urban",
    color: "#2563EB",
    frequency: "10-12 min",
    duration: "32 min",
    serviceHours: "07:12 - 21:20",
    stops: [
      stop(1, "Bab Doukkala", [31.6359, -7.9986]),
      stop(2, "Ben Tbib", [31.6347, -7.9965]),
      stop(3, "Club Ministere De La Justice", [31.6337, -7.9943]),
      stop(4, "Rouidate", [31.6328, -7.9919]),
      stop(5, "Faculte De Semlalia", [31.6394, -8.0066]),
      stop(6, "Cafe Amine", [31.6382, -8.0039]),
      stop(7, "Mcdonald's", [31.6369, -8.0021]),
      stop(8, "Douar El Koudia", [31.6351, -7.9996]),
      stop(9, "Semiramis", [31.6334, -7.9973]),
      stop(10, "Faculte Des Sciences Et Techniques", [31.6319, -7.9952]),
      stop(11, "Place D'Armes", [31.6302, -7.9931]),
      stop(12, "Place Abdelmoumen", [31.6291, -7.9912]),
      stop(13, "Carre Eden", [31.6317, -8.0081]),
      stop(14, "Grande Poste", [31.6306, -8.0027]),
      stop(15, "Rond-Point Berdii", [31.6292, -7.9986]),
      stop(16, "Hotel De Ville", [31.6279, -7.9947]),
      stop(17, "Koutoubia", [31.6244, -7.9932]),
      stop(18, "Jamaa El Fna", [31.6258, -7.9891])
    ],
    route: [
      [31.6359, -7.9986], [31.6347, -7.9965], [31.6337, -7.9943], [31.6328, -7.9919],
      [31.6394, -8.0066], [31.6382, -8.0039], [31.6369, -8.0021], [31.6351, -7.9996],
      [31.6334, -7.9973], [31.6319, -7.9952], [31.6302, -7.9931], [31.6291, -7.9912],
      [31.6317, -8.0081], [31.6306, -8.0027], [31.6292, -7.9986], [31.6279, -7.9947],
      [31.6244, -7.9932], [31.6258, -7.9891]
    ]
  },
  makeLine("2", "Jamaa El Fna", "Ain Itti", "urban", [commonStops.jamaaElFna, commonStops.koutoubia, commonStops.babDoukkala, commonStops.gueliz, { name: "Ain Itti", coords: [31.6666, -7.9820] }], { frequency: "12-15 min" }),
  makeLine("3", "Jamaa El Fna", "Dar Salam", "urban", [commonStops.jamaaElFna, commonStops.koutoubia, commonStops.gueliz, { name: "Dar Salam", coords: [31.6548, -8.0227] }]),
  makeLine("4", "Jamaa El Fna", "Guennoun", "urban", [commonStops.jamaaElFna, commonStops.sidiYoussef, { name: "Guennoun", coords: [31.5969, -7.9504] }]),
  makeLine("5", "Jamaa El Fna", "Doha", "urban", [commonStops.jamaaElFna, commonStops.babGhmat, { name: "Doha", coords: [31.5912, -7.9694] }]),
  makeLine("6", "Bab Ghmat", "Massira 3", "urban", [commonStops.babGhmat, commonStops.koutoubia, commonStops.carreEden, commonStops.massira3], { frequency: "10-18 min" }),
  makeLine("7", "Sidi Youssef Ben Ali", "Marche de Gros", "urban", [commonStops.sidiYoussef, commonStops.jamaaElFna, commonStops.babDoukkala, commonStops.marcheGros]),
  makeLine("9", "Massira 3", "Douar Dlam", "urban", [commonStops.massira3, commonStops.izdihar, commonStops.babDoukkala, { name: "Douar Dlam", coords: [31.6819, -8.0141] }]),
  makeLine("10", "Jamaa El Fna", "Massira 3", "urban", [commonStops.jamaaElFna, commonStops.koutoubia, commonStops.carreEden, commonStops.massira3]),
  makeLine("11", "Ecole Elmaali Mhamid", "Lycee Ben Youssef", "urban", [{ name: "Ecole Elmaali Mhamid", coords: [31.5869, -8.0311] }, commonStops.airport, commonStops.koutoubia, { name: "Lycee Ben Youssef", coords: [31.6320, -7.9864] }]),
  makeLine("12", "Mhamid 9", "Sanawbar", "urban", [{ name: "Mhamid 9", coords: [31.5758, -8.0326] }, commonStops.airport, commonStops.gueliz, { name: "Sanawbar", coords: [31.6607, -8.0042] }]),
  makeLine("13", "Massira 3", "Izdihar", "urban", [commonStops.massira3, { name: "Hay Mabrouka", coords: [31.6460, -8.0397] }, commonStops.izdihar]),
  makeLine("14", "Jamaa El Fna", "Azli Sud", "urban", [commonStops.jamaaElFna, commonStops.airport, commonStops.azli]),
  makeLine("15", "Jamaa El Fna", "Sidi Ghanem", "urban", [commonStops.jamaaElFna, commonStops.babDoukkala, commonStops.gueliz, commonStops.sidiGhanem]),
  makeLine("16", "Jamaa El Fna", "Azzouzia", "urban", [commonStops.jamaaElFna, commonStops.babDoukkala, { name: "Azzouzia", coords: [31.6880, -8.0542] }]),
  makeLine("17", "Bab Doukkala", "Ecole Americaine", "urban", [commonStops.babDoukkala, commonStops.gueliz, { name: "Ecole Americaine", coords: [31.6550, -8.0632] }]),
  makeLine("18", "El Baraka Mhamid", "Marche de Gros", "urban", [{ name: "El Baraka Mhamid", coords: [31.5794, -8.0205] }, commonStops.airport, commonStops.jamaaElFna, commonStops.marcheGros]),
  makeLine("19", "Aeroport Marrakech Menara", "Centre-ville", "airport", [commonStops.airport, commonStops.koutoubia, commonStops.jamaaElFna, commonStops.gueliz], { frequency: "20 min", duration: "25 min", color: "#0284C7" }),
  makeLine("20", "Bab Ghmat", "Maatallah Mhamid", "urban", [commonStops.babGhmat, commonStops.jamaaElFna, commonStops.airport, { name: "Maatallah Mhamid", coords: [31.5827, -8.0436] }]),
  makeLine("21", "Mhamid", "Hay Hassani", "urban", [commonStops.mhamid, commonStops.airport, { name: "Hay Hassani", coords: [31.6126, -8.0737] }]),
  makeLine("22", "Bab Doukkala", "Loudaya / Sidi Zouine", "interurban", [commonStops.babDoukkala, commonStops.tamensourt, { name: "Loudaya", coords: [31.7852, -8.2350] }, { name: "Sidi Zouine", coords: [31.7930, -8.3330] }]),
  makeLine("23", "Bab Doukkala", "Souihla", "interurban", [commonStops.babDoukkala, commonStops.tamensourt, { name: "Souihla", coords: [31.7310, -8.2107] }]),
  makeLine("24", "Sidi Mimoun", "Tamesloht", "interurban", [commonStops.sidiMimoun, commonStops.airport, { name: "Tamesloht", coords: [31.4974, -8.1008] }]),
  makeLine("25", "Sidi Mimoun", "Ourika", "interurban", [commonStops.sidiMimoun, commonStops.babGhmat, { name: "Aghmat", coords: [31.4240, -7.8013] }, { name: "Ourika", coords: [31.3816, -7.7832] }]),
  makeLine("26", "Bab Doukkala", "Ouidane", "interurban", [commonStops.babDoukkala, commonStops.marcheGros, { name: "Ouidane", coords: [31.6829, -7.8456] }]),
  makeLine("27", "Bab Doukkala", "Douar Jamaa", "interurban", [commonStops.babDoukkala, commonStops.marcheGros, { name: "Douar Jamaa", coords: [31.7109, -7.8280] }]),
  makeLine("28", "Bab Doukkala", "Tamellalt", "interurban", [commonStops.babDoukkala, commonStops.marcheGros, { name: "Tamellalt", coords: [31.8118, -7.5140] }]),
  makeLine("29", "Bab Ghmat", "Ait Ourir", "interurban", [commonStops.babGhmat, { name: "Route de Fes", coords: [31.6360, -7.8900] }, commonStops.aitOurir]),
  makeLine("30", "Hay Zitoun", "Hopital Militaire Ibn Sina", "urban", [{ name: "Hay Zitoun", coords: [31.6508, -8.0732] }, commonStops.gueliz, { name: "Hopital Militaire Ibn Sina", coords: [31.6484, -8.0152] }]),
  makeLine("32", "Bab Doukkala", "Dar Tounsi", "urban", [commonStops.babDoukkala, commonStops.marcheGros, { name: "Dar Tounsi", coords: [31.6760, -7.9402] }]),
  makeLine("33", "Sidi Mimoun", "Sebt Dar Jdida Ait Imour", "interurban", [commonStops.sidiMimoun, commonStops.airport, { name: "Ait Imour", coords: [31.5620, -8.2150] }, { name: "Sebt Dar Jdida", coords: [31.5350, -8.2760] }]),
  makeLine("35", "Sidi Mimoun", "Tahanaout", "interurban", [commonStops.sidiMimoun, commonStops.airport, commonStops.tahennaout]),
  makeLine("36", "Bab Doukkala", "Bel Aagid", "interurban", [commonStops.babDoukkala, commonStops.marcheGros, { name: "Bel Aagid", coords: [31.7533, -7.9280] }]),
  makeLine("37", "Bab Doukkala", "Sidi Bou Othmane", "interurban", [commonStops.babDoukkala, commonStops.tamensourt, { name: "Sidi Bou Othmane", coords: [31.9024, -7.9414] }]),
  makeLine("38", "Bab Doukkala", "Benguerir", "interurban", [commonStops.babDoukkala, commonStops.tamensourt, commonStops.benguerir]),
  makeLine("39", "Bab Ghmat", "Tamazouzt", "interurban", [commonStops.babGhmat, commonStops.aitOurir, { name: "Tamazouzt", coords: [31.4562, -7.7070] }]),
  makeLine("40", "Tahanaout", "Ait Ourir", "interurban", [commonStops.tahennaout, { name: "Sidi Abdellah Ghiat", coords: [31.4560, -7.8505] }, commonStops.aitOurir]),
  makeLine("41", "Amizmiz", "Tahanaout", "interurban", [commonStops.amizmiz, { name: "Asni", coords: [31.2497, -7.9852] }, commonStops.tahennaout]),
  makeLine("43", "Bab Doukkala", "Chichaoua", "interurban", [commonStops.babDoukkala, commonStops.tamensourt, commonStops.chichaoua]),
  makeLine("44", "Bab Doukkala", "Ouled Dlim Centre", "interurban", [commonStops.babDoukkala, commonStops.tamensourt, { name: "Ouled Dlim Centre", coords: [31.8080, -8.1740] }]),
  makeLine("45", "Sidi Mimoun", "Amizmiz", "interurban", [commonStops.sidiMimoun, commonStops.airport, commonStops.amizmiz]),
  makeLine("66", "Jamaa El Fna", "Socoma", "urban", [commonStops.jamaaElFna, commonStops.babGhmat, commonStops.socoma]),
  makeLine("241", "Sidi Mimoun", "Ouled Yahya", "interurban", [commonStops.sidiMimoun, { name: "Tamesloht", coords: [31.4974, -8.1008] }, { name: "Ouled Yahya", coords: [31.4270, -8.1430] }]),
  makeLine("251", "Sidi Mimoun", "Aghmat", "interurban", [commonStops.sidiMimoun, commonStops.babGhmat, { name: "Aghmat", coords: [31.4240, -7.8013] }]),
  makeLine("261", "Bab Doukkala", "Sidi Rahal", "interurban", [commonStops.babDoukkala, commonStops.marcheGros, { name: "Sidi Rahal", coords: [31.6500, -7.4700] }]),
  makeLine("262", "Bab Doukkala", "Zaouiat Ben Sassi", "interurban", [commonStops.babDoukkala, commonStops.marcheGros, { name: "Zaouiat Ben Sassi", coords: [31.7080, -7.6210] }]),
  makeLine("332", "Marche Saada", "Loudaya", "interurban", [{ name: "Marche Saada", coords: [31.6640, -8.0149] }, commonStops.tamensourt, { name: "Loudaya", coords: [31.7852, -8.2350] }]),
  makeLine("441A", "Bab Doukkala", "Tamensourt Jouamaaia", "interurban", [commonStops.babDoukkala, commonStops.tamensourt, { name: "Tamensourt Jouamaaia", coords: [31.7245, -8.1246] }]),
  makeLine("441B", "Bab Doukkala", "Tamensourt Saada", "interurban", [commonStops.babDoukkala, commonStops.tamensourt, { name: "Tamensourt Saada", coords: [31.7106, -8.0988] }]),
  makeLine("BRT1", "Bab Doukkala", "Marjane Route Essaouira", "brt", [commonStops.babDoukkala, commonStops.gueliz, { name: "Bd Allal Al Fassi / N9", coords: [31.6217, -8.0337] }, { name: "Marjane Route Essaouira", coords: [31.6233, -8.0415] }], { name: "BRT 1", frequency: "8-10 min", duration: "28 min", color: "#4F46E5" })
];
