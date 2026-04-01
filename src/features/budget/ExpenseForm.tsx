import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import type { Expense, ExpenseCategory } from '../../types/expense';

interface ExpenseFormProps {
  onSubmit: (data: Omit<Expense, 'id'>) => void;
  onCancel: () => void;
}

const categories: { value: ExpenseCategory; label: string }[] = [
  { value: 'venue', label: 'Venue / Dewan' },
  { value: 'catering', label: 'Katering' },
  { value: 'outfit', label: 'Pakaian Pengantin' },
  { value: 'photographer', label: 'Fotografi & Video' },
  { value: 'doorgift', label: 'Doorgift' },
  { value: 'makeup', label: 'Solek (MUA)' },
];

export function ExpenseForm({ onSubmit, onCancel }: ExpenseFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('venue');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount) return;
    onSubmit({ name: name.trim(), amount: Number(amount), category, date });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nama Perbelanjaan"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="cth: Bayar deposit dewan"
        autoFocus
      />
      <Input
        label="Jumlah (RM)"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="0"
        min="0"
      />
      <Select label="Kategori" value={category} onChange={e => setCategory(e.target.value as ExpenseCategory)}>
        {categories.map(c => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </Select>
      <Input
        label="Tarikh"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <div className="flex gap-2 justify-end pt-1">
        <Button type="button" variant="ghost" onClick={onCancel}>Batal</Button>
        <Button type="submit" disabled={!name.trim() || !amount}>Tambah</Button>
      </div>
    </form>
  );
}
