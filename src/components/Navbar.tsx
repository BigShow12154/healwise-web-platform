
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, User, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  sidebarOpen
}) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="mr-2"
          aria-label={sidebarOpen ? "关闭侧边栏" : "打开侧边栏"}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/dashboard" className="text-xl font-semibold text-medical">译脉中医</Link>
      </div>
      
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-destructive"></span>
          <span className="sr-only">通知</span>
        </Button>
        
        <Button 
          variant="outline" 
          size={isMobile ? "icon" : "sm"} 
          className="ml-2" 
          asChild
        >
          <Link to="/login">
            <User className="h-4 w-4" />
            {!isMobile && <span className="ml-2">登录</span>}
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
