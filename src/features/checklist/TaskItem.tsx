import { Trash2, Pencil } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import type { Task, TaskCategory } from '../../types/task';

const categoryConfig: Record<TaskCategory, { label: string; color: 'navy' | 'pink' | 'green' | 'yellow' | 'red' | 'gray' | 'purple' | 'orange' | 'teal' }> = {
  legal: { label: 'Undang-undang', color: 'navy' },
  event: { label: 'Majlis', color: 'pink' },
  outfit: { label: 'Pakaian', color: 'purple' },
  finance: { label: 'Kewangan', color: 'green' },
  family: { label: 'Keluarga', color: 'orange' },
  honeymoon: { label: 'Bulan Madu', color: 'teal' },
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const cat = categoryConfig[task.category];

  return (
    <div className={`flex items-center gap-3 p-3.5 bg-white rounded-xl border transition-all ${task.completed ? 'border-gray-100 opacity-60' : 'border-gray-100 hover:border-blush/40'}`}>
      <button
        onClick={() => onToggle(task.id)}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          task.completed ? 'border-blush' : 'border-gray-300 hover:border-blush'
        }`}
        style={task.completed ? { backgroundColor: '#FF85BB', borderColor: '#FF85BB' } : {}}
      >
        {task.completed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-navy'}`}>
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Badge color={cat.color}>{cat.label}</Badge>
          {task.dueDate && (
            <span className="text-xs text-gray-400">
              {new Date(task.dueDate).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-blush-light transition-colors"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
