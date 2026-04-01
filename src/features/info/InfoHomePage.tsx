import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, Users, Wallet, CheckSquare, ChevronRight, Landmark } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';

const guides = [
  {
    to: '/info/borang-nikah',
    icon: FileText,
    title: 'Panduan Borang Nikah',
    description: 'Dokumen diperlukan, langkah permohonan, dan yuran pendaftaran perkahwinan.',
    color: '#021A54',
    bg: '#E8EDF7',
  },
  {
    to: '/info/kursus-nikah',
    icon: BookOpen,
    title: 'Kursus Pra Perkahwinan',
    description: 'Maklumat tentang kursus wajib, cara daftar, dan kandungan kursus.',
    color: '#FF85BB',
    bg: '#FFCEE3',
  },
  {
    to: '/info/imam-kadi',
    icon: Users,
    title: 'Panduan Imam / Kadi',
    description: 'Cara hubungi kadi, prosedur temujanji, dan persediaan akad nikah.',
    color: '#7C3AED',
    bg: '#EDE9FE',
  },
  {
    to: '/info/budget-guide',
    icon: Wallet,
    title: 'Panduan Bajet',
    description: 'Anggaran kos perkahwinan mengikut pakej ekonomi, sederhana, dan mewah.',
    color: '#059669',
    bg: '#D1FAE5',
  },
  {
    to: '/info/checklist-guide',
    icon: CheckSquare,
    title: 'Panduan Checklist',
    description: 'Senarai tugasan perkahwinan yang disyorkan dari 12 bulan sebelum hingga hari majlis.',
    color: '#D97706',
    bg: '#FEF3C7',
  },
  {
    to: '/info/adat-negeri',
    icon: Landmark,
    title: 'Adat & Mas Kahwin Negeri',
    description: 'Kadar mas kahwin, bilangan hantaran, dan adat perkahwinan mengikut negeri di Malaysia.',
    color: '#BE185D',
    bg: '#FCE7F3',
  },
];

export function InfoHomePage() {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Pusat Maklumat"
      subtitle="Panduan lengkap perkahwinan Islam di Malaysia"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map(guide => {
          const Icon = guide.icon;
          return (
            <button
              key={guide.to}
              onClick={() => navigate(guide.to)}
              className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-5 text-left hover:border-blush/50 hover:shadow-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: guide.bg }}>
                <Icon size={22} color={guide.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy">{guide.title}</p>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{guide.description}</p>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-blush transition-colors flex-shrink-0 mt-1" />
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl p-5 border" style={{ backgroundColor: '#F0F4FF', borderColor: '#C7D2FE' }}>
        <p className="text-sm font-semibold text-navy mb-1">Nota Penting</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Maklumat dalam Pusat Maklumat ini adalah panduan umum. Prosedur dan yuran mungkin berbeza mengikut negeri.
          Sila hubungi Pejabat Agama Islam Daerah (PAID) anda untuk maklumat terkini dan tepat.
        </p>
      </div>
    </PageContainer>
  );
}
