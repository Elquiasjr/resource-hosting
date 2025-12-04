import { CheckCircle, Circle } from 'lucide-react';

interface VistoIndicatorProps {
  isViewed: boolean;
  size?: 'small' | 'medium';
}

export function VistoIndicator({ isViewed, size = 'small' }: VistoIndicatorProps) {
  const sizeClasses = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';
  
  return (
    <div 
      className={`flex items-center gap-1 px-2 py-1 rounded-full border transition-all ${
        isViewed 
          ? 'bg-green-100 text-green-700 border-green-200' 
          : 'bg-slate-100 text-slate-400 border-slate-200'
      }`}
      title={isViewed ? 'Conteúdo visualizado' : 'Conteúdo não visualizado'}
    >
      {isViewed ? (
        <CheckCircle className={sizeClasses} />
      ) : (
        <Circle className={sizeClasses} />
      )}
      <span className="text-xs">Visto</span>
    </div>
  );
}
