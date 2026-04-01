import React from 'react';

interface SummaryCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  accent?: boolean;
}

export function SummaryCard({ label, value, sub, icon, accent = false }: SummaryCardProps) {
  return (
    <div
      className={`rounded-2xl border shadow-sm p-5 flex items-start gap-4 ${
        accent
          ? 'text-white border-transparent'
          : 'bg-white border-gray-100 text-navy'
      }`}
      style={accent ? { backgroundColor: '#021A54' } : {}}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: accent ? 'rgba(255,133,187,0.2)' : '#FFCEE3' }}
      >
        <span style={{ color: accent ? '#FF85BB' : '#021A54' }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className={`text-xs font-medium ${accent ? 'text-white/60' : 'text-gray-500'}`}>{label}</p>
        <p className={`text-2xl font-bold mt-0.5 ${accent ? 'text-white' : 'text-navy'}`}>{value}</p>
        {sub && <p className={`text-xs mt-0.5 ${accent ? 'text-white/50' : 'text-gray-400'}`}>{sub}</p>}
      </div>
    </div>
  );
}
