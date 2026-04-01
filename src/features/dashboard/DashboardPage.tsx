import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare, Wallet, Users, Calendar, Plus, Heart,
  Store, StickyNote, BookOpen, ArrowRight, Lightbulb,
  TrendingUp, MapPin,
} from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { useChecklist } from '../../hooks/useChecklist';
import { useBudget } from '../../hooks/useBudget';
import { useGuests } from '../../hooks/useGuests';
import { useVendors } from '../../hooks/useVendors';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { formatCurrency } from '../../utils/formatCurrency';
import { getDaysUntil, formatDate } from '../../utils/dateHelpers';
import { checklistTemplate } from '../../data/checklistTemplate';
import type { TaskCategory } from '../../types/task';

const weddingTips = [
  'Tempah venue sekurang-kurangnya 12 bulan awal untuk elak kekecewaan.',
  'Sediakan backup plan untuk cuaca buruk jika majlis di luar.',
  'Dapatkan sekurang-kurangnya 3 sebut harga sebelum pilih vendor.',
  'Simpan 10% daripada bajet sebagai rizab kecemasan.',
  'Buat senarai semak 2 minggu sebelum majlis untuk semak semua persediaan.',
  'Hantar kad jemputan sekurang-kurangnya 6 minggu sebelum majlis.',
  'Runding dengan kadi sekurang-kurangnya 3 bulan awal untuk pastikan tarikh tersedia.',
  'Ambil gambar semasa proses persediaan — ia akan jadi kenangan indah!',
  'Tetapkan waktu rehat antara sesi perkahwinan untuk kekal segar.',
  'Dapatkan sijil kursus kahwin seawal mungkin — slot boleh penuh!',
];

const categoryConfig: Record<TaskCategory, { label: string; color: string; bg: string }> = {
  legal:     { label: 'Undang-undang', color: '#021A54', bg: '#E8EDF7' },
  event:     { label: 'Majlis',        color: '#FF85BB', bg: '#FFCEE3' },
  outfit:    { label: 'Pakaian',       color: '#7C3AED', bg: '#EDE9FE' },
  finance:   { label: 'Kewangan',      color: '#059669', bg: '#D1FAE5' },
  family:    { label: 'Keluarga',      color: '#D97706', bg: '#FEF3C7' },
  honeymoon: { label: 'Bulan Madu',    color: '#0891B2', bg: '#CFFAFE' },
};

const quickActions = [
  { to: '/checklist', icon: CheckSquare, label: 'Checklist',    color: '#021A54', bg: '#E8EDF7' },
  { to: '/budget',    icon: Wallet,      label: 'Bajet',         color: '#059669', bg: '#D1FAE5' },
  { to: '/guests',    icon: Users,       label: 'Tetamu',        color: '#FF85BB', bg: '#FFCEE3' },
  { to: '/timeline',  icon: Calendar,    label: 'Timeline',      color: '#7C3AED', bg: '#EDE9FE' },
  { to: '/vendors',   icon: Store,       label: 'Vendor',        color: '#D97706', bg: '#FEF3C7' },
  { to: '/notes',     icon: StickyNote,  label: 'Nota',          color: '#0891B2', bg: '#CFFAFE' },
  { to: '/info',      icon: BookOpen,    label: 'Pusat Info',    color: '#DB2777', bg: '#FCE7F3' },
];

function getTodayTip() {
  const day = new Date().getDate();
  return weddingTips[day % weddingTips.length];
}

function getCountdownParts(days: number) {
  const months = Math.floor(days / 30);
  const weeks  = Math.floor((days % 30) / 7);
  const d      = days % 7;
  return { months, weeks, days: d };
}

