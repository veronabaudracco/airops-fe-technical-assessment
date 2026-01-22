import { cn } from '../utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn('bg-gray-200 rounded animate-pulse', className)} />
);
