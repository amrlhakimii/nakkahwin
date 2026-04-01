import { useLocalStorage } from './useLocalStorage';
import type { Vendor } from '../types/vendor';

export function useVendors() {
  const [vendors, setVendors] = useLocalStorage<Vendor[]>('nakkahwin_vendors', []);

  const addVendor = (vendor: Omit<Vendor, 'id'>) => {
    const newVendor: Vendor = { ...vendor, id: Date.now().toString() };
    setVendors(prev => [...prev, newVendor]);
  };

  const updateVendor = (id: string, updates: Partial<Vendor>) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const deleteVendor = (id: string) => {
    setVendors(prev => prev.filter(v => v.id !== id));
  };

  return { vendors, addVendor, updateVendor, deleteVendor };
}
