import type { UserSession } from "./Session.type";

export type DocumentStatus =
  | "IN_PROGRESS"
  | "NEED_CHECKED"
  | "NEED_CONFIRMED"
  | "APPROVED";

export interface ItemJobSection {
  id: number;
  name: string;
  volume: number;
  minimumVolume: number;
  materialPricePerUnit: number;
  feePricePerUnit: number;
  totalMaterialPrice: number;
  totalFeePrice: number;
  unit: string;
  information: string | null;
  jobSectionId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface JobSection {
  id: number;
  name: string;
  totalMaterialPrice: number;
  totalFeePrice: number;
  documentId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  itemJobSections: ItemJobSection[];
}

export interface Document {
  id: number;
  name: string;
  slug: string;
  status: DocumentStatus;
  job: string;
  location: string;
  base: string;
  totalMaterialPrice: number;
  totalFeePrice: number;
  totalPrice: number;
  totalBenefitsAndRisks: number;
  totalMaterialAndFee: number;
  percentageBenefitsAndRisks: number;
  recapitulationLocation: string;
  preparedByName: string;
  preparedByPosition: string;
  checkedByName: string;
  checkedByPosition: string;
  confirmedByName: string;
  confirmedByPosition: string;
  preparedById?: number;
  checkedById?: number;
  confirmedById?: number;
  createdById?: number;
  createdBy?: UserSession | null;
  checkedBy?: UserSession | null;
  confirmedBy?: UserSession | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  jobSections: JobSection[];
}
