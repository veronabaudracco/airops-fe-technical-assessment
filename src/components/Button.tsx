import { cn } from "../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center transition-colors disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}
