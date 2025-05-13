
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  return (
    <div className="flex h-full min-h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
