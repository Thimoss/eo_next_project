export interface Document {
  id: number;
  name: string;
  slug: string;
  job: string;
  location: string;
  base: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
