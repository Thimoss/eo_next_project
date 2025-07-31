export interface Category {
  id: number;
  name: string;
  slug: string;
  code: string;
  reference: string;
  location: string;
  //   sectors: Sector[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null; // This is optional, since deletedAt is nullable in the schema
}
