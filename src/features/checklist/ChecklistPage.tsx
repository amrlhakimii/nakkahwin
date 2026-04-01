import { useState } from 'react';
import { Plus, RotateCcw } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { useChecklist } from '../../hooks/useChecklist';
import { checklistTemplate } from '../../data/checklistTemplate';
import type { Task, TaskCategory } from '../../types/task';

const categories: { value: TaskCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'legal', label: 'Undang-undang' },
  { value: 'event', label: 'Majlis' },
  { value: 'outfit', label: 'Pakaian' },
  { value: 'finance', label: 'Kewangan' },
  { value: 'family', label: 'Keluarga' },
  { value: 'honeymoon', label: 'Bulan Madu' },
];

export function ChecklistPage() {
  const { tasks, addTask, addTasks, updateTask, deleteTask, toggleTask, progress, completedCount } = useChecklist();
  const [showAdd, setShowAdd] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [activeFilter, setActiveFilter] = useState<TaskCategory | 'all'>('all');

  const filtered = activeFilter === 'all' ? tasks : tasks.filter(t => t.category === activeFilter);

  const handleAdd = (data: Omit<Task, 'id'>) => {
    addTask(data);
    setShowAdd(false);
  };

  const handleEdit = (data: Omit<Task, 'id'>) => {
    if (editTask) {
      updateTask(editTask.id, data);
      setEditTask(null);
    }
  };

  const handleLoadTemplate = () => {
    addTasks(checklistTemplate);
  };

  return (
    <PageContainer
      title="Checklist"
      subtitle={`${completedCount} daripada ${tasks.length} tugasan selesai`}
      action={
        <div className="flex gap-2">
          {tasks.length === 0 && (
            <Button variant="outline" size="sm" onClick={handleLoadTemplate}>
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Muat Template</span>
            </Button>
          )}
          <Button size="sm" onClick={() => setShowAdd(true)}>
            <Plus size={14} />
            <span className="hidden sm:inline">Tambah Tugasan</span>
          </Button>
        </div>
      }
    >
      {/* Progress */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-600">Kemajuan Keseluruhan</p>
          <span className="text-xl font-bold text-navy">{progress}%</span>
        </div>
        <ProgressBar value={progress} color="pink" />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-4">
        {categories.map(c => (
          <button
            key={c.value}
            onClick={() => setActiveFilter(c.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === c.value
                ? 'text-white'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-blush hover:text-navy'
            }`}
            style={activeFilter === c.value ? { backgroundColor: '#021A54' } : {}}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="font-medium">Tiada tugasan ditemui</p>
          <p className="text-sm mt-1">Tambah tugasan baru atau muat template</p>
        </div>
      ) : (
        <div className="space-y-2 group">
          {filtered.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={t => setEditTask(t)}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Tambah Tugasan Baru">
        <TaskForm onSubmit={handleAdd} onCancel={() => setShowAdd(false)} />
      </Modal>

      <Modal isOpen={!!editTask} onClose={() => setEditTask(null)} title="Edit Tugasan">
        {editTask && (
          <TaskForm initial={editTask} onSubmit={handleEdit} onCancel={() => setEditTask(null)} />
        )}
      </Modal>
    </PageContainer>
  );
}
