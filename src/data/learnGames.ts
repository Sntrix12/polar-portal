/**
 * Content for the three /learn games.
 *
 * ── SWAP THE VIDEOS HERE ──────────────────────────────────────────────
 * Each module below has a `videoId`. That is the part of a YouTube URL after
 * `v=` — e.g. in https://www.youtube.com/watch?v=ABCDEFGHIJK the id is
 * "ABCDEFGHIJK". Replace the placeholder ids with NCPOR's own uploads and
 * nothing else needs to change.
 * ─────────────────────────────────────────────────────────────────────
 *
 * Scientific accuracy rule applied throughout: polar bears are Arctic only,
 * penguins are Antarctic only. Himadri is Arctic (Svalbard); Maitri, Bharati
 * and Dakshin Gangotri are Antarctic.
 */

export type AgeGroup = "6-8" | "9-10" | "11-12";

/* ---------------- GAME 1 — Polar Dash ---------------- */

export type Region = "arctic" | "antarctic";

export const REGIONS: Record<
  Region,
  {
    id: Region;
    label: string;
    character: string;
    characterName: string;
    station: string;
    blurb: string;
    hazard: string;
    skyTop: string;
    skyBottom: string;
    mountain: string;
    mountainFar: string;
    ground: string;
  }
> = {
  arctic: {
    id: "arctic",
    label: "Arctic Expedition",
    character: "🐻‍❄️",
    characterName: "Polar bear",
    station: "Himadri, Svalbard",
    blurb: "Run the Arctic sea ice near India's Himadri station, 1,200 km from the North Pole.",
    hazard: "snow gusts",
    skyTop: "#CDE9FA",
    skyBottom: "#F2FAFF",
    mountain: "#BBD9EC",
    mountainFar: "#D6E9F5",
    ground: "#FFFFFF",
  },
  antarctic: {
    id: "antarctic",
    label: "Antarctic Expedition",
    character: "🐧",
    characterName: "Emperor penguin",
    station: "Maitri & Bharati",
    blurb: "Dash across the ice shelf between India's Maitri and Bharati stations.",
    hazard: "skua birds",
    skyTop: "#BFE4FA",
    skyBottom: "#EFF9FF",
    mountain: "#AECFE6",
    mountainFar: "#CFE5F2",
    ground: "#FFFFFF",
  },
};

export const POLAR_FACTS: string[] = [
  "India's first Antarctic expedition sailed from Goa on 6 December 1981 and reached the ice on 9 January 1982.",
  "Maitri station sits beside Lake Priyadarshini, a freshwater lake in the Schirmacher Oasis.",
  "Bharati station is built from 134 recycled shipping containers.",
  "Himadri, India's Arctic station, is about 1,200 km from the North Pole.",
  "Antarctic snow reflects up to 90% of the sunlight that hits it — that is why researchers wear goggles and sunscreen.",
  "The Indian Antarctic Act, 2022 bans mining and even bringing non-sterile soil to Antarctica.",
  "Dakshin Gangotri, India's first station, was slowly buried by snow and was closed in 1990.",
  "Ice cores drilled by NCPOR hold bubbles of real air from thousands of years ago.",
  "India has run more than 40 scientific expeditions to Antarctica since 1981.",
  "ORV Sagar Kanya has studied the Arabian Sea, Bay of Bengal and Indian Ocean since 1983.",
];

export const TEACHER_RESOURCES = [
  {
    id: "lesson-pack",
    title: "Polar Science Lesson Pack",
    detail: "Six ready-to-teach lessons mapped to Classes 6–12, with worksheets and answer keys.",
    meta: "PDF · 4.2 MB",
  },
  {
    id: "posters",
    title: "Station Poster Set",
    detail: "Printable A3 posters of Maitri, Bharati, Himadri and Dakshin Gangotri.",
    meta: "PDF · 12 MB",
  },
  {
    id: "data",
    title: "Classroom Data Sets",
    detail: "Simplified ice core, ozone and sea ice data for graphing exercises in class.",
    meta: "CSV · 180 KB",
  },
  {
    id: "guide",
    title: "Teacher's Guide to the Games",
    detail: "How to run each game in a 40-minute period, with discussion prompts.",
    meta: "PDF · 1.1 MB",
  },
];
