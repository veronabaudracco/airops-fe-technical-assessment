import { cn } from '../utils';
import { Sheet, SheetContent } from './Sheet';
import { SidebarContent } from './SidebarContent';

interface SidebarProps {
  className?: string;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}

export const Sidebar = ({ className, mobileOpen = false, onMobileOpenChange }: SidebarProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-60 bg-white border-r border-border-secondary transition-all duration-200',
          'hidden md:block md:w-16 lg:w-60 md:hover:w-60',
          'group',
          className
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent 
          side="left" 
          className="w-60 p-0 bg-white border-r border-border-secondary [&>button]:hidden"
        >
          <SidebarContent isMobile onLinkClick={() => onMobileOpenChange?.(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
};
