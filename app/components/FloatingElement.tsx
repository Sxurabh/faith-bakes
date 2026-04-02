import { cn } from '@/app/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: 'none' | 'small' | 'medium' | 'large';
  size?: 'sm' | 'md' | 'lg';
}

const delayClasses = {
  none: '',
  small: 'animate-float',
  medium: 'animate-float-delayed',
  large: 'animate-float-slow',
};

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-20 h-20',
  lg: 'w-32 h-32',
};

export default function FloatingElement({
  children,
  className = '',
  delay = 'small',
  size = 'md',
}: FloatingElementProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        delayClasses[delay],
        sizeClasses[size],
        className
      )}
      style={{ animationDelay: delay === 'medium' ? '2s' : delay === 'large' ? '1s' : '0s' }}
    >
      {children}
    </div>
  );
}
