import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import type { Guest, GuestGroup, RsvpStatus } from '../../types/guest';

interface GuestFormProps {
  initial?: Partial<Guest>;
  onSubmit: (data: Omit<Guest, 'id'>) => void;
  onCancel: () => void;
}

const groups: { value: GuestGroup; label: string }[] = [
  { value: 'bride_family', label: 'Keluarga Pengantin Perempuan' },
  { value: 'groom_family', label: 'Keluarga Pengantin Lelaki' },
  { value: 'friends', label: 'Rakan-rakan' },
  { value: 'colleagues', label: 'Rakan Sekerja' },
];

const rsvpOptions: { value: RsvpStatus; label: string }[] = [
  { value: 'pending', label: 'Belum Sahkan' },
  { value: 'confirmed', label: 'Disahkan' },
  { value: 'declined', label: 'Tidak Hadir' },
];

export function GuestForm({ initial, onSubmit, onCancel }: GuestFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [group, setGroup] = useState<GuestGroup>(initial?.group ?? 'friends');
  const [pax, setPax] = useState(initial?.pax?.toString() ?? '1');
  const [rsvpStatus, setRsvpStatus] = useState<RsvpStatus>(initial?.rsvpStatus ?? 'pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), group, pax: Number(pax) || 1, rsvpStatus });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nama Tetamu"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="cth: Ahmad bin Ali"
        autoFocus
      />
      <Select label="Kumpulan" value={group} onChange={e => setGroup(e.target.value as GuestGroup)}>
        {groups.map(g => (
          <option key={g.value} value={g.value}>{g.label}</option>
        ))}
      </Select>
      <Input
        label="Bilangan Pax"
        type="number"
        value={pax}
        onChange={e => setPax(e.target.value)}
        min="1"
      />
      <Select label="Status RSVP" value={rsvpStatus} onChange={e => setRsvpStatus(e.target.value as RsvpStatus)}>
        {rsvpOptions.map(r => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </Select>
      <div className="flex gap-2 justify-end pt-1">
        <Button type="button" variant="ghost" onClick={onCancel}>Batal</Button>
        <Button type="submit" disabled={!name.trim()}>
          {initial?.name ? 'Kemaskini' : 'Tambah Tetamu'}
        </Button>
      </div>
    </form>
  );
}
