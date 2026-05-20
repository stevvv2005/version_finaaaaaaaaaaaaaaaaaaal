export const trafficIntersections = [
  {
    id: "RP-001",
    name: "Rond-point Gueliz",
    coords: [31.6370, -8.0100],
    roads: [
      {
        name: "Boulevard Mohammed V",
        level: "low",
        color: "#22C55E",
        coordinates: [
          [31.6370, -8.0100],
          [31.6366, -8.0087],
          [31.6361, -8.0075],
          [31.6356, -8.0064],
          [31.6350, -8.0050],
          [31.6343, -8.0036]
        ]
      },
      {
        name: "Avenue Hassan II",
        level: "high",
        color: "#EF4444",
        coordinates: [
          [31.6370, -8.0100],
          [31.6377, -8.0112],
          [31.6385, -8.0125],
          [31.6393, -8.0140],
          [31.6400, -8.0154],
          [31.6408, -8.0168]
        ]
      },
      {
        name: "Rue Ibn Aicha",
        level: "medium",
        color: "#F97316",
        coordinates: [
          [31.6370, -8.0100],
          [31.6361, -8.0108],
          [31.6352, -8.0117],
          [31.6344, -8.0125],
          [31.6338, -8.0133],
          [31.6332, -8.0141]
        ]
      },
      {
        name: "Avenue Yacoub El Mansour",
        level: "low",
        color: "#22C55E",
        coordinates: [
          [31.6370, -8.0100],
          [31.6379, -8.0091],
          [31.6387, -8.0080],
          [31.6395, -8.0068],
          [31.6402, -8.0056],
          [31.6410, -8.0044]
        ]
      }
    ],
    cameras: [
      {
        id: "CAM-RP001-N",
        direction: "North",
        label: "Entree Nord",
        coords: [31.6400, -8.0100],
        vehicleCount: 18,
        roadSegment: [
          [31.6420, -8.0100],
          [31.6400, -8.0100],
          [31.6370, -8.0100]
        ]
      },
      {
        id: "CAM-RP001-S",
        direction: "South",
        label: "Entree Sud",
        coords: [31.6340, -8.0100],
        vehicleCount: 45,
        roadSegment: [
          [31.6320, -8.0100],
          [31.6340, -8.0100],
          [31.6370, -8.0100]
        ]
      },
      {
        id: "CAM-RP001-E",
        direction: "East",
        label: "Entree Est",
        coords: [31.6370, -8.0060],
        vehicleCount: 31,
        roadSegment: [
          [31.6370, -8.0020],
          [31.6370, -8.0060],
          [31.6370, -8.0100]
        ]
      },
      {
        id: "CAM-RP001-W",
        direction: "West",
        label: "Entree Ouest",
        coords: [31.6370, -8.0140],
        vehicleCount: 12,
        roadSegment: [
          [31.6370, -8.0180],
          [31.6370, -8.0140],
          [31.6370, -8.0100]
        ]
      }
    ]
  },
  {
    id: "RP-002",
    name: "Rond-point Bab Doukkala",
    coords: [31.6359, -7.9986],
    roads: [
      {
        name: "Avenue El Glaoui",
        level: "high",
        color: "#EF4444",
        coordinates: [
          [31.6359, -7.9986],
          [31.6365, -7.9982],
          [31.6372, -7.9978],
          [31.6380, -7.9973],
          [31.6388, -7.9967],
          [31.6397, -7.9960]
        ]
      },
      {
        name: "Rue El Gza",
        level: "medium",
        color: "#F97316",
        coordinates: [
          [31.6359, -7.9986],
          [31.6356, -7.9995],
          [31.6352, -8.0005],
          [31.6348, -8.0015],
          [31.6342, -8.0025],
          [31.6336, -8.0035]
        ]
      },
      {
        name: "Avenue Fatima Zahra",
        level: "low",
        color: "#22C55E",
        coordinates: [
          [31.6359, -7.9986],
          [31.6351, -7.9985],
          [31.6342, -7.9983],
          [31.6333, -7.9981],
          [31.6324, -7.9979],
          [31.6315, -7.9977]
        ]
      },
      {
        name: "Rue Bab Doukkala",
        level: "high",
        color: "#EF4444",
        coordinates: [
          [31.6359, -7.9986],
          [31.6356, -7.9977],
          [31.6351, -7.9967],
          [31.6345, -7.9957],
          [31.6339, -7.9947],
          [31.6332, -7.9938]
        ]
      }
    ],
    cameras: [
      {
        id: "CAM-RP002-N",
        direction: "North",
        label: "Entree Nord",
        coords: [31.6385, -7.9986],
        vehicleCount: 22,
        roadSegment: [
          [31.6410, -7.9986],
          [31.6385, -7.9986],
          [31.6359, -7.9986]
        ]
      },
      {
        id: "CAM-RP002-S",
        direction: "South",
        label: "Entree Sud",
        coords: [31.6330, -7.9986],
        vehicleCount: 9,
        roadSegment: [
          [31.6305, -7.9986],
          [31.6330, -7.9986],
          [31.6359, -7.9986]
        ]
      },
      {
        id: "CAM-RP002-E",
        direction: "East",
        label: "Entree Est",
        coords: [31.6359, -7.9940],
        vehicleCount: 48,
        roadSegment: [
          [31.6359, -7.9900],
          [31.6359, -7.9940],
          [31.6359, -7.9986]
        ]
      },
      {
        id: "CAM-RP002-W",
        direction: "West",
        label: "Entree Ouest",
        coords: [31.6359, -8.0030],
        vehicleCount: 16,
        roadSegment: [
          [31.6359, -8.0070],
          [31.6359, -8.0030],
          [31.6359, -7.9986]
        ]
      }
    ]
  },
  {
    id: "RP-003",
    name: "Rond-point Koutoubia",
    coords: [31.6244, -7.9932],
    roads: [
      {
        name: "Avenue Mohammed V",
        level: "high",
        color: "#EF4444",
        coordinates: [
          [31.6244, -7.9932],
          [31.6250, -7.9941],
          [31.6257, -7.9951],
          [31.6264, -7.9962],
          [31.6271, -7.9974],
          [31.6278, -7.9986]
        ]
      },
      {
        name: "Avenue Houmane El Fetouaki",
        level: "medium",
        color: "#F97316",
        coordinates: [
          [31.6244, -7.9932],
          [31.6237, -7.9923],
          [31.6231, -7.9912],
          [31.6226, -7.9901],
          [31.6221, -7.9890],
          [31.6216, -7.9878]
        ]
      },
      {
        name: "Rue Riad Zitoun El Kdim",
        level: "low",
        color: "#22C55E",
        coordinates: [
          [31.6244, -7.9932],
          [31.6238, -7.9925],
          [31.6230, -7.9918],
          [31.6222, -7.9911],
          [31.6214, -7.9905],
          [31.6206, -7.9899]
        ]
      },
      {
        name: "Rue Moulay Ismail",
        level: "high",
        color: "#EF4444",
        coordinates: [
          [31.6244, -7.9932],
          [31.6251, -7.9924],
          [31.6258, -7.9916],
          [31.6265, -7.9907],
          [31.6272, -7.9898],
          [31.6278, -7.9888]
        ]
      }
    ],
    cameras: [
      {
        id: "CAM-RP003-N",
        direction: "North",
        label: "Entree Nord",
        coords: [31.6270, -7.9932],
        vehicleCount: 36,
        roadSegment: [
          [31.6290, -7.9932],
          [31.6270, -7.9932],
          [31.6244, -7.9932]
        ]
      },
      {
        id: "CAM-RP003-S",
        direction: "South",
        label: "Entree Sud",
        coords: [31.6215, -7.9932],
        vehicleCount: 14,
        roadSegment: [
          [31.6195, -7.9932],
          [31.6215, -7.9932],
          [31.6244, -7.9932]
        ]
      },
      {
        id: "CAM-RP003-E",
        direction: "East",
        label: "Entree Est",
        coords: [31.6244, -7.9890],
        vehicleCount: 44,
        roadSegment: [
          [31.6244, -7.9850],
          [31.6244, -7.9890],
          [31.6244, -7.9932]
        ]
      },
      {
        id: "CAM-RP003-W",
        direction: "West",
        label: "Entree Ouest",
        coords: [31.6244, -7.9975],
        vehicleCount: 26,
        roadSegment: [
          [31.6244, -8.0010],
          [31.6244, -7.9975],
          [31.6244, -7.9932]
        ]
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.initialTrafficIntersections = trafficIntersections;
}
