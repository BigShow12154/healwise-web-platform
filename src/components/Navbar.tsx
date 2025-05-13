
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, User, Bell } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, sidebarOpen }) => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        {!isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        )}
        <span className="text-xl font-semibold text-medical">HealWise</span>
      </div>
      
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-destructive"></span>
          <span className="sr-only">Notifications</span>
        </Button>
        
        <Button variant="outline" size="sm" className="ml-2 gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">登录</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
