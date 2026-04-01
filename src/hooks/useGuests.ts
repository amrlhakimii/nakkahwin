import { useLocalStorage } from './useLocalStorage';
import type { Guest } from '../types/guest';

export function useGuests() {
  const [guests, setGuests] = useLocalStorage<Guest[]>('nakkahwin_guests', []);

  const addGuest = (guest: Omit<Guest, 'id'>) => {
    const newGuest: Guest = { ...guest, id: Date.now().toString() };
    setGuests(prev => [...prev, newGuest]);
  };

  const updateGuest = (id: string, updates: Partial<Guest>) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const deleteGuest = (id: string) => {
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  const totalPax = guests.reduce((sum, g) => sum + g.pax, 0);
  const confirmedPax = guests.filter(g => g.rsvpStatus === 'confirmed').reduce((sum, g) => sum + g.pax, 0);

  return { guests, addGuest, updateGuest, deleteGuest, totalPax, confirmedPax };
}
