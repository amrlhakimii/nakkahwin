export type VendorCategory = 'photographer' | 'makeup' | 'pelamin' | 'catering' | 'emcee';

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  contact: string;
  price: number;
  notes: string;
}
