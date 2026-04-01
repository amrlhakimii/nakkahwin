import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { checklistTemplate } from '../../data/checklistTemplate';
import type { TaskCategory } from '../../types/task';

const categoryConfig: Record<TaskCategory, { label: string; color: 'navy' | 'pink' | 'green' | 'yellow' | 'red' | 'gray' | 'purple' | 'orange' | 'teal' }> = {
  legal: { label: 'Undang-undang', color: 'navy' },
  event: { label: 'Majlis', color: 'pink' },
  outfit: { label: 'Pakaian', color: 'purple' },
  finance: { label: 'Kewangan', color: 'green' },
  family: { label: 'Keluarga', color: 'orange' },
  honeymoon: { label: 'Bulan Madu', color: 'teal' },
};

const grouped = checklistTemplate.reduce((acc, task) => {
  if (!acc[task.category]) acc[task.category] = [];
  acc[task.category].push(task);
  return acc;
}, {} as Record<TaskCategory, typeof checklistTemplate>);

export function ChecklistGuidePage() {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Panduan Checklist"
      subtitle="Senarai tugasan perkahwinan yang disyorkan"
      action={
        <Button variant="ghost" size="sm" onClick={() => navigate('/info')}>
          <ArrowLeft size={14} />
          Kembali
        </Button>
      }
    >
      <div className="max-w-2xl space-y-4">
        {(Object.keys(grouped) as TaskCategory[]).map(cat => {
          const config = categoryConfig[cat];
          return (
            <div key={cat} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge color={config.color}>{config.label}</Badge>
                <span className="text-xs text-gray-400">{grouped[cat].length} tugasan</span>
              </div>
              <ul className="space-y-1.5">
                {grouped[cat].map((task, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FF85BB' }} />
                    {task.title}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#F0F4FF', borderColor: '#C7D2FE' }}>
          <p className="text-sm font-semibold text-navy mb-1">Cara Gunakan Template Ini</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Pergi ke halaman <strong>Checklist</strong> dan klik butang <strong>"Muat Template"</strong>
            untuk menambah semua tugasan ini secara automatik ke dalam checklist anda.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
