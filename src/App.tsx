import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className="flex w-full min-h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 min-w-0 overflow-auto">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
