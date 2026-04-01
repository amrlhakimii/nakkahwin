import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { ChecklistPage } from '../features/checklist/ChecklistPage';
import { BudgetPage } from '../features/budget/BudgetPage';
import { GuestPage } from '../features/guests/GuestPage';
import { TimelinePage } from '../features/timeline/TimelinePage';
import { VendorPage } from '../features/vendors/VendorPage';
import { NotesPage } from '../features/notes/NotesPage';
import { InfoHomePage } from '../features/info/InfoHomePage';
import { BorangNikahPage } from '../features/info/BorangNikahPage';
import { KursusNikahPage } from '../features/info/KursusNikahPage';
import { ImamKadiPage } from '../features/info/ImamKadiPage';
import { BudgetGuidePage } from '../features/info/BudgetGuidePage';
import { ChecklistGuidePage } from '../features/info/ChecklistGuidePage';
import { AdatNegeriPage } from '../features/info/AdatNegeriPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/checklist" element={<ChecklistPage />} />
      <Route path="/budget" element={<BudgetPage />} />
      <Route path="/guests" element={<GuestPage />} />
      <Route path="/timeline" element={<TimelinePage />} />
      <Route path="/vendors" element={<VendorPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/info" element={<InfoHomePage />} />
      <Route path="/info/borang-nikah" element={<BorangNikahPage />} />
      <Route path="/info/kursus-nikah" element={<KursusNikahPage />} />
      <Route path="/info/imam-kadi" element={<ImamKadiPage />} />
      <Route path="/info/budget-guide" element={<BudgetGuidePage />} />
      <Route path="/info/checklist-guide" element={<ChecklistGuidePage />} />
      <Route path="/info/adat-negeri" element={<AdatNegeriPage />} />
    </Routes>
  );
}
