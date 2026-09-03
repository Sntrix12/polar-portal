export type StationStatus = "active" | "decommissioned";

export interface Station {
  id: string;
  name: string;
  region: "Antarctica" | "Arctic";
  location: string;
  lat: number;
  lng: number;
  established: number;
  decommissioned?: number;
  status: StationStatus;
  description: string;
  notes: string;
  image: string;
  gallery: string[];
  linkedExpeditionIds: string[];
  linkedPublicationIds: string[];
}

export interface Expedition {
  id: string;
  number: number;
  label: string;
  yearsLabel: string;
  startYear: number;
  endYear: number;
  leader: string;
  focusArea: string;
  achievement: string;
  image: string;
  stationIds: string[];
}

export type ResearchArea =
  | "Glaciology"
  | "Atmospheric Science"
  | "Marine Biology"
  | "Geology"
  | "Oceanography";

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  area: ResearchArea;
  stationId: string | null;
  abstract: string;
  verified: boolean;
}

export interface LearnResource {
  id: string;
  ageGroup: "6-8" | "9-10" | "11-12";
  topic: string;
  description: string;
}
