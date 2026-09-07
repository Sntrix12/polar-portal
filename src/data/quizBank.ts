/**
 * Question pool for Polar Science Quiz Battle.
 * 32 questions; each run draws 15, so replays differ.
 *
 * Accuracy notes: polar bears are Arctic only, penguins Antarctic only.
 * Himadri is Arctic (Svalbard); Maitri, Bharati and Dakshin Gangotri are Antarctic.
 */

export type QuizTopic =
  | "Geography"
  | "Ice & palaeoclimate"
  | "Atmosphere & ozone"
  | "Sea ice & albedo"
  | "Southern Ocean"
  | "Law & governance"
  | "India's programme";

export interface QuizQuestion {
  id: string;
  topic: QuizTopic;
  difficulty: 1 | 2 | 3;
  question: string;
  options: string[];
  answer: number;
  explain: string;
}

export const QUIZ_BANK: QuizQuestion[] = [
  /* ---- Geography ---- */
  {
    id: "q01",
    topic: "Geography",
    difficulty: 1,
    question: "Which animal would you never find in Antarctica?",
    options: ["Emperor penguin", "Polar bear", "Weddell seal", "Snow petrel"],
    answer: 1,
    explain: "Polar bears are Arctic only. The two poles have never shared them — penguins live in the south, bears in the north.",
  },
  {
    id: "q02",
    topic: "Geography",
    difficulty: 2,
    question: "Antarctica is classified as which kind of environment?",
    options: ["Tundra", "Desert", "Temperate grassland", "Boreal forest"],
    answer: 1,
    explain: "It is the world's largest desert. Much of the interior receives under 50 mm of precipitation a year — drier than the Sahara.",
  },
  {
    id: "q03",
    topic: "Geography",
    difficulty: 2,
    question: "What is the fundamental geographic difference between the Arctic and Antarctic?",
    options: [
      "The Arctic is an ocean surrounded by land; Antarctica is land surrounded by ocean",
      "Both are continents",
      "Both are frozen oceans",
      "The Arctic is a continent; Antarctica is sea ice",
    ],
    answer: 0,
    explain: "That single difference drives almost everything else — Antarctica has a thick ice sheet on bedrock, while Arctic sea ice floats and can vanish entirely in summer.",
  },
  {
    id: "q04",
    topic: "Geography",
    difficulty: 3,
    question: "Roughly what share of the world's fresh water is locked in the Antarctic ice sheet?",
    options: ["About 10%", "About 30%", "About 50%", "About 70%"],
    answer: 3,
    explain: "Around 70% of Earth's fresh water sits in Antarctic ice. If it all melted, global sea level would rise by roughly 58 metres.",
  },

  /* ---- Ice & palaeoclimate ---- */
  {
    id: "q05",
    topic: "Ice & palaeoclimate",
    difficulty: 1,
    question: "What do the air bubbles trapped in an ice core contain?",
    options: ["Ancient seawater", "Actual ancient atmosphere", "Volcanic lava", "Melted snow"],
    answer: 1,
    explain: "Each bubble is a genuine sample of the air from the year that snow fell — a direct measurement of past CO₂, not an estimate.",
  },
  {
    id: "q06",
    topic: "Ice & palaeoclimate",
    difficulty: 2,
    question: "Approximately how far back does the oldest continuous Antarctic ice core record reach?",
    options: ["About 800 years", "About 12,000 years", "About 800,000 years", "About 50 million years"],
    answer: 2,
    explain: "Around 800,000 years — eight complete glacial cycles. Newer 'oldest ice' projects aim to push past a million years.",
  },
  {
    id: "q07",
    topic: "Ice & palaeoclimate",
    difficulty: 2,
    question: "A sharp dark ash band appears at the same depth in cores from several continents. What is it most useful for?",
    options: [
      "Measuring past rainfall",
      "Synchronising the timelines of different cores",
      "Estimating past salinity",
      "Detecting earthquakes",
    ],
    answer: 1,
    explain: "A large eruption spreads ash globally within months, so that layer acts as a shared timestamp linking cores worldwide.",
  },
  {
    id: "q08",
    topic: "Ice & palaeoclimate",
    difficulty: 3,
    question: "Within what range did atmospheric CO₂ cycle for the 800,000 years before the industrial era?",
    options: ["About 180–300 ppm", "About 300–400 ppm", "About 400–500 ppm", "It never changed"],
    answer: 0,
    explain: "Roughly 180 ppm in ice ages to 300 ppm in warm periods. Today's ~420 ppm sits far above that entire natural range.",
  },
  {
    id: "q09",
    topic: "Ice & palaeoclimate",
    difficulty: 3,
    question: "Why do annual layers become thinner with depth in an ice sheet?",
    options: [
      "Less snow fell in the past",
      "The weight of overlying ice compresses and stretches them",
      "Deep ice melts from below",
      "Wind erodes buried layers",
    ],
    answer: 1,
    explain: "Ice flows plastically under load, thinning older layers. It is why the deepest few metres can span tens of thousands of years.",
  },
  {
    id: "q10",
    topic: "Ice & palaeoclimate",
    difficulty: 2,
    question: "A glassy, bubble-free layer in an ice core indicates what?",
    options: [
      "A summer warm enough to melt and refreeze the surface",
      "A volcanic eruption",
      "A dust storm",
      "A drilling error",
    ],
    answer: 0,
    explain: "Melt layers form when the surface thaws and refreezes, squeezing out air. In central Antarctica they are rare, so each marks an unusually warm year.",
  },

  /* ---- Atmosphere & ozone ---- */
  {
    id: "q11",
    topic: "Atmosphere & ozone",
    difficulty: 1,
    question: "What does stratospheric ozone do for life on Earth?",
    options: [
      "Traps heat and warms the surface",
      "Absorbs most incoming ultraviolet radiation",
      "Produces the oxygen we breathe",
      "Creates the aurora",
    ],
    answer: 1,
    explain: "Ozone absorbs most UV-B. Without it that radiation would reach the surface and damage DNA in plants, animals and people.",
  },
  {
    id: "q12",
    topic: "Atmosphere & ozone",
    difficulty: 3,
    question: "Why does the ozone hole form over Antarctica specifically?",
    options: [
      "Antarctica emits the most pollution",
      "The Sun is closest to Antarctica",
      "Polar stratospheric clouds let chlorine destroy ozone rapidly when spring sunlight returns",
      "The ice sheet reflects ozone away",
    ],
    answer: 2,
    explain: "Bitterly cold winter clouds convert chlorine into reactive forms. When sunlight returns in spring, ozone destruction accelerates sharply.",
  },
  {
    id: "q13",
    topic: "Atmosphere & ozone",
    difficulty: 2,
    question: "Which international agreement phased out ozone-depleting substances?",
    options: ["The Kyoto Protocol", "The Montreal Protocol", "The Paris Agreement", "The Madrid Protocol"],
    answer: 1,
    explain: "The Montreal Protocol (1987). Ozone-depleting substances have since declined and the hole has begun a slow recovery — the clearest success story in environmental treaties.",
  },
  {
    id: "q14",
    topic: "Atmosphere & ozone",
    difficulty: 3,
    question: "Why do polar scientists measure black carbon (soot) deposited on snow?",
    options: [
      "It fertilises polar plants",
      "It darkens snow, lowering albedo and speeding melt",
      "It indicates wind speed",
      "It has no climate effect",
    ],
    answer: 1,
    explain: "Soot darkens bright snow so it absorbs more sunlight and melts faster — a feedback that matters in the Arctic and Himalaya alike.",
  },
  {
    id: "q15",
    topic: "Atmosphere & ozone",
    difficulty: 2,
    question: "Why is Antarctic air especially valuable for atmospheric monitoring?",
    options: [
      "It is the warmest air on Earth",
      "It is exceptionally clean, so small changes stand out against a low background",
      "It contains no oxygen",
      "It is closest to the ozone layer",
    ],
    answer: 1,
    explain: "With almost no local pollution sources, subtle global-scale changes in greenhouse gases and aerosols are detectable there.",
  },

  /* ---- Sea ice & albedo ---- */
  {
    id: "q16",
    topic: "Sea ice & albedo",
    difficulty: 1,
    question: "What does 'albedo' measure?",
    options: [
      "How much sunlight a surface reflects",
      "How thick ice is",
      "How salty seawater is",
      "How fast a glacier flows",
    ],
    answer: 0,
    explain: "Fresh snow reflects up to about 90% of incoming sunlight; open ocean reflects under 10%. That contrast drives the ice–albedo feedback.",
  },
  {
    id: "q17",
    topic: "Sea ice & albedo",
    difficulty: 2,
    question: "Why does melting sea ice NOT directly raise sea level?",
    options: [
      "It refreezes elsewhere",
      "It is already floating and displaces its own weight",
      "It evaporates instead",
      "It is too thin to matter",
    ],
    answer: 1,
    explain: "Floating ice already displaces its mass, so melting it adds no volume. Land ice — glaciers and ice sheets — is what raises sea level.",
  },
  {
    id: "q18",
    topic: "Sea ice & albedo",
    difficulty: 3,
    question: "What is the ice–albedo feedback?",
    options: [
      "Ice melts, exposing dark ocean, which absorbs more heat and melts more ice",
      "Ice reflects heat into space, cooling the planet indefinitely",
      "Melting ice cools the ocean, causing refreezing",
      "Ice thickens as the air warms",
    ],
    answer: 0,
    explain: "It is self-reinforcing, which is a large part of why the Arctic is warming several times faster than the global average.",
  },
  {
    id: "q19",
    topic: "Sea ice & albedo",
    difficulty: 2,
    question: "What is the difference between an iceberg and sea ice?",
    options: [
      "Icebergs break off glaciers or ice shelves; sea ice forms by freezing seawater",
      "They are the same thing",
      "Icebergs are salty; sea ice is fresh",
      "Sea ice is always thicker",
    ],
    answer: 0,
    explain: "Icebergs are compacted snowfall — freshwater ice calved from land ice. Sea ice freezes directly out of the ocean and is much thinner.",
  },

  /* ---- Southern Ocean ---- */
  {
    id: "q20",
    topic: "Southern Ocean",
    difficulty: 1,
    question: "Which species is the keystone of the Antarctic food web?",
    options: ["Antarctic krill", "Blue whale", "Emperor penguin", "Leopard seal"],
    answer: 0,
    explain: "Whales, seals, penguins, squid and seabirds all depend on krill directly or indirectly. Remove krill and the web collapses.",
  },
  {
    id: "q21",
    topic: "Southern Ocean",
    difficulty: 2,
    question: "What is ocean acidification?",
    options: [
      "Acid rain falling into the sea",
      "Dissolved CO₂ lowering seawater pH",
      "Rising salinity",
      "Warmer water holding more oxygen",
    ],
    answer: 1,
    explain: "CO₂ dissolving in seawater forms carbonic acid, reducing the carbonate that krill, corals and shellfish need to build shells.",
  },
  {
    id: "q22",
    topic: "Southern Ocean",
    difficulty: 3,
    question: "What is the Antarctic Circumpolar Current notable for?",
    options: [
      "It is the largest ocean current on Earth, connecting all major ocean basins",
      "It is the warmest current on Earth",
      "It flows from the equator to the pole",
      "It only exists in winter",
    ],
    answer: 0,
    explain: "Flowing unobstructed around Antarctica, it links the Atlantic, Pacific and Indian Oceans and helps distribute heat globally.",
  },
  {
    id: "q23",
    topic: "Southern Ocean",
    difficulty: 3,
    question: "How can Southern Ocean conditions influence rainfall over India?",
    options: [
      "There is no connection",
      "Ocean heat and sea ice shift wind belts and pressure patterns that help drive the monsoon",
      "Southern Ocean water flows into Indian rivers",
      "Antarctic storms travel intact to the Bay of Bengal",
    ],
    answer: 1,
    explain: "It is a teleconnection — changes in southern heat and ice nudge the circulation the monsoon depends on. This is a core reason India runs a polar programme.",
  },
  {
    id: "q24",
    topic: "Southern Ocean",
    difficulty: 2,
    question: "Why is the Southern Ocean described as a major carbon sink?",
    options: [
      "It absorbs a large share of the excess CO₂ and heat humans have added",
      "It produces extra ozone",
      "It reflects sunlight with its waves",
      "It stores carbon in sea ice",
    ],
    answer: 0,
    explain: "It is the single most important ocean sink for heat and carbon — a service that comes at the cost of warming and acidifying that water.",
  },

  /* ---- Law & governance ---- */
  {
    id: "q25",
    topic: "Law & governance",
    difficulty: 2,
    question: "What does the Antarctic Treaty reserve the continent for?",
    options: [
      "Peaceful purposes and scientific cooperation",
      "Mineral extraction",
      "Military training",
      "Commercial fishing",
    ],
    answer: 0,
    explain: "Signed in 1959, it sets Antarctica aside for peace and science, freezes territorial claims and bans military activity.",
  },
  {
    id: "q26",
    topic: "Law & governance",
    difficulty: 3,
    question: "What does the Madrid Protocol (1991) specifically prohibit?",
    options: [
      "All scientific drilling",
      "Mineral resource activity other than scientific research",
      "Any human presence",
      "Photography of wildlife",
    ],
    answer: 1,
    explain: "The Protocol on Environmental Protection designates Antarctica a natural reserve devoted to peace and science, and bans mining.",
  },
  {
    id: "q27",
    topic: "Law & governance",
    difficulty: 2,
    question: "Under the Madrid Protocol, what must happen to waste generated at an Antarctic station?",
    options: [
      "It may be burned on site",
      "Essentially all of it must be removed from Antarctica",
      "It may be buried in ice",
      "It may be dumped at sea",
    ],
    answer: 1,
    explain: "Waste is shipped back north. That is why expedition cargo budgets always reserve space for returning rubbish.",
  },
  {
    id: "q28",
    topic: "Law & governance",
    difficulty: 3,
    question: "What does the Indian Antarctic Act, 2022 require of Indian expeditions?",
    options: [
      "A permit for any Indian expedition, station, vessel or aircraft in Antarctica",
      "Nothing — it is purely symbolic",
      "Payment of a tourism levy",
      "Registration with the United Nations",
    ],
    answer: 0,
    explain: "Act No. 13 of 2022 gives domestic legal force to India's treaty obligations, requiring permits and banning mining and non-sterile soil.",
  },

  /* ---- India's programme ---- */
  {
    id: "q29",
    topic: "India's programme",
    difficulty: 1,
    question: "Which is India's only Arctic research station?",
    options: ["Maitri", "Bharati", "Himadri", "Dakshin Gangotri"],
    answer: 2,
    explain: "Himadri, opened on 1 July 2008 at Ny-Ålesund in Svalbard — about 1,200 km from the North Pole. The other three are Antarctic.",
  },
  {
    id: "q30",
    topic: "India's programme",
    difficulty: 2,
    question: "What happened to Dakshin Gangotri, India's first Antarctic station?",
    options: [
      "It burned down",
      "It was gradually buried by snow and decommissioned in 1990",
      "It was sold to another country",
      "It is still India's main base",
    ],
    answer: 1,
    explain: "Built on shelf ice in 1984, it was slowly entombed by accumulating snow. Every later Indian station was founded on exposed rock instead.",
  },
  {
    id: "q31",
    topic: "India's programme",
    difficulty: 2,
    question: "Bharati station was constructed largely from what?",
    options: ["Local stone", "134 recycled shipping containers", "Ice blocks", "Timber flown from India"],
    answer: 1,
    explain: "Commissioned on 18 March 2012 in the Larsemann Hills, it was assembled from prefabricated container modules.",
  },
  {
    id: "q32",
    topic: "India's programme",
    difficulty: 3,
    question: "In which year did India's first Antarctic expedition reach the continent?",
    options: ["1972", "1982", "1992", "2002"],
    answer: 1,
    explain: "The first expedition sailed from Goa on 6 December 1981 and landed on 9 January 1982, led by Dr S. Z. Qasim.",
  },
];

/** Session-only demo leaderboard — never persisted. */
export const SEED_LEADERBOARD: { name: string; score: number }[] = [
  { name: "Ananya R.", score: 14200 },
  { name: "Team Maitri", score: 12850 },
  { name: "Vikram S.", score: 11400 },
  { name: "Class 12-B", score: 9750 },
  { name: "Meera K.", score: 8300 },
  { name: "Polar Cubs", score: 6900 },
  { name: "Rohan D.", score: 5450 },
];

export const QUIZ_TIERS = [
  { min: 12000, title: "Polar Scientist", note: "Exceptional — you could hold your own at a research briefing." },
  { min: 6000, title: "Research Fellow", note: "Strong grasp of polar science and India's programme." },
  { min: 0, title: "Science Cadet", note: "A solid start. Read the explanations and run it again." },
];

export const QUESTIONS_PER_RUN = 15;
export const STARTING_LIVES = 3;
export const SECONDS_PER_QUESTION = 15;
