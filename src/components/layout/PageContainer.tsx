import React from 'react';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function PageContainer({ title, subtitle, action, children }: PageContainerProps) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-page">
      <header className="bg-white border-b border-gray-100 px-8 py-5 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy leading-none">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      </header>
      <main className="flex-1 px-8 py-6">
        {children}
      </main>
    </div>
  );
}
