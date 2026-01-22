import { useState, ReactNode, cloneElement, isValidElement, ReactElement } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(true);
  };

  // Clone children to inject onMobileMenuToggle prop
  const childrenWithProps = isValidElement(children)
  ? cloneElement(children as ReactElement<{ onMobileMenuToggle?: () => void }>, { 
      onMobileMenuToggle: handleMobileMenuToggle 
    })
  : children;

  return (
    <div className="min-h-screen bg-white">
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        onMobileOpenChange={setMobileMenuOpen} 
      />
      
      <div className="md:pl-16 lg:pl-60">{childrenWithProps}</div>
    </div>
  );
};
