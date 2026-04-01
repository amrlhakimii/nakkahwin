export type ExpenseCategory = 'venue' | 'catering' | 'outfit' | 'photographer' | 'doorgift' | 'makeup';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}

export interface BudgetState {
  totalBudget: number;
  expenses: Expense[];
}
