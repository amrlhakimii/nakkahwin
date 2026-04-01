import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { masKahwinData, hantaranData, adatNegeriData } from '../../data/adatNegeri';

type Tab = 'maskahwin' | 'hantaran' | 'adat';

const tabs: { id: Tab; label: string }[] = [
  { id: 'maskahwin', label: 'Mas Kahwin' },
  { id: 'hantaran',  label: 'Hantaran' },
  { id: 'adat',      label: 'Adat Negeri' },
];

export function AdatNegeriPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('maskahwin');
  const [expandedAdat, setExpandedAdat] = useState<string | null>(null);

  return (
    <PageContainer
      title="Adat & Mas Kahwin"
      subtitle="Panduan mas kahwin, hantaran, dan adat perkahwinan mengikut negeri"
      action={
        <Button variant="ghost" size="sm" onClick={() => navigate('/info')}>
          <ArrowLeft size={14} />
          Kembali
        </Button>
      }
    >
      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ backgroundColor: '#F0F0F0' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={
              activeTab === tab.id
                ? { backgroundColor: '#021A54', color: 'white' }
                : { color: '#6B7280' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB: MAS KAHWIN ── */}
      {activeTab === 'maskahwin' && (
        <div className="max-w-3xl space-y-3">
          <div className="rounded-2xl p-4 mb-2 flex gap-3" style={{ backgroundColor: '#FFF0F7', border: '1px solid #FFCEE3' }}>
            <Info size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#FF85BB' }} />
            <p className="text-sm text-gray-600 leading-relaxed">
              Kadar mas kahwin berbeza mengikut negeri dan boleh berubah dari semasa ke semasa.
              Sila semak dengan Pejabat Agama Islam Daerah (PAID) anda untuk kadar terkini.
            </p>
          </div>

          {masKahwinData.map((item) => (
            <div key={item.negeri} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-navy">{item.negeri}</p>
                  {item.bonusHafizah && (
                    <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFCEE3', color: '#021A54' }}>
                      + Bonus Hafizah: {item.bonusHafizah}
                    </span>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">Minimum</p>
                  <p className="text-lg font-bold text-navy">{item.kadarMinimum}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Disyorkan: <span className="font-medium text-gray-600">{item.kadarDisyorkan}</span></p>
                </div>
              </div>
              <div className="px-5 pb-4">
                <p className="text-sm text-gray-500 leading-relaxed">{item.nota}</p>
              </div>
            </div>
          ))}

          <div className="rounded-2xl p-4 mt-2" style={{ backgroundColor: '#F0F4FF', border: '1px solid #C7D2FE' }}>
            <p className="text-sm font-semibold text-navy mb-1">Apakah itu Mas Kahwin?</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Mas kahwin (mahar) adalah pemberian wajib daripada pengantin lelaki kepada pengantin perempuan semasa akad nikah.
              Ia merupakan hak mutlak isteri dan bukan sekadar formaliti. Jumlahnya boleh berupa wang tunai, emas, atau harta lain
              mengikut persetujuan bersama, selagi menepati kadar minimum yang ditetapkan oleh negeri.
            </p>
          </div>
        </div>
      )}

      {/* ── TAB: HANTARAN ── */}
      {activeTab === 'hantaran' && (
        <div className="max-w-3xl space-y-4">
          <div className="rounded-2xl p-4 mb-2 flex gap-3" style={{ backgroundColor: '#FFF0F7', border: '1px solid #FFCEE3' }}>
            <Info size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#FF85BB' }} />
            <p className="text-sm text-gray-600 leading-relaxed">
              Bilangan dulang hantaran adalah panduan umum sahaja. Ia boleh berbeza mengikut persetujuan kedua-dua keluarga.
              Nombor ganjil (3, 5, 7, 9) lebih diutamakan dalam adat Melayu.
            </p>
          </div>

          {hantaranData.map((item) => (
            <div key={item.negeri} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="font-semibold text-navy mb-3">{item.negeri}</p>

              {/* Dulang count */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#E8EDF7' }}>
                  <p className="text-xs text-gray-500 mb-1">Lelaki bawa</p>
                  <p className="text-xl font-bold text-navy">{item.lelaki}</p>
                </div>
                <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#FFCEE3' }}>
                  <p className="text-xs text-gray-500 mb-1">Perempuan bawa</p>
                  <p className="text-xl font-bold" style={{ color: '#FF85BB' }}>{item.perempuan}</p>
                </div>
              </div>

              {/* Contents */}
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Kandungan lazim:</p>
              <div className="grid grid-cols-2 gap-1 mb-3">
                {item.kandunganLazim.map((k, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FF85BB' }} />
                    {k}
                  </div>
                ))}
              </div>

              {item.nota && (
                <div className="rounded-xl p-3 mt-1" style={{ backgroundColor: '#F9FAFB' }}>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.nota}</p>
                </div>
              )}
            </div>
          ))}

          <div className="rounded-2xl p-4" style={{ backgroundColor: '#F0F4FF', border: '1px solid #C7D2FE' }}>
            <p className="text-sm font-semibold text-navy mb-1">Perbezaan Hantaran vs Mas Kahwin</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Mas Kahwin</strong> adalah wajib secara syarak dan merupakan hak isteri. <strong>Hantaran</strong> pula adalah adat budaya,
              bukan wajib secara agama, tetapi sangat dititikberatkan dalam budaya Melayu. Nilai hantaran ditentukan
              oleh persetujuan keluarga dan boleh berbeza-beza.
            </p>
          </div>
        </div>
      )}

      {/* ── TAB: ADAT NEGERI ── */}
      {activeTab === 'adat' && (
        <div className="max-w-3xl space-y-3">
          <div className="rounded-2xl p-4 mb-2 flex gap-3" style={{ backgroundColor: '#FFF0F7', border: '1px solid #FFCEE3' }}>
            <Info size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#FF85BB' }} />
            <p className="text-sm text-gray-600 leading-relaxed">
              Adat perkahwinan di Malaysia kaya dan beragam. Klik pada setiap negeri untuk melihat adat istiadatnya.
            </p>
          </div>

          {adatNegeriData.map((item) => {
            const isOpen = expandedAdat === item.negeri;
            return (
              <div key={item.negeri} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedAdat(isOpen ? null : item.negeri)}
                >
                  <div>
                    <p className="font-semibold text-navy">{item.negeri}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.ringkasan}</p>
                  </div>
                  <div className="flex-shrink-0 ml-3" style={{ color: '#FF85BB' }}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-gray-50">
                    <div className="space-y-3 mt-4">
                      {item.adat.map((a, i) => (
                        <div key={i} className="flex gap-3">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                            style={{ backgroundColor: '#FFCEE3', color: '#021A54' }}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-navy">{a.tajuk}</p>
                            <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{a.huraian}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
