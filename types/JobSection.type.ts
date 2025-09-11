export interface JobSection {
  id: number;
  name: string;
  totalMaterialPrice: number;
  totalFeePrice: number;
  documentId: number;
  itemJobSections: MaterialItem[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MaterialItem {
  id: number;
  name: string;
  volume: number;
  minimumVolume: number;
  materialPricePerUnit: number;
  feePricePerUnit: number;
  totalMaterialPrice: number;
  totalFeePrice: number;
  unit: string;
  information: string;
  jobSectionId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
