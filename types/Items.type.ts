export interface Item {
  id: number;
  no: string;
  name: string;
  source?: string;
  minimum?: number;
  unit?: string;
  materialPricePerUnit?: number;
  feePricePerUnit?: number;
  singleItem: boolean;
  categoryCode: string;
  sectorNo: string;
  sectorId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
