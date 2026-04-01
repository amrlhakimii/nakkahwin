import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';
import type { Vendor, VendorCategory } from '../../types/vendor';

interface VendorFormProps {
  initial?: Partial<Vendor>;
  onSubmit: (data: Omit<Vendor, 'id'>) => void;
  onCancel: () => void;
}

const categories: { value: VendorCategory; label: string }[] = [
  { value: 'photographer', label: 'Fotografi & Video' },
  { value: 'makeup', label: 'Solek (MUA)' },
  { value: 'pelamin', label: 'Pelamin' },
  { value: 'catering', label: 'Katering' },
  { value: 'emcee', label: 'Emcee / Pengacara' },
];

export function VendorForm({ initial, onSubmit, onCancel }: VendorFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [category, setCategory] = useState<VendorCategory>(initial?.category ?? 'photographer');
  const [contact, setContact] = useState(initial?.contact ?? '');
  const [price, setPrice] = useState(initial?.price?.toString() ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), category, contact, price: Number(price) || 0, notes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Nama Vendor" value={name} onChange={e => setName(e.target.value)} placeholder="cth: Studio Aman Photography" autoFocus />
      <Select label="Kategori Perkhidmatan" value={category} onChange={e => setCategory(e.target.value as VendorCategory)}>
        {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
      </Select>
      <Input label="Nombor Telefon / Emel" value={contact} onChange={e => setContact(e.target.value)} placeholder="cth: 012-3456789" />
      <Input label="Anggaran Harga (RM)" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0" min="0" />
      <Textarea label="Nota" value={notes} onChange={e => setNotes(e.target.value)} placeholder="cth: Pakej termasuk 2 hari shooting..." rows={3} />
      <div className="flex gap-2 justify-end pt-1">
        <Button type="button" variant="ghost" onClick={onCancel}>Batal</Button>
        <Button type="submit" disabled={!name.trim()}>{initial?.name ? 'Kemaskini' : 'Tambah Vendor'}</Button>
      </div>
    </form>
  );
}
