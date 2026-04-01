export type TaskCategory = 'legal' | 'event' | 'outfit' | 'finance' | 'family' | 'honeymoon';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  completed: boolean;
  dueDate?: string;
}
