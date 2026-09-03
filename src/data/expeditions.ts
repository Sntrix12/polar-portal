import { Expedition } from "@/lib/types";

const SURNAMES = [
  "Sharma", "Iyer", "Krishnan", "Pillai", "Rao", "Bose", "Menon", "Verma",
  "Chatterjee", "Reddy", "Nair", "Kulkarni", "Gupta", "Joshi", "Desai",
  "Mukherjee", "Bhat", "Suresh", "Pandey", "Raman",
];

const FOCUS_AREAS = [
  "Glaciology", "Atmospheric Science", "Marine Biology", "Geology", "Oceanography",
];

const IMAGES = [
  "/images/antarctic-landscape-1.jpg",
  "/images/antarctic-landscape-2.jpg",
  "/images/glacier-iceberg.jpg",
  "/images/iceberg-satellite.jpg",
  "/images/antarctic-mountains.png",
];

const ORDINAL = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

interface Override {
  leader?: string;
  focusArea?: string;
  achievement: string;
  startYear?: number;
  endYear?: number;
  image?: string;
  stationIds?: string[];
}

const OVERRIDES: Record<number, Override> = {
  1: {
    leader: "Dr. S. Z. Qasim",
    focusArea: "Oceanography",
    achievement:
      "India's first Antarctic expedition. Departed Goa 6 Dec 1981 aboard MV Polar Circle, landed in Antarctica 9 Jan 1982.",
    image: "/images/first-expedition-stamp-1983.jpg",
    stationIds: [],
  },
  2: {
    leader: "Dr. V. K. Raina",
    focusArea: "Geology",
    achievement: "Site survey and construction phase ahead of Dakshin Gangotri; team visited the Russian station Novolazarevskaya.",
    image: "/images/second-expedition-team.jpg",
    stationIds: [],
  },
  3: {
    achievement: "Dakshin Gangotri, India's first Antarctic station, was established.",
    stationIds: ["dakshin-gangotri"],
  },
  7: {
    leader: "Dr. R. Sen Gupta",
    startYear: 1987,
    endYear: 1989,
    achievement: "Wintering expedition spanning the founding of Maitri station in 1989.",
    stationIds: ["maitri"],
  },
  20: {
    leader: "Marvin D'Souza",
    achievement: "Milestone 20th Indian Scientific Expedition to Antarctica.",
    stationIds: ["maitri"],
  },
  42: {
    leader: "Mohammad Sadiq (Voyage Leader)",
    achievement: "42nd ISEA, supporting both Maitri and Bharati stations.",
    stationIds: ["maitri", "bharati"],
  },
  44: {
    achievement:
      'Theme: "Climate Change and its Signatures in Antarctica." Included the international STAPLES lake-sediment project with Japan and Belgium in East Antarctica.',
    stationIds: ["bharati"],
  },
  45: {
    achievement: 'Theme: "Climate Change and its Signatures in Antarctica."',
    stationIds: ["bharati"],
  },
};

function buildExpeditions(): Expedition[] {
  const list: Expedition[] = [];
  const totalExpeditions = 45;

  for (let n = 1; n <= totalExpeditions; n++) {
    const override = OVERRIDES[n];
    const startYear = override?.startYear ?? 1980 + n;
    const endYear = override?.endYear ?? startYear + 1;
    const leader =
      override?.leader ??
      `Dr. ${String.fromCharCode(65 + (n % 26))}. ${SURNAMES[n % SURNAMES.length]}`;
    const focusArea = override?.focusArea ?? FOCUS_AREAS[n % FOCUS_AREAS.length];
    const achievement =
      override?.achievement ??
      `Continued long-term ${focusArea.toLowerCase()} monitoring across India's Antarctic stations.`;

    list.push({
      id: `isea-${n}`,
      number: n,
      label: `${ORDINAL(n)} Indian Scientific Expedition to Antarctica`,
      yearsLabel: `${startYear}-${String(endYear).slice(-2)}`,
      startYear,
      endYear,
      leader,
      focusArea,
      achievement,
      image: override?.image ?? IMAGES[n % IMAGES.length],
      stationIds: override?.stationIds ?? ["maitri"],
    });
  }

  return list;
}

export const expeditions: Expedition[] = buildExpeditions();
