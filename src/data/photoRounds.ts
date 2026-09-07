/**
 * Polar Photo Detective — round configuration.
 *
 * ══════════════════════════════════════════════════════════════════════
 *  EDITING HOTSPOTS
 *  Each hotspot box is in PERCENTAGES of the displayed image:
 *      x  = left edge   (0 = far left,  100 = far right)
 *      y  = top edge    (0 = top,       100 = bottom)
 *      w  = width  in % of image width
 *      h  = height in % of image height
 *  So { x: 25, y: 40, w: 20, h: 30 } is a box starting a quarter across and
 *  40% down, covering a fifth of the width and a third of the height.
 *
 *  The boxes below were placed by eye against each photograph. Nudge the four
 *  numbers until they sit over the right feature — nothing else needs changing.
 *  Set `debugOutlines: true` in PhotoDetective.tsx to see the boxes while you
 *  adjust them.
 * ══════════════════════════════════════════════════════════════════════
 */

export interface Hotspot {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  info: string;
}

export interface ChoiceRound {
  kind: "choice";
  id: string;
  image: string;
  alt: string;
  question: string;
  options: string[];
  answer: number;
  science: string;
}

export interface HotspotRound {
  kind: "hotspot";
  id: string;
  image: string;
  alt: string;
  prompt: string;
  hotspots: Hotspot[];
}

export type PhotoRound = ChoiceRound | HotspotRound;

