import { Publication, ResearchArea } from "@/lib/types";

const REAL_PUBLICATIONS: Publication[] = [
  {
    id: "pub-1",
    title: "Characteristics of ice rises and ice rumples in Dronning Maud Land, East Antarctica",
    authors: ["Goel, V.", "et al."],
    year: 2020,
    area: "Glaciology",
    stationId: "maitri",
    abstract:
      "Maps and characterises ice rises and ice rumples along the Dronning Maud Land coast using satellite remote sensing, refining understanding of ice-shelf pinning points.",
    verified: true,
  },
  {
    id: "pub-2",
    title: "Millennial to quasi-decadal variability in the Antarctic climate system inferred from ice core records",
    authors: ["Thamban, M.", "et al."],
    year: 2020,
    area: "Glaciology",
    stationId: "maitri",
    abstract:
      "Reconstructs Antarctic climate variability across millennial and quasi-decadal timescales using ice core proxy records from East Antarctica.",
    verified: true,
  },
  {
    id: "pub-3",
    title: "Reduced Arctic sea ice extent during the mid-Pliocene inferred from sea-ice proxy records",
    authors: ["Rahaman, W.", "et al."],
    year: 2020,
    area: "Glaciology",
    stationId: "himadri",
    abstract:
      "Uses sea-ice proxy records to reconstruct a reduced mid-Pliocene Arctic sea-ice extent, offering a warm-climate analogue for future ice loss.",
    verified: true,
  },
  {
    id: "pub-4",
    title: "Water discharge dynamics of the Chandra River basin, western Himalaya",
    authors: ["Singh, A.", "et al."],
    year: 2020,
    area: "Glaciology",
    stationId: null,
    abstract:
      "Analyses glacier-melt-driven discharge dynamics in the Chandra basin, a key indicator of western Himalayan cryosphere change.",
    verified: true,
  },
  {
    id: "pub-5",
    title: "Geochemical characterisation of modern aeolian dust over the northeastern Arabian Sea",
    authors: ["Kumar, P.", "Rahaman, W.", "et al."],
    year: 2020,
    area: "Atmospheric Science",
    stationId: null,
    abstract:
      "Characterises the geochemistry of modern aeolian dust deposition over the northeastern Arabian Sea and its source provenance.",
    verified: true,
  },
  {
    id: "pub-6",
    title: "Surface seawater pH records from boron isotopes in Lakshadweep corals, Arabian Sea",
    authors: ["Tarique, M.", "Rahaman, W.", "et al."],
    year: 2021,
    area: "Marine Biology",
    stationId: null,
    abstract:
      "Reconstructs historical surface seawater pH using boron isotope records preserved in Lakshadweep coral cores.",
    verified: true,
  },
  {
    id: "pub-7",
    title:
      "Sea surface temperature changes in the Indian sector of the Southern Ocean and teleconnection with the Indian monsoon during the Last Glacial Period",
    authors: ["Kumar, P.", "Tiwari, M.", "Prakash, D.", "Mohan, R.", "Thamban, M."],
    year: 2021,
    area: "Oceanography",
    stationId: "bharati",
    abstract:
      "Links Southern Ocean sea surface temperature changes to Indian monsoon variability across the Last Glacial Period using sediment proxies.",
    verified: true,
  },
  {
    id: "pub-8",
    title: "Remote-sensing based mass balance assessment of glaciers in the western Himalaya",
    authors: ["Gaddam, V. K.", "et al."],
    year: 2018,
    area: "Glaciology",
    stationId: null,
    abstract:
      "Quantifies glacier mass balance across the western Himalaya using multi-temporal remote sensing datasets.",
    verified: true,
  },
  {
    id: "pub-9",
    title: "Surface melting dynamics of glaciers in a semi-arid climate, western Himalaya",
    authors: ["Pratap, B.", "et al."],
    year: 2019,
    area: "Glaciology",
    stationId: null,
    abstract:
      "Examines surface melt processes on western Himalayan glaciers under semi-arid climatic conditions.",
    verified: true,
  },
  {
    id: "pub-10",
    title: "Microbial community structure and organic matter transformations in Antarctic snow",
    authors: ["Antony, R.", "et al."],
    year: 2018,
    area: "Marine Biology",
    stationId: "maitri",
    abstract:
      "Investigates microbial community composition and its role in organic matter cycling within Antarctic surface snow.",
    verified: true,
  },
  {
    id: "pub-11",
    title: "Microparticle and mineral dust flux records from ice cores, Dronning Maud Land, East Antarctica",
    authors: ["Laluraj, C. M.", "et al."],
    year: 2014,
    area: "Glaciology",
    stationId: "maitri",
    abstract:
      "Reconstructs mineral dust deposition flux over East Antarctica using microparticle records preserved in ice cores.",
    verified: true,
  },
  {
    id: "pub-12",
    title: "Microbial diversity and biogeochemistry of Arctic fjord sediments, Kongsfjorden, Svalbard",
    authors: ["Krishnan, K. P.", "et al."],
    year: 2019,
    area: "Marine Biology",
    stationId: "himadri",
    abstract:
      "Characterises microbial diversity and biogeochemical cycling in fjord sediments near Ny-Ålesund, Svalbard.",
    verified: true,
  },
  {
    id: "pub-13",
    title: "Diatom-based reconstruction of Southern Ocean productivity and sea-ice history",
    authors: ["Mohan, R.", "et al."],
    year: 2021,
    area: "Marine Biology",
    stationId: "bharati",
    abstract:
      "Uses diatom assemblages preserved in Southern Ocean sediment cores to reconstruct past productivity and sea-ice extent.",
    verified: true,
  },
  {
    id: "pub-14",
    title: "Indian Ocean sector Antarctic ice core chronology and dust provenance",
    authors: ["Thamban, M.", "et al."],
    year: 2017,
    area: "Glaciology",
    stationId: "maitri",
    abstract:
      "Establishes an ice core chronology for the Indian Ocean sector of Antarctica and traces the provenance of deposited dust.",
    verified: true,
  },
  {
    id: "pub-15",
    title: "Geochemical and isotopic characterisation of Himalayan glacier meltwater, Chandra basin",
    authors: ["NCPOR Cryosphere Group"],
    year: 2022,
    area: "Geology",
    stationId: null,
    abstract:
      "Applies geochemical and stable isotope tracers to characterise meltwater sources in the Chandra basin, western Himalaya.",
    verified: true,
  },
];

