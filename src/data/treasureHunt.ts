/**
 * Polar Treasure Hunt — archive holdings and clue rounds.
 * Reuses the site list already defined for /atlas (src/data/mapSites.ts).
 */

import { MapSite, MAP_SITES } from "./mapSites";

export interface Holdings {
  photographs: number;
  videos: number;
  reports: number;
  datasets: number;
  publications: number;
}

/** Stable pseudo-random in [0,1) from a string — same every render, no hydration drift. */
function seeded(key: string, salt: number): number {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h = Math.imul(h ^ salt, 2654435761);
  return ((h >>> 0) % 10000) / 10000;
}

/**
 * Bigger, longer-running places hold more. Deterministic per site so the numbers
 * are consistent between the free-explore popup and the hunt rounds.
 */
export function holdingsFor(site: MapSite): Holdings {
  const weight =
    site.category === "station"
      ? site.status === "decommissioned"
        ? 0.55
        : 1
      : site.category === "field"
      ? 0.5
      : site.category === "ocean"
      ? 0.38
      : 0.28;

  // Long-established sites have had more seasons to accumulate material.
  const age = site.established ? Math.min(1, (2026 - site.established) / 40) : 0.4;
  const scale = weight * (0.6 + age * 0.6);

  const pick = (salt: number, min: number, max: number) =>
    Math.max(1, Math.round((min + seeded(site.id, salt) * (max - min)) * scale));

  return {
    photographs: pick(1, 18, 120),
    videos: pick(2, 3, 28),
    reports: pick(3, 5, 40),
    datasets: pick(4, 2, 22),
    publications: pick(5, 4, 46),
  };
}

export interface HuntRound {
  id: string;
  clue: string;
  answerId: string;
  hint: string;
  reveal: string;
}

/**
 * Every clue is answerable from what the popups show — category, region,
 * established year, status or research pills — so the game rewards exploring.
 */
export const HUNT_ROUNDS: HuntRound[] = [
  {
    id: "h1",
    clue: "Find India's only research station in the Arctic.",
    answerId: "himadri",
    hint: "It is the one station in the far north — look above the Arctic Circle, in Svalbard.",
    reveal:
      "Himadri, at Ny-Ålesund in Svalbard, opened on 1 July 2008. It is India's only Arctic station — the other three are Antarctic.",
  },
  {
    id: "h2",
    clue: "Find the station that is now buried under ice and no longer operational.",
    answerId: "dakshin-gangotri",
    hint: "Its marker is drawn as a hollow dashed circle rather than a solid one.",
    reveal:
      "Dakshin Gangotri, commissioned in 1984, was built on shelf ice. Accumulating snow gradually buried it and it was abandoned in 1990.",
  },
  {
    id: "h3",
    clue: "Find the station built from 134 recycled shipping containers in the Larsemann Hills.",
    answerId: "bharati",
    hint: "It is India's newest Antarctic station, on the Prydz Bay side at about 76° East.",
    reveal:
      "Bharati was commissioned on 18 March 2012 and focuses on oceanography, geology and Gondwana research.",
  },
  {
    id: "h4",
    clue: "Find the station beside Lake Priyadarshini where magnetic observation and atmospheric research are carried out.",
    answerId: "maitri",
    hint: "It stands on bare rock in the Schirmacher Oasis and has run since 1989.",
    reveal:
      "Maitri is India's longest-serving Antarctic station, staffed year-round through the polar winter.",
  },
  {
    id: "h5",
    clue: "Find the underwater observatory that records an Arctic fjord all winter, when ships cannot reach it.",
    answerId: "indarc",
    hint: "It is an ocean-and-mooring site in Kongsfjorden, near Ny-Ålesund.",
    reveal:
      "IndARC, moored in Kongsfjorden in 2014, was India's first Arctic underwater observatory. It logs temperature, salinity and currents year-round.",
  },
  {
    id: "h6",
    clue: "Find the Antarctic ice shelf where NCPOR runs a dedicated geological exploration programme.",
    answerId: "amery",
    hint: "It is the largest ice shelf in East Antarctica, feeding into Prydz Bay.",
    reveal:
      "The Amery Ice Shelf hosts GeoEAIS — Geological Exploration of the Amery Ice Shelf — begun during the 41st Indian expedition.",
  },
  {
    id: "h7",
    clue: "Find the last port where expedition ships take on fuel and fresh supplies before sailing for the ice.",
    answerId: "cape-town",
    hint: "It is a route waypoint at the southern tip of Africa.",
    reveal:
      "Cape Town is the staging port. The 43rd expedition loaded station fuel and helicopters there and sailed south on 23 December 2023.",
  },
  {
    id: "h8",
    clue: "Find the mountain range inland of Schirmacher where the 5th Indian expedition ran a three-month summer camp.",
    answerId: "wohlthat",
    hint: "It is a field site in Queen Maud Land, south of Maitri.",
    reveal:
      "The Wohlthat Mountains (Gruber range). The 1985–86 expedition mapped its moraines and wind scoops, and later expeditions returned.",
  },
];

export const HUNT_RANKS = [
  { min: 700, title: "Polar Navigator", note: "Outstanding — you read the archive like a veteran." },
  { min: 400, title: "Station Technician", note: "Good work. A few more seasons and you'll know every site." },
  { min: 0, title: "Field Assistant", note: "A start. Explore the map freely and try the hunt again." },
];

export const ROUND_SECONDS = 30;

/** Sites that can be an answer — used to keep the hunt fair. */
export const HUNT_SITES = MAP_SITES;
