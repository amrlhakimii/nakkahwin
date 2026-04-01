import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Wallet,
  Users,
  Calendar,
  Store,
  StickyNote,
  BookOpen,
  Heart,
  X,
} from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/checklist', icon: CheckSquare, label: 'Checklist' },
  { to: '/budget', icon: Wallet, label: 'Bajet' },
  { to: '/guests', icon: Users, label: 'Tetamu' },
  { to: '/timeline', icon: Calendar, label: 'Timeline' },
  { to: '/vendors', icon: Store, label: 'Vendor' },
  { to: '/notes', icon: StickyNote, label: 'Nota' },
  { to: '/info', icon: BookOpen, label: 'Pusat Info' },
];

export function Sidebar() {
  const { isOpen, close } = useSidebar();
  const location = useLocation();

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    close();
  }, [location.pathname]);

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={close}
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-60 min-h-screen flex flex-col flex-shrink-0
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
        style={{ backgroundColor: '#021A54' }}
      >
        {/* Brand */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FF85BB' }}>
                <Heart size={16} fill="white" color="white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-base leading-none">NakKahwin</h1>
                <p className="text-white/40 text-xs mt-0.5">Wedding Planner</p>
              </div>
            </div>
            {/* Close button — mobile only */}
            <button
              className="md:hidden text-white/60 hover:text-white p-1"
              onClick={close}
              aria-label="Tutup menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-navy font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
              style={({ isActive }) =>
                isActive ? { backgroundColor: '#FFCEE3', color: '#021A54' } : {}
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-white/30 text-xs text-center">NakKahwin v1.0</p>
        </div>
      </aside>
    </>
  );
}