export const PHOTO_ROUNDS: PhotoRound[] = [
  /* ---------- 1. multiple choice ---------- */
  {
    kind: "choice",
    id: "p1",
    image: "/images/iceberg-satellite.jpg",
    alt: "Satellite view of a large tabular iceberg",
    question: "What are you looking at?",
    options: ["A tabular iceberg", "A frozen lake", "A snow-covered island", "An ice core"],
    answer: 0,
    science:
      "Tabular icebergs have flat tops and steep sides because they calve straight off an ice shelf rather than a mountain glacier. Some are tens of kilometres across, and satellites track them for years because they threaten shipping and alter local ocean mixing as they melt.",
  },

  /* ---------- 2. hotspot ---------- */
  {
    kind: "hotspot",
    id: "p2",
    image: "/images/glacier-iceberg.jpg",
    alt: "Icebergs in front of a glaciated coastline",
    prompt: "Find the four features a polar scientist would log in this scene.",
    hotspots: [
      {
        id: "berg",
        label: "Iceberg",
        x: 23,
        y: 40,
        w: 25,
        h: 32,
        info: "Freshwater ice that calved from land ice. Roughly nine-tenths of its mass sits below the waterline.",
      },
      {
        id: "shelf",
        label: "Glacier terminus / ice cliff",
        x: 74,
        y: 52,
        w: 25,
        h: 14,
        info: "The seaward edge of the ice sheet. Where it meets the ocean, warm water can undercut it and speed up calving.",
      },
      {
        id: "nunatak",
        label: "Nunatak (exposed rock)",
        x: 17,
        y: 6,
        w: 30,
        h: 36,
        info: "A mountain peak protruding through the ice. Nunataks give geologists rare access to bedrock on a buried continent.",
      },
      {
        id: "brash",
        label: "Brash ice on the sea",
        x: 4,
        y: 76,
        w: 58,
        h: 20,
        info: "Fragments of broken ice floating on the surface. Its extent is a quick visual indicator of how much ice is breaking up nearby.",
      },
    ],
  },

  /* ---------- 3. multiple choice ---------- */
  {
    kind: "choice",
    id: "p3",
    image: "/images/sagar-kanya-vessel.jpg",
    alt: "Oceanographic research vessel at port",
    question: "What is this vessel used for?",
    options: [
      "Oceanographic research",
      "Commercial fishing",
      "Container shipping",
      "Passenger transport",
    ],
    answer: 0,
    science:
      "ORV Sagar Kanya is a dedicated research ship, built in 1983 and operated for India's ocean programme. Vessels like this lower instrument packages through the water column to measure temperature, salinity and chemistry, and recover sediment cores from the seabed.",
  },

  /* ---------- 4. hotspot ---------- */
  {
    kind: "hotspot",
    id: "p4",
    image: "/images/maitri-station.jpg",
    alt: "Aerial view of Maitri research station",
    prompt: "This is Maitri, in the Schirmacher Oasis. Find four things in the scene.",
    hotspots: [
      {
        id: "main",
        label: "Main station building",
        x: 49,
        y: 33,
        w: 43,
        h: 40,
        info: "The elevated main block. Raising a station on stilts lets wind scour snow underneath instead of burying it — the lesson learned from Dakshin Gangotri.",
      },
      {
        id: "lake",
        label: "Meltwater lake",
        x: 57,
        y: 19,
        w: 26,
        h: 17,
        info: "One of more than a hundred freshwater lakes in the Schirmacher Oasis. They supply the station with water and are studied for microbial life.",
      },
      {
        id: "containers",
        label: "Supply modules",
        x: 16,
        y: 23,
        w: 26,
        h: 25,
        info: "Containerised stores and workshops. Everything at an Antarctic station arrives by ship and must eventually be shipped out again.",
      },
      {
        id: "bedrock",
        label: "Exposed bedrock",
        x: 20,
        y: 72,
        w: 38,
        h: 22,
        info: "Bare rock, not ice. An 'oasis' like Schirmacher is ice-free ground, which is why India built here — a station on rock does not get buried.",
      },
    ],
  },

  /* ---------- 5. multiple choice ---------- */
  {
    kind: "choice",
    id: "p5",
    image: "/images/aurora-polar-sky.jpg",
    alt: "Aurora over a polar sky",
    question: "What causes this display in the polar sky?",
    options: [
      "Sunlight refracting through ice crystals",
      "Charged particles from the Sun striking the upper atmosphere",
      "Light pollution from research stations",
      "Volcanic gases igniting",
    ],
    answer: 1,
    science:
      "Charged particles from the solar wind are funnelled by Earth's magnetic field toward the poles, where they collide with oxygen and nitrogen and make them glow. Because auroral activity tracks space weather, stations like Himadri and Maitri monitor it to study the upper atmosphere.",
  },

  /* ---------- 6. hotspot ---------- */
  {
    kind: "hotspot",
    id: "p6",
    image: "/images/antarctic-landscape-2.jpg",
    alt: "Glaciated Antarctic coastline reflected in calm water",
    prompt: "Find four features in this coastal scene.",
    hotspots: [
      {
        id: "rock",
        label: "Exposed rock ridge",
        x: 10,
        y: 50,
        w: 28,
        h: 16,
        info: "Dark rock showing through the ice. The contrast matters: rock absorbs sunlight while snow reflects it, so exposed ridges melt out faster each year.",
      },
      {
        id: "icecap",
        label: "Ice cap over the mountains",
        x: 45,
        y: 53,
        w: 37,
        h: 15,
        info: "A thick blanket of ice burying the terrain beneath. Its surface shape reveals the hidden landscape and the direction the ice is flowing.",
      },
      {
        id: "floes",
        label: "Floating ice on the water",
        x: 27,
        y: 68,
        w: 50,
        h: 9,
        info: "Loose floes and brash drifting offshore. Sea ice extent is one of the most closely watched indicators in polar science.",
      },
      {
        id: "sea",
        label: "Calm sea surface",
        x: 8,
        y: 80,
        w: 48,
        h: 17,
        info: "Glassy water indicates almost no wind — the conditions that let a thin new skin of sea ice begin to form.",
      },
    ],
  },

  /* ---------- 7. multiple choice ---------- */
  {
    kind: "choice",
    id: "p7",
    image: "/images/himadri-nyalesund.jpg",
    alt: "Research buildings at Ny-Alesund, Svalbard",
    question: "This settlement is in Svalbard. Which pole is it near?",
    options: [
      "The Arctic — you might see a polar bear here",
      "The Antarctic — you might see penguins here",
      "Neither, it is in Iceland",
      "Both are equally close",
    ],
    answer: 0,
    science:
      "Ny-Ålesund sits at about 79°N, roughly 1,200 km from the North Pole, and hosts India's Himadri station. Polar bears live here; penguins do not. The two poles share no land animals at all — penguins are exclusively Southern Hemisphere.",
  },

  /* ---------- 8. multiple choice ---------- */
  {
    kind: "choice",
    id: "p8",
    image: "/images/dakshin-gangotri-station.jpg",
    alt: "Dakshin Gangotri station on the ice",
    question: "This was India's first Antarctic station. What eventually happened to it?",
    options: [
      "It was dismantled and shipped home",
      "It was buried by accumulating snow and abandoned",
      "It was destroyed by fire",
      "It is still India's main base",
    ],
    answer: 1,
    science:
      "Dakshin Gangotri was commissioned in 1984 on shelf ice rather than rock. Snow built up over it year after year until it was abandoned in 1990 and now lies buried. Every later Indian station — Maitri, Bharati, Himadri — was deliberately built on exposed bedrock instead.",
  },
];

export const PHOTO_BADGE_TIERS = [
  { min: 900, title: "Field Observer", note: "Excellent eye — you read a polar scene like a scientist." },
  { min: 500, title: "Assistant Observer", note: "Good observation. Re-read the science cards and try again." },
  { min: 0, title: "Trainee Observer", note: "A start — the science cards are where the learning is." },
];
