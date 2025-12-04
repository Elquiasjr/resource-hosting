import { Video, Gamepad2, Presentation } from 'lucide-react';
import { VistoIndicator } from './VistoIndicator';
import type { Resource } from '../App';

interface ResourceCardProps {
  resource: Resource;
  onClick: () => void;
  isViewed?: boolean;
  expanded?: boolean;
}

export function ResourceCard({ resource, onClick, isViewed = false, expanded = false }: ResourceCardProps) {
  const getIcon = () => {
    const iconSize = expanded ? 'w-10 h-10' : 'w-6 h-6';
    switch (resource.type) {
      case 'video':
        return <Video className={iconSize} />;
      case 'game':
        return <Gamepad2 className={iconSize} />;
      case 'slideshow':
        return <Presentation className={iconSize} />;
    }
  };

  const getTypeColor = () => {
    switch (resource.type) {
      case 'video':
        return { bg: '#81a4cd', text: '#ffffff', border: '#81a4cd' };
      case 'game':
        return { bg: '#937666', text: '#ffffff', border: '#937666' };
      case 'slideshow':
        return { bg: '#320a28', text: '#ffffff', border: '#320a28' };
    }
  };

  const getGradient = () => {
    switch (resource.type) {
      case 'video':
        return 'linear-gradient(to bottom right, #dbe4ee, #c5d1df)';
      case 'game':
        return 'linear-gradient(to bottom right, #e8ddd8, #d5c4bd)';
      case 'slideshow':
        return 'linear-gradient(to bottom right, #9d8a91, #6b5460)';
    }
  };

  const typeColors = getTypeColor();
  
  return (
    <button
      onClick={onClick}
      className="group relative bg-white border-2 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 text-left w-full hover:scale-105"
      style={{ borderColor: 'rgba(7, 9, 15, 0.15)' }}
    >
      <div className={`${expanded ? 'h-64' : 'h-40'} flex items-center justify-center`} style={{ background: getGradient() }}>
        <div className="group-hover:scale-110 transition-transform" style={{ color: '#07090f', opacity: 0.4 }}>
          {getIcon()}
        </div>
      </div>
      
      <div className={`${expanded ? 'p-6' : 'p-4'}`}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span 
            className="text-xs px-2 py-1 rounded-full border capitalize"
            style={{ 
              backgroundColor: typeColors.bg,
              color: typeColors.text,
              borderColor: typeColors.border
            }}
          >
            {resource.type}
          </span>
          <VistoIndicator isViewed={isViewed} size="small" />
        </div>
        
        <h3 className="mb-2 transition-colors" style={{ color: '#07090f' }}>
          {resource.title}
        </h3>
        
        <p className="text-sm line-clamp-2" style={{ color: '#07090f', opacity: 0.7 }}>
          {resource.description}
        </p>
      </div>

      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs" style={{ color: '#81a4cd' }}>Ver →</span>
      </div>
    </button>
  );
}
