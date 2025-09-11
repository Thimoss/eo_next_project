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
  job: string;
  location: string;
  base: string;
  totalMaterialPrice: number;
  totalFeePrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  jobSections: JobSection[];
}
