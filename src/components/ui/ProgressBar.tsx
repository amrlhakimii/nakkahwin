interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  color?: 'pink' | 'navy' | 'green';
}

const colors = {
  pink: 'bg-blush',
  navy: 'bg-navy',
  green: 'bg-green-500',
};

export function ProgressBar({ value, max = 100, className = '', showLabel = false, color = 'pink' }: ProgressBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors[color]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 mt-1 text-right">{percent}%</p>
      )}
    </div>
  );
}
