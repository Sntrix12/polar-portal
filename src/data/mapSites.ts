/**
 * Locations plotted on the Expedition Atlas.
 *
 * ACCURACY: every entry carries `verified`.
 *   verified: true  — the place and India's involvement are documented in public
 *                     sources (NCPOR, PIB, Wikipedia/SCAR gazetteer).
 *   verified: false — the site type is real but the exact point is indicative,
 *                     or India's presence there is not something I could confirm.
 *                     These render an "Illustrative" tag in the panel.
 */

export type SiteCategory = "station" | "field" | "ocean" | "route";

export interface MapSite {
  id: string;
  name: string;
  category: SiteCategory;
  region: "Antarctica" | "Arctic" | "Southern Ocean" | "Indian Ocean" | "Transit";
  lat: number;
  lng: number;
  established?: number;
  decommissioned?: number;
  status?: "active" | "decommissioned" | "seasonal" | "operational";
  capacity?: string;
  research: string[];
  description: string;
  image: string;
  verified: boolean;
}

export const CATEGORY_META: Record<
  SiteCategory,
  { label: string; color: string; ring: string; dot: string }
> = {
  station: { label: "Research stations", color: "#F59E0B", ring: "ring-accent", dot: "bg-accent" },
  field: { label: "Field camps & sites", color: "#0EA5E9", ring: "ring-primary", dot: "bg-primary" },
  ocean: { label: "Ocean & moorings", color: "#14B8A6", ring: "ring-teal-500", dot: "bg-teal-500" },
  route: { label: "Route waypoints", color: "#94A3B8", ring: "ring-slate-400", dot: "bg-slate-400" },
};

