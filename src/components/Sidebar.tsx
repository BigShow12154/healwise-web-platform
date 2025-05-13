
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  User, Home, Heart, FileText, Activity, 
  Users, ShoppingCart, Search, Settings
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
  end?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, children }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const isMobile = useIsMobile();

  if (!open && !isMobile) {
    return null;
  }

  if (isMobile) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-200",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      >
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar text-sidebar-foreground shadow-lg transition-transform duration-200",
            open ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <SidebarContent />
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 border-r bg-sidebar text-sidebar-foreground">
      <SidebarContent />
    </div>
  );
};

const SidebarContent: React.FC = () => {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex h-10 items-center justify-center border-b border-sidebar-border pb-4 mb-2">
        <span className="text-lg font-bold text-sidebar-foreground">健康管理平台</span>
      </div>
      <nav className="flex-1 space-y-1">
        <SidebarLink to="/" icon={Home}>主页</SidebarLink>
        <SidebarLink to="/profile" icon={User}>个人信息</SidebarLink>
        <SidebarLink to="/symptoms" icon={Heart}>症状记录</SidebarLink>
        <SidebarLink to="/questionnaire" icon={FileText}>健康问诊</SidebarLink>
        <SidebarLink to="/wearables" icon={Activity}>智能穿戴数据</SidebarLink>
        <SidebarLink to="/family" icon={Users}>家庭管理</SidebarLink>
        <SidebarLink to="/doctors" icon={Search}>寻找医生</SidebarLink>
        <SidebarLink to="/shop" icon={ShoppingCart}>健康商城</SidebarLink>
      </nav>
      <div className="border-t border-sidebar-border pt-2">
        <SidebarLink to="/settings" icon={Settings}>设置</SidebarLink>
      </div>
    </div>
  );
};

export default Sidebar;