export function DashboardPage() {
  const navigate = useNavigate();
  const [weddingDate, setWeddingDate] = useLocalStorage<string>('nakkahwin_wedding_date', '');
  const [showDateModal, setShowDateModal] = useState(false);
  const [dateInput, setDateInput] = useState(weddingDate);

  const { tasks, progress, completedCount, addTasks } = useChecklist();
  const { budget, totalSpent, spentPercent } = useBudget();
  const { guests, totalPax } = useGuests();
  const { vendors } = useVendors();

  const daysLeft = weddingDate ? getDaysUntil(weddingDate) : null;
  const countdown = daysLeft && daysLeft > 0 ? getCountdownParts(daysLeft) : null;

  // Readiness score (0–100) — based on actual planning progress only
  // Checklist 40% + Budget 25% + Guests 20% + Vendors 15%
  const checklistScore = progress; // already 0–100
  const budgetScore    = budget.totalBudget > 0 ? Math.min(100, 50 + spentPercent / 2) : 0;
  const guestScore     = Math.min(100, guests.length * 10);
  const vendorScore    = Math.min(100, vendors.length * 25);
  const readinessScore = Math.round(
    checklistScore * 0.40 +
    budgetScore    * 0.25 +
    guestScore     * 0.20 +
    vendorScore    * 0.15
  );

  // Checklist by category
  const categoryStats = (Object.keys(categoryConfig) as TaskCategory[]).map(cat => {
    const catTasks = tasks.filter(t => t.category === cat);
    const done = catTasks.filter(t => t.completed).length;
    const pct = catTasks.length > 0 ? Math.round((done / catTasks.length) * 100) : 0;
    return { cat, label: categoryConfig[cat].label, color: categoryConfig[cat].color,
             bg: categoryConfig[cat].bg, total: catTasks.length, done, pct };
  }).filter(s => s.total > 0);

  // RSVP breakdown
  const rsvpConfirmed = guests.filter(g => g.rsvpStatus === 'confirmed').length;
  const rsvpPending   = guests.filter(g => g.rsvpStatus === 'pending').length;
  const rsvpDeclined  = guests.filter(g => g.rsvpStatus === 'declined').length;
  const rsvpTotal     = guests.length || 1;

  // Upcoming tasks
  const upcomingTasks = tasks
    .filter(t => !t.completed && t.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 4);

  const handleSaveDate = () => {
    if (dateInput) { setWeddingDate(dateInput); setShowDateModal(false); }
  };

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Gambaran keseluruhan perancangan perkahwinan anda"
      action={
        <Button variant="outline" size="sm" onClick={() => setShowDateModal(true)}>
          <Calendar size={14} />
          {weddingDate ? 'Tukar Tarikh' : 'Tetapkan Tarikh'}
        </Button>
      }
    >
      {/* ── COUNTDOWN BANNER ── */}
      <div className="rounded-2xl mb-5 overflow-hidden" style={{ background: 'linear-gradient(135deg, #021A54 0%, #0d3080 100%)' }}>
        <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* Heart icon */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FF85BB' }}>
            <Heart size={26} fill="white" color="white" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            {weddingDate ? (
              <>
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Tarikh Perkahwinan</p>
                <h2 className="text-white text-xl font-bold mt-1">{formatDate(weddingDate)}</h2>
                <p className="text-white/60 text-sm mt-1">
                  {daysLeft === 0 ? 'Hari ini hari perkahwinan anda!' : daysLeft! < 0 ? 'Tahniah! Majlis telah berlangsung.' : 'Teruskan merancang — anda boleh!'}
                </p>
              </>
            ) : (
              <>
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Selamat Datang</p>
                <h2 className="text-white text-xl font-bold mt-1">Mulakan perancangan perkahwinan anda</h2>
                <button onClick={() => setShowDateModal(true)} className="text-sm font-semibold mt-2 underline" style={{ color: '#FF85BB' }}>
                  Tetapkan tarikh majlis →
                </button>
              </>
            )}
          </div>

          {/* Countdown split: months / weeks / days */}
          {countdown && (
            <div className="flex gap-3 flex-shrink-0">
              {[
                { value: countdown.months, label: 'bulan' },
                { value: countdown.weeks,  label: 'minggu' },
                { value: countdown.days,   label: 'hari' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center rounded-xl px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  <p className="text-3xl font-bold text-white leading-none">{value}</p>
                  <p className="text-white/50 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Readiness bar at bottom of banner */}
        <div className="px-6 pb-5">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-white/50 text-xs">Tahap Kesediaan Keseluruhan</p>
            <p className="text-white font-bold text-sm">{readinessScore}%</p>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${readinessScore}%`, backgroundColor: '#FF85BB' }}
            />
          </div>
        </div>
      </div>

      {/* ── SUMMARY CARDS ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        {[
          {
            label: 'Tugasan Selesai', value: `${completedCount}/${tasks.length}`,
            sub: tasks.length === 0 ? 'Tiada tugasan' : `${progress}% selesai`,
            icon: <CheckSquare size={17} />, accent: true,
          },
          {
            label: 'Bajet Digunakan', value: formatCurrency(totalSpent),
            sub: budget.totalBudget > 0 ? `Baki ${formatCurrency(budget.totalBudget - totalSpent)}` : 'Belum ditetapkan',
            icon: <Wallet size={17} />, accent: false,
          },
          {
            label: 'Jemputan', value: guests.length,
            sub: `${totalPax} pax dijangka`,
            icon: <Users size={17} />, accent: false,
          },
          {
            label: 'Vendor Ditambah', value: vendors.length,
            sub: vendors.length === 0 ? 'Belum ada vendor' : `${formatCurrency(vendors.reduce((s,v)=>s+v.price,0))} anggaran`,
            icon: <Store size={17} />, accent: false,
          },
        ].map(card => (
          <div
            key={card.label}
            className="rounded-2xl border p-4 flex items-start gap-3"
            style={card.accent ? { backgroundColor: '#021A54', borderColor: 'transparent' } : { backgroundColor: 'white', borderColor: '#F3F4F6' }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: card.accent ? 'rgba(255,133,187,0.2)' : '#FFCEE3' }}
            >
              <span style={{ color: card.accent ? '#FF85BB' : '#021A54' }}>{card.icon}</span>
            </div>
            <div className="min-w-0">
              <p className={`text-xs font-medium ${card.accent ? 'text-white/50' : 'text-gray-500'}`}>{card.label}</p>
              <p className={`text-xl font-bold mt-0.5 ${card.accent ? 'text-white' : 'text-navy'}`}>{card.value}</p>
              <p className={`text-xs mt-0.5 truncate ${card.accent ? 'text-white/40' : 'text-gray-400'}`}>{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── ROW: CHECKLIST BY CATEGORY + RSVP OVERVIEW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">

        {/* Checklist by Category */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={15} className="text-navy" />
            <h3 className="text-sm font-semibold text-navy">Kemajuan Mengikut Kategori</h3>
          </div>
          {categoryStats.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">Tiada tugasan lagi. Muat template untuk bermula.</p>
          ) : (
            <div className="space-y-3">
              {categoryStats.map(s => (
                <div key={s.cat}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-xs font-medium text-gray-700">{s.label}</span>
                    </div>
                    <span className="text-xs text-gray-400">{s.done}/{s.total}</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden bg-gray-100">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RSVP Overview */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users size={15} className="text-navy" />
            <h3 className="text-sm font-semibold text-navy">Status RSVP Tetamu</h3>
          </div>
          {guests.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">Tiada tetamu lagi. Tambah tetamu untuk pantau RSVP.</p>
          ) : (
            <>
              {/* Stacked bar */}
              <div className="w-full h-4 rounded-full overflow-hidden flex mb-4">
                {rsvpConfirmed > 0 && (
                  <div className="h-full transition-all duration-500" style={{ width: `${(rsvpConfirmed/rsvpTotal)*100}%`, backgroundColor: '#10B981' }} />
                )}
                {rsvpPending > 0 && (
                  <div className="h-full transition-all duration-500" style={{ width: `${(rsvpPending/rsvpTotal)*100}%`, backgroundColor: '#F59E0B' }} />
                )}
                {rsvpDeclined > 0 && (
                  <div className="h-full transition-all duration-500" style={{ width: `${(rsvpDeclined/rsvpTotal)*100}%`, backgroundColor: '#EF4444' }} />
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Disahkan',      value: rsvpConfirmed, color: '#10B981', bg: '#D1FAE5' },
                  { label: 'Belum Sahkan',  value: rsvpPending,   color: '#F59E0B', bg: '#FEF3C7' },
                  { label: 'Tidak Hadir',   value: rsvpDeclined,  color: '#EF4444', bg: '#FEE2E2' },
                ].map(r => (
                  <div key={r.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: r.bg }}>
                    <p className="text-xl font-bold" style={{ color: r.color }}>{r.value}</p>
                    <p className="text-xs mt-0.5 font-medium" style={{ color: r.color + 'CC' }}>{r.label}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-3 text-center">{totalPax} pax dijangka hadir keseluruhannya</p>
            </>
          )}
        </div>
      </div>

      {/* ── ROW: QUICK ACTIONS + UPCOMING TASKS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-navy mb-4">Akses Pantas</h3>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map(({ to, icon: Icon, label, color, bg }) => (
              <button
                key={to}
                onClick={() => navigate(to)}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: bg }}
              >
                <Icon size={18} style={{ color }} />
                <span className="text-xs font-medium leading-tight text-center" style={{ color }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-navy">Tugasan Mendesak</h3>
            <button onClick={() => navigate('/checklist')} className="text-xs font-medium flex items-center gap-1" style={{ color: '#FF85BB' }}>
              Lihat semua <ArrowRight size={12} />
            </button>
          </div>
          {upcomingTasks.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">Tiada tugasan dengan tarikh tamat ditetapkan.</p>
          ) : (
            <div className="space-y-2">
              {upcomingTasks.map(task => {
                const cat = categoryConfig[task.category];
                return (
                  <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: cat.bg }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: cat.color }}>{task.title}</p>
                      {task.dueDate && (
                        <p className="text-xs mt-0.5 opacity-60" style={{ color: cat.color }}>
                          {new Date(task.dueDate).toLocaleDateString('en-MY', { day: 'numeric', month: 'short' })}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── ROW: WEDDING TIP + LOCATION STUB ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">

        {/* Tip of the day */}
        <div className="lg:col-span-2 rounded-2xl p-5 flex gap-4 items-start" style={{ backgroundColor: '#FFF0F7', border: '1px solid #FFCEE3' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FF85BB' }}>
            <Lightbulb size={18} color="white" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#FF85BB' }}>Tip Hari Ini</p>
            <p className="text-sm text-navy font-medium leading-relaxed">{getTodayTip()}</p>
          </div>
        </div>

        {/* Quick stats snapshot */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={15} className="text-navy" />
            <h3 className="text-sm font-semibold text-navy">Ringkasan</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Bajet ditetapkan</span>
              <span className="text-xs font-semibold text-navy">{budget.totalBudget > 0 ? formatCurrency(budget.totalBudget) : '—'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Perbelanjaan</span>
              <span className="text-xs font-semibold" style={{ color: '#FF85BB' }}>{formatCurrency(totalSpent)}</span>
            </div>
            <div className="w-full h-px bg-gray-100" />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Vendor disenarai</span>
              <span className="text-xs font-semibold text-navy">{vendors.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Tetamu dijemput</span>
              <span className="text-xs font-semibold text-navy">{guests.length} ({totalPax} pax)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── QUICK START (only if no tasks) ── */}
      {tasks.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed p-6 text-center" style={{ borderColor: '#FFCEE3', backgroundColor: '#FFF8FB' }}>
          <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#FFCEE3' }}>
            <CheckSquare size={22} style={{ color: '#021A54' }} />
          </div>
          <p className="text-navy font-semibold mb-1">Mulakan dengan template checklist</p>
          <p className="text-gray-400 text-sm mb-4">Muat 30+ tugasan perkahwinan yang telah disediakan</p>
          <Button onClick={() => addTasks(checklistTemplate)} variant="secondary">
            <Plus size={15} />
            Muat Template Checklist
          </Button>
        </div>
      )}

      {/* Date Modal */}
      <Modal isOpen={showDateModal} onClose={() => setShowDateModal(false)} title="Tetapkan Tarikh Perkahwinan" size="sm">
        <div className="space-y-4">
          <Input label="Tarikh Majlis" type="date" value={dateInput} onChange={e => setDateInput(e.target.value)} />
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setShowDateModal(false)}>Batal</Button>
            <Button onClick={handleSaveDate} disabled={!dateInput}>Simpan</Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
