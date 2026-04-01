import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { GuestForm } from './GuestForm';
import { useGuests } from '../../hooks/useGuests';
import type { Guest, GuestGroup, RsvpStatus } from '../../types/guest';

const groupConfig: Record<GuestGroup, { label: string; color: 'navy' | 'pink' | 'green' | 'yellow' | 'red' | 'gray' | 'purple' | 'orange' | 'teal' }> = {
  bride_family: { label: 'Keluarga Pengantin Perempuan', color: 'pink' },
  groom_family: { label: 'Keluarga Pengantin Lelaki', color: 'navy' },
  friends: { label: 'Rakan-rakan', color: 'teal' },
  colleagues: { label: 'Rakan Sekerja', color: 'purple' },
};

const rsvpConfig: Record<RsvpStatus, { label: string; color: 'navy' | 'pink' | 'green' | 'yellow' | 'red' | 'gray' | 'purple' | 'orange' | 'teal' }> = {
  pending: { label: 'Belum Sahkan', color: 'yellow' },
  confirmed: { label: 'Disahkan', color: 'green' },
  declined: { label: 'Tidak Hadir', color: 'red' },
};

export function GuestPage() {
  const { guests, addGuest, updateGuest, deleteGuest, totalPax, confirmedPax } = useGuests();
  const [showAdd, setShowAdd] = useState(false);
  const [editGuest, setEditGuest] = useState<Guest | null>(null);
  const [filterGroup, setFilterGroup] = useState<GuestGroup | 'all'>('all');

  const filtered = filterGroup === 'all' ? guests : guests.filter(g => g.group === filterGroup);

  const confirmed = guests.filter(g => g.rsvpStatus === 'confirmed').length;
  const pending = guests.filter(g => g.rsvpStatus === 'pending').length;
  const declined = guests.filter(g => g.rsvpStatus === 'declined').length;

  const handleAdd = (data: Omit<Guest, 'id'>) => { addGuest(data); setShowAdd(false); };
  const handleEdit = (data: Omit<Guest, 'id'>) => {
    if (editGuest) { updateGuest(editGuest.id, data); setEditGuest(null); }
  };

  return (
    <PageContainer
      title="Senarai Tetamu"
      subtitle={`${guests.length} tetamu • ${totalPax} pax`}
      action={
        <Button size="sm" onClick={() => setShowAdd(true)}>
          <Plus size={14} />
          Tambah Tetamu
        </Button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Jumlah Tetamu', value: guests.length, color: 'text-navy' },
          { label: 'Disahkan', value: confirmed, color: 'text-green-600' },
          { label: 'Belum Sahkan', value: pending, color: 'text-yellow-600' },
          { label: 'Tidak Hadir', value: declined, color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Pax info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 flex items-center gap-4">
        <div>
          <p className="text-xs text-gray-500">Jumlah Pax Dijangka</p>
          <p className="text-xl font-bold text-navy">{totalPax} pax</p>
        </div>
        <div className="w-px h-10 bg-gray-100" />
        <div>
          <p className="text-xs text-gray-500">Pax Disahkan</p>
          <p className="text-xl font-bold text-green-600">{confirmedPax} pax</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-4">
        {(['all', 'bride_family', 'groom_family', 'friends', 'colleagues'] as const).map(g => (
          <button
            key={g}
            onClick={() => setFilterGroup(g)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterGroup === g
                ? 'text-white'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-blush hover:text-navy'
            }`}
            style={filterGroup === g ? { backgroundColor: '#021A54' } : {}}
          >
            {g === 'all' ? 'Semua' : groupConfig[g].label}
          </button>
        ))}
      </div>

      {/* Guest list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="font-medium">Tiada tetamu ditemui</p>
          <p className="text-sm mt-1">Tambah tetamu pertama anda</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(guest => (
            <div key={guest.id} className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-gray-100 hover:border-blush/40 transition-all">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy">{guest.name}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge color={groupConfig[guest.group].color}>{groupConfig[guest.group].label}</Badge>
                  <Badge color={rsvpConfig[guest.rsvpStatus].color}>{rsvpConfig[guest.rsvpStatus].label}</Badge>
                  <span className="text-xs text-gray-400">{guest.pax} pax</span>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => setEditGuest(guest)} className="p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-blush-light transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => deleteGuest(guest.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Tambah Tetamu">
        <GuestForm onSubmit={handleAdd} onCancel={() => setShowAdd(false)} />
      </Modal>
      <Modal isOpen={!!editGuest} onClose={() => setEditGuest(null)} title="Edit Tetamu">
        {editGuest && <GuestForm initial={editGuest} onSubmit={handleEdit} onCancel={() => setEditGuest(null)} />}
      </Modal>
    </PageContainer>
  );
}
