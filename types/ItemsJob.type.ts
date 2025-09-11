export interface Category {
  id: number;
  name: string;
  slug: string;
  code: string;
  reference: string;
  location: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  deletedAt: string | null;
}

export interface Sector {
  id: number;
  no: string;
  name: string;
  source: string;
  categoryId: number;
  categoryCode: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  deletedAt: string | null;
  category: Category;
}

export interface Item {
  id: number;
  no: string;
  name: string;
  source: string;
  minimum: number;
  unit: string;
  materialPricePerUnit: number;
  feePricePerUnit: number;
  singleItem: boolean;
  categoryCode: string;
  sectorNo: string;
  sectorId: number;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  deletedAt: string | null;
  sector: Sector;
}
