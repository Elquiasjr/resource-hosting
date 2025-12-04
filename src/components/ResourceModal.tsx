import { X, Video, Gamepad2, Presentation, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import type { Resource } from '../App';

interface ResourceModalProps {
  resource: Resource | null;
  onClose: () => void;
}

export function ResourceModal({ resource, onClose }: ResourceModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (resource) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [resource, onClose]);

  if (!resource) return null;

  const getIcon = () => {
    switch (resource.type) {
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'game':
        return <Gamepad2 className="w-5 h-5" />;
      case 'slideshow':
        return <Presentation className="w-5 h-5" />;
    }
  };

  const renderContent = () => {
    switch (resource.type) {
      case 'video':
        return (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={resource.url}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      case 'game':
        // Verificar se é um URL válido para iframe ou apenas placeholder
        if (resource.url && resource.url !== '#') {
          return (
            <div className="bg-black rounded-lg overflow-hidden flex items-center justify-center" style={{ height: '500px' }}>
              <iframe
                src={resource.url}
                className="w-full h-full"
                allowTransparency={true}
                frameBorder="0"
                scrolling="no"
                allowFullScreen
              />
            </div>
          );
        }
        return (
          <div className="aspect-video bg-slate-100 rounded-lg flex flex-col items-center justify-center p-8">
            <Gamepad2 className="w-16 h-16 text-slate-400 mb-4" />
            <p className="text-slate-600 text-center mb-4">
              O conteúdo do jogo será incorporado aqui
            </p>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Abrir Jogo
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        );
      case 'slideshow':
        return (
          <div className="aspect-video bg-slate-100 rounded-lg flex flex-col items-center justify-center p-8">
            <Presentation className="w-16 h-16 text-slate-400 mb-4" />
            <p className="text-slate-600 text-center mb-4">
              A apresentação de slides será incorporada aqui
            </p>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Abrir Apresentação
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="text-blue-600">
              {getIcon()}
            </div>
            <div>
              <h2>{resource.title}</h2>
              <p className="text-slate-600 text-sm capitalize">{resource.type}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {renderContent()}
          
          <div className="mt-6">
            <h3 className="mb-2">Descrição</h3>
            <p className="text-slate-600">
              {resource.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
