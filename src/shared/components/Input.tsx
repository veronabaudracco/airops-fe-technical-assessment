import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/features/workflows/utils/workflows';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full px-3 py-2 border rounded-md text-sm',
          'focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent',
          'transition-colors',
          error ? 'border-red-500' : 'border-gray-300',
          'placeholder:text-gray-400',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
