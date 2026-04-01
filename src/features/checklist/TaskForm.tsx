import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import type { Task, TaskCategory } from '../../types/task';

interface TaskFormProps {
  initial?: Partial<Task>;
  onSubmit: (data: Omit<Task, 'id'>) => void;
  onCancel: () => void;
}

const categories: { value: TaskCategory; label: string }[] = [
  { value: 'legal', label: 'Undang-undang' },
  { value: 'event', label: 'Majlis' },
  { value: 'outfit', label: 'Pakaian' },
  { value: 'finance', label: 'Kewangan' },
  { value: 'family', label: 'Keluarga' },
  { value: 'honeymoon', label: 'Bulan Madu' },
];

export function TaskForm({ initial, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [category, setCategory] = useState<TaskCategory>(initial?.category ?? 'event');
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), category, completed: initial?.completed ?? false, dueDate: dueDate || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nama Tugasan"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="cth: Tempah dewan majlis"
        autoFocus
      />
      <Select label="Kategori" value={category} onChange={e => setCategory(e.target.value as TaskCategory)}>
        {categories.map(c => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </Select>
      <Input
        label="Tarikh Siap (pilihan)"
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <div className="flex gap-2 justify-end pt-1">
        <Button type="button" variant="ghost" onClick={onCancel}>Batal</Button>
        <Button type="submit" disabled={!title.trim()}>
          {initial?.title ? 'Kemaskini' : 'Tambah Tugasan'}
        </Button>
      </div>
    </form>
  );
}
