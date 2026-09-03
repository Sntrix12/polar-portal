import { Station } from "@/lib/types";

export const stations: Station[] = [
  {
    id: "dakshin-gangotri",
    name: "Dakshin Gangotri",
    region: "Antarctica",
    location: "Princess Astrid Coast, Queen Maud Land",
    lat: -70.75,
    lng: 11.73,
    established: 1983,
    decommissioned: 1990,
    status: "decommissioned",
    description:
      "India's first Antarctic station, built during the 2nd and 3rd Indian Scientific Expeditions. It served as the nation's foothold on the continent until rising snow accumulation buried its structures.",
    notes:
      "Fitted with an ice-melting plant, laboratories, storage, accommodation and a clinic. Named after the Dakshin Gangotri glacier. Abandoned operationally in 1988-89 and officially decommissioned in 1990; it remains a supply base and heritage site.",
    image: "/images/dakshin-gangotri-station.jpg",
    gallery: [
      "/images/dakshin-gangotri-station.jpg",
      "/images/dakshin-gangotri-construction.jpg",
    ],
    linkedExpeditionIds: ["isea-1", "isea-2", "isea-3"],
    linkedPublicationIds: [],
  },
  {
    id: "maitri",
    name: "Maitri",
    region: "Antarctica",
    location: "Schirmacher Oasis, Queen Maud Land",
    lat: -70.766,
    lng: 11.734,
    established: 1989,
    status: "active",
    description:
      "India's longest-serving active Antarctic station, built on rocky ground beside the freshwater Lake Priyadarshini. Maitri anchors decades of geology, glaciology and atmospheric research.",
    notes:
      "Supports year-round habitation and a wide range of scientific disciplines including geomorphology, medicine and upper-atmosphere studies.",
    image: "/images/maitri-station.jpg",
    gallery: ["/images/maitri-station.jpg"],
    linkedExpeditionIds: ["isea-7", "isea-20", "isea-42"],
    linkedPublicationIds: ["pub-1", "pub-2", "pub-11"],
  },
  {
    id: "bharati",
    name: "Bharati",
    region: "Antarctica",
    location: "Larsemann Hills, East Antarctica",
    lat: -69.4,
    lng: 76.19,
    established: 2012,
    status: "active",
    description:
      "India's newest and most advanced Antarctic station, engineered from 134 recycled shipping containers on an ice-free rock oasis. Bharati is the base for oceanographic and Gondwana geology research.",
    notes:
      "Commissioned 18 March 2012. Roughly 2,500 sq. m of built area, designed to withstand extreme polar conditions with minimal environmental footprint.",
    image: "/images/bharati-station.jpg",
    gallery: ["/images/bharati-station.jpg"],
    linkedExpeditionIds: ["isea-42", "isea-44", "isea-45"],
    linkedPublicationIds: ["pub-7", "pub-13"],
  },
  {
    id: "himadri",
    name: "Himadri",
    region: "Arctic",
    location: "Ny-Ålesund, Svalbard, Norway",
    lat: 78.923,
    lng: 11.921,
    established: 2008,
    status: "active",
    description:
      "India's first Arctic research station, inaugurated on 1 July 2008 in the world's northernmost year-round research settlement, about 1,200 km from the North Pole.",
    notes:
      "Supports atmospheric, glaciological, biological and space-weather research. Complemented by IndARC, India's first Arctic underwater observatory, deployed in Kongsfjorden in 2014.",
    image: "/images/himadri-nyalesund.jpg",
    gallery: ["/images/himadri-nyalesund.jpg", "/images/aurora-polar-sky.jpg"],
    linkedExpeditionIds: [],
    linkedPublicationIds: ["pub-3", "pub-12"],
  },
];
