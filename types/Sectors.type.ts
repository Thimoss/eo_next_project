import { Item } from "./Items.type";

export interface Sector {
  id: number;
  no: string;
  name: string;
  source?: string;
  items: Item[];
  categoryId: number;
  categoryCode: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
