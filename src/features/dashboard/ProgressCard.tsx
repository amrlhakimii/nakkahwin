import { ProgressBar } from '../../components/ui/ProgressBar';

interface ProgressCardProps {
  label: string;
  percent: number;
  detail: string;
  color?: 'pink' | 'navy' | 'green';
}

export function ProgressCard({ label, percent, detail, color = 'pink' }: ProgressCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <span className="text-2xl font-bold text-navy">{percent}%</span>
      </div>
      <ProgressBar value={percent} color={color} />
      <p className="text-xs text-gray-400 mt-2">{detail}</p>
    </div>
  );
}
