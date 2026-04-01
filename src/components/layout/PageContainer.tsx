import React from 'react';
import { Menu } from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function PageContainer({ title, subtitle, action, children }: PageContainerProps) {
  const { toggle } = useSidebar();

  return (
    <div className="flex flex-col min-h-screen w-full bg-page">
      <header className="bg-white border-b border-gray-100 px-4 py-4 md:px-8 md:py-5 sticky top-0 z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="md:hidden flex-shrink-0 text-navy p-1 rounded-lg hover:bg-gray-100"
              onClick={toggle}
              aria-label="Buka menu"
            >
              <Menu size={22} />
            </button>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-navy leading-none">{title}</h2>
              {subtitle && <p className="text-sm text-gray-500 mt-1 truncate">{subtitle}</p>}
            </div>
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      </header>
      <main className="flex-1 px-4 py-4 md:px-8 md:py-6">
        {children}
      </main>
    </div>
  );
}
