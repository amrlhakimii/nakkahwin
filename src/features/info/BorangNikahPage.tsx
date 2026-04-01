import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { borangNikahContent } from '../../data/infoContent';

export function BorangNikahPage() {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Panduan Borang Nikah"
      subtitle="Prosedur pendaftaran perkahwinan Islam di Malaysia"
      action={
        <Button variant="ghost" size="sm" onClick={() => navigate('/info')}>
          <ArrowLeft size={14} />
          Kembali
        </Button>
      }
    >
      <div className="max-w-2xl space-y-4">
        {borangNikahContent.map((section, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-navy mb-2">{section.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