export const MAP_SITES: MapSite[] = [
  /* ---------------- RESEARCH STATIONS ---------------- */
  {
    id: "maitri",
    name: "Maitri",
    category: "station",
    region: "Antarctica",
    lat: -70.7659,
    lng: 11.7358,
    established: 1989,
    status: "active",
    capacity: "~25 in winter, up to 65 in summer",
    research: ["Glaciology", "Atmospheric sciences", "Geology", "Medicine", "Magnetic observation"],
    description:
      "India's longest-serving Antarctic station, built on bare rock in the Schirmacher Oasis beside the freshwater Lake Priyadarshini. Staffed right through the polar winter.",
    image: "/images/maitri-station.jpg",
    verified: true,
  },
  {
    id: "bharati",
    name: "Bharati",
    category: "station",
    region: "Antarctica",
    lat: -69.4067,
    lng: 76.1953,
    established: 2012,
    status: "active",
    capacity: "~25 in winter, up to 47 in summer",
    research: ["Oceanography", "Geology", "Remote sensing", "Marine biology", "Gondwana studies"],
    description:
      "India's newest Antarctic station, assembled in the Larsemann Hills from 134 shipping containers and commissioned on 18 March 2012.",
    image: "/images/bharati-station.jpg",
    verified: true,
  },
  {
    id: "himadri",
    name: "Himadri",
    category: "station",
    region: "Arctic",
    lat: 78.9167,
    lng: 11.9333,
    established: 2008,
    status: "seasonal",
    capacity: "~8 researchers at a time",
    research: ["Atmospheric sciences", "Glaciology", "Fjord biology", "Space weather", "Aerosols"],
    description:
      "India's Arctic station at Ny-Ålesund, Svalbard, roughly 1,200 km from the North Pole. Opened 1 July 2008 and used mainly through the Arctic summer.",
    image: "/images/himadri-nyalesund.jpg",
    verified: true,
  },
  {
    id: "dakshin-gangotri",
    name: "Dakshin Gangotri",
    category: "station",
    region: "Antarctica",
    lat: -70.0742,
    lng: 12.0034,
    established: 1984,
    decommissioned: 1990,
    status: "decommissioned",
    capacity: "Formerly ~12 wintering members",
    research: ["Historic site", "Supply depot", "Transit camp"],
    description:
      "India's first Antarctic base, commissioned 26 January 1984. Snow accumulation gradually buried it; it was abandoned on 25 February 1990 and now serves as a supply and transit point.",
    image: "/images/dakshin-gangotri-station.jpg",
    verified: true,
  },

  /* ---------------- FIELD CAMPS & OPERATIONAL SITES ---------------- */
  {
    id: "schirmacher",
    name: "Schirmacher Oasis",
    category: "field",
    region: "Antarctica",
    lat: -70.75,
    lng: 11.6667,
    research: ["Geomorphology", "Lake ecology", "Periglacial processes"],
    description:
      "An ice-free rock oasis about 35 km long in Queen Maud Land, holding more than 100 freshwater lakes. Maitri stands here.",
    image: "/images/maitri-station.jpg",
    verified: true,
  },
  {
    id: "larsemann",
    name: "Larsemann Hills",
    category: "field",
    region: "Antarctica",
    lat: -69.3833,
    lng: 76.3833,
    research: ["Gondwana geology", "Lake sediments", "Palaeoclimate"],
    description:
      "An ice-free coastal oasis on Prydz Bay, one of only a few in East Antarctica. Bharati station sits on its Grovnes peninsula.",
    image: "/images/bharati-station.jpg",
    verified: true,
  },
  {
    id: "amery",
    name: "Amery Ice Shelf",
    category: "field",
    region: "Antarctica",
    lat: -69.5,
    lng: 71.5,
    research: ["Ice shelf dynamics", "Geological exploration", "Ice–ocean interaction"],
    description:
      "The largest ice shelf in East Antarctica. NCPOR runs a dedicated programme here — Geological Exploration of the Amery Ice Shelf (GeoEAIS), begun during the 41st expedition.",
    image: "/images/glacier-iceberg.jpg",
    verified: true,
  },
  {
    id: "prydz-bay",
    name: "Prydz Bay",
    category: "field",
    region: "Antarctica",
    lat: -68.5,
    lng: 75.0,
    research: ["Coastal oceanography", "Sea ice", "Sediment coring"],
    description:
      "The large embayment fed by the Amery Ice Shelf. Bharati sits on its shore, and it is the main approach for ships supplying the station.",
    image: "/images/iceberg-satellite.jpg",
    verified: true,
  },
  {
    id: "wohlthat",
    name: "Wohlthat Mountains (Gruber)",
    category: "field",
    region: "Antarctica",
    lat: -71.75,
    lng: 12.0,
    established: 1985,
    status: "seasonal",
    research: ["Glacial geomorphology", "Moraine mapping", "Rock weathering"],
    description:
      "A mountain chain inland of Schirmacher. The 5th Indian expedition (1985–86) ran a three-month summer camp here and mapped its moraines and wind scoops; later expeditions returned.",
    image: "/images/antarctic-mountains.png",
    verified: true,
  },
  {
    id: "ny-alesund",
    name: "Ny-Ålesund",
    category: "field",
    region: "Arctic",
    lat: 78.9236,
    lng: 11.9231,
    research: ["Atmospheric monitoring", "Glaciology", "Arctic ecology"],
    description:
      "The world's northernmost year-round research settlement, shared by around ten nations. India's Himadri station is one of its buildings.",
    image: "/images/himadri-nyalesund.jpg",
    verified: true,
  },
  {
    id: "kongsfjorden",
    name: "Kongsfjorden",
    category: "field",
    region: "Arctic",
    lat: 78.9667,
    lng: 12.0,
    research: ["Fjord biology", "Glacier–ocean interaction", "Sediment studies"],
    description:
      "The Arctic fjord beside Ny-Ålesund, fed by tidewater glaciers. A natural laboratory for how a warming ocean meets glacier ice.",
    image: "/images/iceberg-satellite.jpg",
    verified: true,
  },
  {
    id: "grove-mountains",
    name: "Grove Mountains",
    category: "field",
    region: "Antarctica",
    lat: -72.75,
    lng: 75.0,
    research: ["Inland geology", "Meteorite search"],
    description:
      "An inland nunatak range in the Prydz Bay hinterland. Shown here as a representative deep-field target — I could not confirm an Indian field camp at this specific site.",
    image: "/images/antarctic-mountains.png",
    verified: false,
  },
  {
    id: "gruvebadet",
    name: "Gruvebadet Laboratory",
    category: "field",
    region: "Arctic",
    lat: 78.9181,
    lng: 11.8952,
    research: ["Aerosols", "Black carbon", "Air chemistry"],
    description:
      "An atmospheric laboratory on the edge of Ny-Ålesund. Position is approximate and the extent of Indian use is not something I could verify.",
    image: "/images/aurora-polar-sky.jpg",
    verified: false,
  },

  /* ---------------- OCEAN & MOORING SITES ---------------- */
  {
    id: "indarc",
    name: "IndARC mooring",
    category: "ocean",
    region: "Arctic",
    lat: 78.9633,
    lng: 11.9,
    established: 2014,
    status: "operational",
    research: ["Temperature & salinity", "Currents", "Year-round observation"],
    description:
      "India's first Arctic underwater observatory, moored in Kongsfjorden in 2014. It records the fjord all winter, when ships cannot reach it. Exact mooring position is indicative.",
    image: "/images/iceberg-satellite.jpg",
    verified: false,
  },
  {
    id: "so-transect-45",
    name: "Southern Ocean transect — 45°S",
    category: "ocean",
    region: "Southern Ocean",
    lat: -45.0,
    lng: 57.0,
    research: ["Hydrography", "Plankton sampling", "Carbon uptake"],
    description:
      "A representative station on the Indian sector survey lines worked by ORV Sagar Kanya. Indicative position along a real survey corridor.",
    image: "/images/sagar-kanya-vessel.jpg",
    verified: false,
  },
  {
    id: "so-transect-50",
    name: "Southern Ocean transect — 50°S",
    category: "ocean",
    region: "Southern Ocean",
    lat: -50.0,
    lng: 57.0,
    research: ["Frontal systems", "Sea surface temperature", "Nutrients"],
    description:
      "Sampling point near the Subantarctic Front, where cold and warm water masses meet. Indicative position.",
    image: "/images/sagar-kanya-vessel.jpg",
    verified: false,
  },
  {
    id: "so-transect-55",
    name: "Southern Ocean transect — 55°S",
    category: "ocean",
    region: "Southern Ocean",
    lat: -55.0,
    lng: 57.0,
    research: ["Polar Front", "Krill surveys", "Sediment cores"],
    description:
      "A station close to the Antarctic Polar Front, a key boundary for Southern Ocean productivity. Indicative position.",
    image: "/images/glacier-iceberg.jpg",
    verified: false,
  },
  {
    id: "acc-crossing",
    name: "Antarctic Circumpolar Current crossing",
    category: "ocean",
    region: "Southern Ocean",
    lat: -55.0,
    lng: 45.0,
    research: ["Current transport", "Heat flux", "Monsoon teleconnection"],
    description:
      "Where survey lines cut the strongest current on Earth. Studying its heat transport is part of linking Southern Ocean change to the Indian monsoon. Indicative position.",
    image: "/images/antarctic-landscape-1.jpg",
    verified: false,
  },
  {
    id: "io-sector-30",
    name: "Indian Ocean sector observation point",
    category: "ocean",
    region: "Indian Ocean",
    lat: -30.0,
    lng: 57.0,
    research: ["Ocean–atmosphere exchange", "Aerosol deposition"],
    description:
      "A northern observation point on the route south, linking Southern Ocean work to the Indian Ocean basin. Indicative position.",
    image: "/images/sagar-kanya-vessel.jpg",
    verified: false,
  },
  {
    id: "weddell-gyre-edge",
    name: "Southern Ocean sediment coring site",
    category: "ocean",
    region: "Southern Ocean",
    lat: -58.0,
    lng: 30.0,
    research: ["Palaeoceanography", "Diatom records", "Ice-rafted debris"],
    description:
      "Deep-water coring recovers records of past sea ice and productivity. Indicative position within the survey region.",
    image: "/images/iceberg-satellite.jpg",
    verified: false,
  },

  /* ---------------- EXPEDITION ROUTE WAYPOINTS ---------------- */
  {
    id: "ncpor-hq",
    name: "NCPOR Headquarters, Goa",
    category: "route",
    region: "Transit",
    lat: 15.3966,
    lng: 73.793,
    established: 1998,
    research: ["Expedition planning", "Ice core lab", "Data archive"],
    description:
      "The National Centre for Polar and Ocean Research at Headland Sada, Vasco da Gama. Every Indian polar expedition is planned and equipped from here.",
    image: "/images/first-expedition-stamp-1983.jpg",
    verified: true,
  },
  {
    id: "mormugao",
    name: "Mormugao Port, Goa",
    category: "route",
    region: "Transit",
    lat: 15.4009,
    lng: 73.8014,
    research: ["Cargo loading", "Vessel departure"],
    description:
      "The Goan port where expedition cargo is loaded — containers, living modules, heavy machinery and vessel fuel. The 43rd expedition loaded here in November 2023.",
    image: "/images/sagar-kanya-vessel.jpg",
    verified: true,
  },
  {
    id: "cape-town",
    name: "Cape Town staging port",
    category: "route",
    region: "Transit",
    lat: -33.9249,
    lng: 18.4241,
    research: ["Final staging", "Fuel & fresh supplies"],
    description:
      "The last port before the ice. Station fuel, fresh supplies and helicopters are loaded here; the 43rd expedition sailed south from Cape Town on 23 December 2023.",
    image: "/images/second-expedition-team.jpg",
    verified: true,
  },
  {
    id: "roaring-forties",
    name: "Roaring Forties crossing",
    category: "route",
    region: "Transit",
    lat: -40.0,
    lng: 25.0,
    research: ["Passage waypoint"],
    description:
      "The belt of persistent westerly gales between 40°S and 50°S that every southbound voyage must cross. Indicative waypoint on the route.",
    image: "/images/antarctic-landscape-1.jpg",
    verified: false,
  },
  {
    id: "antarctic-circle",
    name: "Antarctic Circle crossing",
    category: "route",
    region: "Transit",
    lat: -66.5633,
    lng: 15.0,
    research: ["Passage waypoint"],
    description:
      "Latitude 66°33′S, where the midnight sun begins. The circle is real; this crossing point is an indicative position on the approach to Queen Maud Land.",
    image: "/images/antarctic-landscape-2.jpg",
    verified: false,
  },
  {
    id: "ice-edge-offload",
    name: "Ice-edge offloading point",
    category: "route",
    region: "Antarctica",
    lat: -70.2,
    lng: 11.0,
    research: ["Cargo transfer", "Helicopter operations"],
    description:
      "Ships stop at the fast-ice edge and cargo is moved inland by helicopter and sledge. The practice is real; this specific point is indicative and shifts every season with the ice.",
    image: "/images/dakshin-gangotri-construction.jpg",
    verified: false,
  },
  {
    id: "novo-runway",
    name: "Novolazarevskaya air link",
    category: "route",
    region: "Antarctica",
    lat: -70.8167,
    lng: 11.8333,
    research: ["Air gateway", "Personnel rotation"],
    description:
      "The Russian station and blue-ice runway near Schirmacher that serves as the regional air gateway for Queen Maud Land under the DROMLAN cooperation.",
    image: "/images/antarctic-landscape-1.jpg",
    verified: true,
  },
];

export const SITE_COUNT = MAP_SITES.length;
