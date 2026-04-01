import { useLocalStorage } from './useLocalStorage';
import type { Expense, BudgetState } from '../types/expense';

const defaultBudget: BudgetState = { totalBudget: 0, expenses: [] };

export function useBudget() {
  const [budget, setBudget] = useLocalStorage<BudgetState>('nakkahwin_budget', defaultBudget);

  const setTotalBudget = (amount: number) => {
    setBudget(prev => ({ ...prev, totalBudget: amount }));
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = { ...expense, id: Date.now().toString() };
    setBudget(prev => ({ ...prev, expenses: [...prev.expenses, newExpense] }));
  };

  const deleteExpense = (id: string) => {
    setBudget(prev => ({ ...prev, expenses: prev.expenses.filter(e => e.id !== id) }));
  };

  const totalSpent = budget.expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget.totalBudget - totalSpent;
  const spentPercent = budget.totalBudget > 0 ? Math.round((totalSpent / budget.totalBudget) * 100) : 0;

  return { budget, setTotalBudget, addExpense, deleteExpense, totalSpent, remaining, spentPercent };
}
