import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { budgetTiers, budgetTips } from '../../data/budgetGuide';
import { formatCurrency } from '../../utils/formatCurrency';

export function BudgetGuidePage() {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Panduan Bajet Perkahwinan"
      subtitle="Anggaran kos perkahwinan di Malaysia mengikut tahap"
      action={
        <Button variant="ghost" size="sm" onClick={() => navigate('/info')}>
          <ArrowLeft size={14} />
          Kembali
        </Button>
      }
    >
      <div className="max-w-3xl space-y-6">
        {budgetTiers.map(tier => (
          <div key={tier.tier} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{
                backgroundColor: tier.tier === 'ekonomi' ? '#F0FDF4' : tier.tier === 'sederhana' ? '#FFF7ED' : '#FDF4FF',
              }}
            >
              <div>
                <p className="font-bold text-navy">Pakej {tier.label}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {formatCurrency(tier.totalMin)} – {formatCurrency(tier.totalMax)}
                </p>
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: tier.tier === 'ekonomi' ? '#D1FAE5' : tier.tier === 'sederhana' ? '#FED7AA' : '#F3E8FF',
                  color: tier.tier === 'ekonomi' ? '#065F46' : tier.tier === 'sederhana' ? '#92400E' : '#6B21A8',
                }}
              >
                {tier.label}
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {tier.items.map((item, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-navy">{item.category}</p>
                    <p className="text-xs text-gray-400">{item.notes}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 flex-shrink-0">
                    {formatCurrency(item.minCost)} – {formatCurrency(item.maxCost)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Tips */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-semibold text-navy mb-3">Tips Pengurusan Bajet</h3>
          <ul className="space-y-2">
            {budgetTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#FF85BB' }} />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl p-4 border" style={{ backgroundColor: '#FFF0F7', borderColor: '#FFCEE3' }}>
          <p className="text-xs text-gray-500">
            * Harga adalah anggaran sahaja dan boleh berbeza mengikut lokasi, vendor, dan permintaan semasa.
            Sentiasa dapatkan sebut harga terkini dari vendor berkaitan.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
