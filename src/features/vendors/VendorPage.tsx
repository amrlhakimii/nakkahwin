import { useState } from 'react';
import { Plus, Pencil, Trash2, Phone } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { VendorForm } from './VendorForm';
import { useVendors } from '../../hooks/useVendors';
import { formatCurrency } from '../../utils/formatCurrency';
import type { Vendor, VendorCategory } from '../../types/vendor';

const categoryConfig: Record<VendorCategory, { label: string; color: 'navy' | 'pink' | 'green' | 'yellow' | 'red' | 'gray' | 'purple' | 'orange' | 'teal' }> = {
  photographer: { label: 'Fotografi', color: 'teal' },
  makeup: { label: 'Solek', color: 'pink' },
  pelamin: { label: 'Pelamin', color: 'purple' },
  catering: { label: 'Katering', color: 'orange' },
  emcee: { label: 'Emcee', color: 'navy' },
};

export function VendorPage() {
  const { vendors, addVendor, updateVendor, deleteVendor } = useVendors();
  const [showAdd, setShowAdd] = useState(false);
  const [editVendor, setEditVendor] = useState<Vendor | null>(null);
  const [filterCat, setFilterCat] = useState<VendorCategory | 'all'>('all');

  const filtered = filterCat === 'all' ? vendors : vendors.filter(v => v.category === filterCat);
  const totalEstimate = vendors.reduce((sum, v) => sum + v.price, 0);

  const handleAdd = (data: Omit<Vendor, 'id'>) => { addVendor(data); setShowAdd(false); };
  const handleEdit = (data: Omit<Vendor, 'id'>) => {
    if (editVendor) { updateVendor(editVendor.id, data); setEditVendor(null); }
  };

  return (
    <PageContainer
      title="Vendor"
      subtitle={`${vendors.length} vendor • Anggaran ${formatCurrency(totalEstimate)}`}
      action={
        <Button size="sm" onClick={() => setShowAdd(true)}>
          <Plus size={14} />
          Tambah Vendor
        </Button>
      }
    >
      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        {(['all', 'photographer', 'makeup', 'pelamin', 'catering', 'emcee'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterCat === cat ? 'text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-blush hover:text-navy'
            }`}
            style={filterCat === cat ? { backgroundColor: '#021A54' } : {}}
          >
            {cat === 'all' ? 'Semua' : categoryConfig[cat].label}
          </button>
        ))}
      </div>

      {/* Vendor list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="font-medium">Tiada vendor ditemui</p>
          <p className="text-sm mt-1">Tambah butiran vendor perkahwinan anda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map(vendor => {
            const cat = categoryConfig[vendor.category];
            return (
              <div key={vendor.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-blush/40 transition-all">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="font-semibold text-navy">{vendor.name}</p>
                    <Badge color={cat.color} className="mt-1">{cat.label}</Badge>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => setEditVendor(vendor)} className="p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-blush-light transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => deleteVendor(vendor.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {vendor.contact && (
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-1">
                    <Phone size={11} />
                    {vendor.contact}
                  </p>
                )}
                {vendor.price > 0 && (
                  <p className="text-sm font-bold text-navy mt-2">{formatCurrency(vendor.price)}</p>
                )}
                {vendor.notes && (
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{vendor.notes}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Tambah Vendor" size="lg">
        <VendorForm onSubmit={handleAdd} onCancel={() => setShowAdd(false)} />
      </Modal>
      <Modal isOpen={!!editVendor} onClose={() => setEditVendor(null)} title="Edit Vendor" size="lg">
        {editVendor && <VendorForm initial={editVendor} onSubmit={handleEdit} onCancel={() => setEditVendor(null)} />}
      </Modal>
    </PageContainer>
  );
}
