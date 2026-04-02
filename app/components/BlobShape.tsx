import { cn } from '@/app/lib/utils';

interface BlobShapeProps {
  color?: 'pink' | 'mint' | 'gold';
  className?: string;
  opacity?: number;
}

export default function BlobShape({
  color = 'pink',
  className = '',
  opacity = 30,
}: BlobShapeProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full', className)}
      style={{ opacity }}
    >
      <path
        fill={color === 'pink' ? '#FFB6C1' : color === 'mint' ? '#98D8C8' : '#FFD700'}
        d="M47.5,-62.3C59.9,-52.8,67.3,-36.3,71.4,-19.1C75.5,-1.9,76.3,16,68.8,29.5C61.3,43,45.5,52.1,29.3,57.5C13.1,62.9,-3.5,64.6,-19.5,61.1C-35.5,57.6,-50.9,48.9,-61.8,36.2C-72.7,23.5,-79.1,6.8,-76.8,-8.3C-74.5,-23.4,-63.5,-36.9,-49.6,-46.2C-35.7,-55.5,-18.9,-60.6,-1.3,-59.7C16.3,-58.8,35.1,-71.8,47.5,-62.3Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
