import { useState } from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getDateBefore, formatDate, getDaysUntil } from '../../utils/dateHelpers';

interface Milestone {
  label: string;
  description: string;
  monthsBefore: number;
  tasks: string[];
}

const milestones: Milestone[] = [
  {
    label: '12 Bulan Sebelum',
    description: 'Perancangan awal',
    monthsBefore: 12,
    tasks: [
      'Tetapkan bajet keseluruhan',
      'Pilih tarikh majlis',
      'Daftar kursus pra perkahwinan',
      'Tempah venue majlis',
    ],
  },
  {
    label: '9 Bulan Sebelum',
    description: 'Pengesahan vendor',
    monthsBefore: 9,
    tasks: [
      'Tempah katering',
      'Tempah pelamin',
      'Tempah fotografi',
      'Hantar borang nikah ke pejabat agama',
    ],
  },
  {
    label: '6 Bulan Sebelum',
    description: 'Persediaan pakaian',
    monthsBefore: 6,
    tasks: [
      'Tempah baju pengantin',
      'Tempah MUA (solek)',
      'Sediakan senarai tetamu',
      'Cetak kad jemputan',
    ],
  },
  {
    label: '3 Bulan Sebelum',
    description: 'Pengesahan tetamu',
    monthsBefore: 3,
    tasks: [
      'Edar kad jemputan',
      'Konfirm semua vendor',
      'Fitting baju pengantin',
      'Sediakan doorgift',
    ],
  },
  {
    label: '1 Bulan Sebelum',
    description: 'Persediaan akhir',
    monthsBefore: 1,
    tasks: [
      'Semak semua tempahan',
      'Bayar baki kepada vendor',
      'Buat dry run majlis',
      'Sediakan dokumen nikah',
    ],
  },
  {
    label: 'Hari Majlis',
    description: 'Hari perkahwinan',
    monthsBefore: 0,
    tasks: [
      'Akad nikah',
      'Majlis persandingan',
      'Sesi fotografi',
      'Terima tetamu',
    ],
  },
];

export function TimelinePage() {
  const [weddingDate] = useLocalStorage<string>('nakkahwin_wedding_date', '');
  const [showDateModal, setShowDateModal] = useState(false);
  const [dateInput, setDateInput] = useState(weddingDate);
  const [, setWeddingDate] = useLocalStorage<string>('nakkahwin_wedding_date', '');

  const getMilestoneDate = (m: Milestone) => {
    if (!weddingDate) return null;
    if (m.monthsBefore === 0) return new Date(weddingDate);
    return getDateBefore(weddingDate, m.monthsBefore);
  };

  const getMilestoneStatus = (m: Milestone): 'past' | 'current' | 'upcoming' => {
    const d = getMilestoneDate(m);
    if (!d) return 'upcoming';
    const days = getDaysUntil(d.toISOString().split('T')[0]);
    if (days < -7) return 'past';
    if (days <= 30) return 'current';
    return 'upcoming';
  };

  return (
    <PageContainer
      title="Timeline"
      subtitle="Jadual persediaan perkahwinan anda"
      action={
        <Button variant="outline" size="sm" onClick={() => setShowDateModal(true)}>
          <Calendar size={14} />
          {weddingDate ? 'Tukar Tarikh' : 'Tetapkan Tarikh'}
        </Button>
      }
    >
      {!weddingDate && (
        <div className="bg-blush-light border border-blush/30 rounded-2xl p-5 mb-6 text-center">
          <p className="text-navy font-semibold">Tetapkan tarikh majlis untuk melihat timeline anda</p>
          <button
            onClick={() => setShowDateModal(true)}
            className="text-sm font-medium mt-2 underline"
            style={{ color: '#FF85BB' }}
          >
            Klik di sini untuk tetapkan tarikh
          </button>
        </div>
      )}

      {weddingDate && (
        <div
          className="rounded-2xl p-5 mb-6 flex items-center gap-4"
          style={{ backgroundColor: '#021A54' }}
        >
          <Calendar size={20} color="#FF85BB" />
          <div>
            <p className="text-white/60 text-xs">Tarikh Perkahwinan</p>
            <p className="text-white font-bold">{formatDate(weddingDate)}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-white/60 text-xs">Hari Lagi</p>
            <p className="text-white font-bold text-lg">{Math.max(0, getDaysUntil(weddingDate))}</p>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {milestones.map((m, i) => {
            const date = getMilestoneDate(m);
            const status = getMilestoneStatus(m);

            return (
              <div key={i} className="relative flex gap-5">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 flex justify-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center z-10 border-2"
                    style={{
                      backgroundColor: status === 'past' ? '#FFCEE3' : status === 'current' ? '#FF85BB' : 'white',
                      borderColor: status === 'past' ? '#FFCEE3' : status === 'current' ? '#FF85BB' : '#E5E7EB',
                    }}
                  >
                    {status === 'past' ? (
                      <CheckCircle2 size={18} color="#FF85BB" />
                    ) : status === 'current' ? (
                      <Clock size={18} color="white" />
                    ) : (
                      <Calendar size={18} color="#9CA3AF" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-1">
                  <div className={`rounded-2xl border p-4 ${
                    status === 'current'
                      ? 'border-blush/50 shadow-sm'
                      : 'border-gray-100 bg-white'
                  }`}
                  style={status === 'current' ? { backgroundColor: '#FFF0F7' } : {}}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-semibold text-navy text-sm">{m.label}</p>
                        <p className="text-xs text-gray-500">{m.description}</p>
                      </div>
                      {date && (
                        <p className="text-xs text-gray-400 flex-shrink-0">
                          {date.toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                    <ul className="space-y-1">
                      {m.tasks.map((t, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
                          <div className="w-1 h-1 rounded-full bg-blush flex-shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={showDateModal} onClose={() => setShowDateModal(false)} title="Tetapkan Tarikh Perkahwinan" size="sm">
        <div className="space-y-4">
          <Input
            label="Tarikh Majlis"
            type="date"
            value={dateInput}
            onChange={e => setDateInput(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setShowDateModal(false)}>Batal</Button>
            <Button onClick={() => { if (dateInput) { setWeddingDate(dateInput); setShowDateModal(false); } }} disabled={!dateInput}>
              Simpan
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
