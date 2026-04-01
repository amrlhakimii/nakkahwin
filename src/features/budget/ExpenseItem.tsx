import { Trash2 } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import type { Expense, ExpenseCategory } from '../../types/expense';

const categoryConfig: Record<ExpenseCategory, { label: string; color: 'navy' | 'pink' | 'green' | 'yellow' | 'red' | 'gray' | 'purple' | 'orange' | 'teal' }> = {
  venue: { label: 'Venue', color: 'navy' },
  catering: { label: 'Katering', color: 'orange' },
  outfit: { label: 'Pakaian', color: 'purple' },
  photographer: { label: 'Fotografi', color: 'teal' },
  doorgift: { label: 'Doorgift', color: 'pink' },
  makeup: { label: 'Solek', color: 'yellow' },
};

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const cat = categoryConfig[expense.category];
  return (
    <div className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-gray-100 hover:border-blush/40 transition-all">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-navy">{expense.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge color={cat.color}>{cat.label}</Badge>
          <span className="text-xs text-gray-400">
            {new Date(expense.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>
      <p className="text-sm font-bold text-navy flex-shrink-0">{formatCurrency(expense.amount)}</p>
      <button
        onClick={() => onDelete(expense.id)}
        className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