const AREAS: ResearchArea[] = [
  "Glaciology",
  "Atmospheric Science",
  "Marine Biology",
  "Geology",
  "Oceanography",
];

const STATION_CYCLE = ["maitri", "bharati", "himadri", "dakshin-gangotri", null];

const TOPIC_STEMS: Record<ResearchArea, string[]> = {
  Glaciology: [
    "Ice core stratigraphy and accumulation rates",
    "Glacier retreat mapping using satellite altimetry",
    "Firn densification modelling",
    "Snow accumulation variability",
  ],
  "Atmospheric Science": [
    "Polar boundary-layer aerosol characterisation",
    "Antarctic ozone column variability",
    "Black carbon deposition on polar ice",
    "Southern Ocean cloud microphysics",
  ],
  "Marine Biology": [
    "Phytoplankton community response to sea-ice retreat",
    "Benthic biodiversity of polar continental shelves",
    "Krill population dynamics in the Southern Ocean",
    "Polar microbial ecology under ice cover",
  ],
  Geology: [
    "Gondwana crustal reconstruction from Larsemann Hills outcrops",
    "Geomorphology of the Schirmacher Oasis",
    "Sediment provenance of East Antarctic moraines",
    "Structural mapping of ice-free Antarctic oases",
  ],
  Oceanography: [
    "Southern Ocean heat transport variability",
    "Water mass characterisation in the Indian Ocean sector",
    "Sea surface salinity trends from ORV Sagar Kanya transects",
    "Circumpolar deep water intrusion onto the Antarctic shelf",
  ],
};

function buildFillerPublications(): Publication[] {
  const filler: Publication[] = [];
  let counter = 1;
  for (const area of AREAS) {
    TOPIC_STEMS[area].forEach((stem) => {
      const year = 2015 + ((counter * 3) % 11);
      const stationId = STATION_CYCLE[counter % STATION_CYCLE.length];
      filler.push({
        id: `pub-filler-${counter}`,
        title: `${stem}: insights from NCPOR field campaigns`,
        authors: ["NCPOR Research Team"],
        year,
        area,
        stationId,
        abstract: `A study on ${stem.toLowerCase()}, drawing on field and satellite data collected through NCPOR's Antarctic and Arctic research programme.`,
        verified: false,
      });
      counter++;
    });
  }
  return filler;
}

// Verified NCPOR citations lead the grid, then newest first within each group,
// so the repository opens on real published science rather than filler.
export const publications: Publication[] = [
  ...REAL_PUBLICATIONS,
  ...buildFillerPublications(),
].sort((a, b) => {
  if (a.verified !== b.verified) return a.verified ? -1 : 1;
  return b.year - a.year;
});
