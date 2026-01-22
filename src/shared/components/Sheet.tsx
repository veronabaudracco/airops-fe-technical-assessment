import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cn } from "../utils"

const Sheet = SheetPrimitive.Root

interface SheetContentProps {
  side?: 'left' | 'right'
  className?: string
  children: React.ReactNode
}

const SheetContent = ({ side = "left", className, children }: SheetContentProps) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
    <SheetPrimitive.Content
      className={cn(
        "fixed z-50 bg-white shadow-lg",
        side === "left" 
          ? "inset-y-0 left-0 h-full w-3/4 border-r data-[state=open]:animate-slide-in-from-left data-[state=closed]:animate-slide-out-to-left sm:max-w-sm"
          : "inset-y-0 right-0 h-full w-3/4 border-l data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right sm:max-w-sm",
        className
      )}
    >
      <SheetPrimitive.Title className="sr-only">Menu</SheetPrimitive.Title>
      {children}
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
)

export { Sheet, SheetContent }
