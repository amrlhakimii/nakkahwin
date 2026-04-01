export type GuestGroup = 'bride_family' | 'groom_family' | 'friends' | 'colleagues';
export type RsvpStatus = 'pending' | 'confirmed' | 'declined';

export interface Guest {
  id: string;
  name: string;
  group: GuestGroup;
  pax: number;
  rsvpStatus: RsvpStatus;
}
