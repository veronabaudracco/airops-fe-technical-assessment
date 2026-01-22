import { Database, Activity, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

const menuItems = [
  { name: 'Data Name', icon: Database, active: true, href: '#' },
  { name: 'Monitoring', icon: Activity, active: false, href: '#' },
  { name: 'Settings', icon: Settings, active: false, href: '#' },
];

interface SidebarContentProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export const SidebarContent = ({ isMobile = false, onLinkClick }: SidebarContentProps) => {
  return (
    <div className="flex h-full flex-col">
      {/* Top Section with Workspace */}
      <div className={cn(
        "flex flex-col items-center gap-2 overflow-hidden",
        isMobile ? "p-4 border-b border-border-secondary" : "p-2 h-[92px]"
      )}>
        {/* Workspace */}
        <div className="flex items-center gap-2 w-full px-2 min-w-0">
          {/* Logo */}
          <div className="flex items-center justify-center w-9 h-9 rounded-md bg-brand-purple flex-shrink-0" />
          {/* Workspace Name */}
          <div className={cn(
            "flex flex-col justify-center min-w-0",
            isMobile ? "flex" : "md:hidden lg:flex md:group-hover:flex"
          )}>
            <span className="font-semibold text-sm text-system-black whitespace-nowrap">
              AirOps
            </span>
          </div>
        </div>

        {/* New Button */}
        {!isMobile && (
          <button className="flex items-center justify-center gap-1.5 w-full h-8 px-3 py-1.5 bg-white border border-system-black-8 shadow-xs rounded-md md:hidden lg:flex md:group-hover:flex">
            <span className="font-semibold text-xs text-system-black whitespace-nowrap">
              New
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="w-3 h-3 flex-shrink-0">
              <path d="M6 2.5V9.5M2.5 6H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className={cn(
        "flex flex-col py-2 overflow-hidden",
        isMobile ? "flex-1 px-2" : "items-end pb-2"
      )}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-2 w-full h-8 rounded-md transition-colors',
                item.active
                  ? 'px-2 py-2 bg-white shadow-xs'
                  : 'px-2 py-1.5'
              )}
              title={item.name}
              onClick={onLinkClick}
            >
              <Icon className={cn(
                'w-3 h-3 flex-shrink-0',
                item.active ? 'text-system-grey-500' : 'text-text-muted'
              )} />
              {/* Label */}
              <span className={cn(
                "font-medium text-nav text-text-secondary whitespace-nowrap",
                isMobile ? "flex-1" : "flex-1 md:hidden lg:block md:group-hover:block"
              )}>
                {item.name}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};
