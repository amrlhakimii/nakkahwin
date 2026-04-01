import { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { ExpenseItem } from './ExpenseItem';
import { ExpenseForm } from './ExpenseForm';
import { useBudget } from '../../hooks/useBudget';
import { formatCurrency } from '../../utils/formatCurrency';
import type { Expense } from '../../types/expense';

export function BudgetPage() {
  const { budget, setTotalBudget, addExpense, deleteExpense, totalSpent, remaining, spentPercent } = useBudget();
  const [showAdd, setShowAdd] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetInput, setBudgetInput] = useState(budget.totalBudget.toString());

  const handleAddExpense = (data: Omit<Expense, 'id'>) => {
    addExpense(data);
    setShowAdd(false);
  };

  const handleSaveBudget = () => {
    setTotalBudget(Number(budgetInput) || 0);
    setShowBudgetModal(false);
  };

  return (
    <PageContainer
      title="Bajet"
      subtitle="Rekod dan pantau perbelanjaan perkahwinan"
      action={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { setBudgetInput(budget.totalBudget.toString()); setShowBudgetModal(true); }}>
            <Settings size={14} />
            Tetapkan Bajet
          </Button>
          <Button size="sm" onClick={() => setShowAdd(true)}>
            <Plus size={14} />
            Tambah Rekod
          </Button>
        </div>
      }
    >
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs text-gray-500 font-medium">Bajet Keseluruhan</p>
          <p className="text-2xl font-bold text-navy mt-1">{formatCurrency(budget.totalBudget)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs text-gray-500 font-medium">Telah Dibelanjakan</p>
          <p className="text-2xl font-bold mt-1" style={{ color: '#FF85BB' }}>{formatCurrency(totalSpent)}</p>
        </div>
        <div
          className="rounded-2xl border p-5"
          style={{
            backgroundColor: remaining < 0 ? '#FEF2F2' : '#F0FDF4',
            borderColor: remaining < 0 ? '#FECACA' : '#BBF7D0',
          }}
        >
          <p className="text-xs font-medium" style={{ color: remaining < 0 ? '#991B1B' : '#166534' }}>
            {remaining < 0 ? 'Melebihi Bajet' : 'Baki Bajet'}
          </p>
          <p className="text-2xl font-bold mt-1" style={{ color: remaining < 0 ? '#DC2626' : '#16A34A' }}>
            {formatCurrency(Math.abs(remaining))}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-600">Penggunaan Bajet</p>
          <span className="text-sm font-bold text-navy">{spentPercent}%</span>
        </div>
        <ProgressBar value={spentPercent} color={spentPercent > 90 ? 'navy' : 'green'} />
      </div>

      {/* Expense List */}
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Rekod Perbelanjaan ({budget.expenses.length})</h3>
      {budget.expenses.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="font-medium">Tiada rekod perbelanjaan</p>
          <p className="text-sm mt-1">Tambah rekod perbelanjaan pertama anda</p>
        </div>
      ) : (
        <div className="space-y-2">
          {budget.expenses.map(expense => (
            <ExpenseItem key={expense.id} expense={expense} onDelete={deleteExpense} />
          ))}
        </div>
      )}

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Tambah Rekod Perbelanjaan">
        <ExpenseForm onSubmit={handleAddExpense} onCancel={() => setShowAdd(false)} />
      </Modal>

      <Modal isOpen={showBudgetModal} onClose={() => setShowBudgetModal(false)} title="Tetapkan Bajet Keseluruhan" size="sm">
        <div className="space-y-4">
          <Input
            label="Jumlah Bajet (RM)"
            type="number"
            value={budgetInput}
            onChange={e => setBudgetInput(e.target.value)}
            placeholder="cth: 30000"
            autoFocus
            min="0"
          />
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setShowBudgetModal(false)}>Batal</Button>
            <Button onClick={handleSaveBudget}>Simpan</Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
