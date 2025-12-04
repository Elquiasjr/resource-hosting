import { BookOpen, Users, Layers, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onBackToHome?: () => void;
  showBackButton?: boolean;
}

export function Header({ onBackToHome, showBackButton = false }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10" style={{ borderColor: 'rgba(7, 9, 15, 0.15)' }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBackButton && onBackToHome && (
              <button
                onClick={onBackToHome}
                className="transition-colors p-2 rounded-lg"
                style={{ color: '#07090f' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#dbe4ee';
                  e.currentTarget.style.color = '#81a4cd';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#07090f';
                }}
                aria-label="Voltar para página inicial"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="text-white p-2 rounded-lg" style={{ backgroundColor: '#81a4cd' }}>
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 style={{ color: '#81a4cd' }}>Central de Conteúdos</h2>
              <p className="text-sm" style={{ color: '#07090f', opacity: 0.6 }}>Multimídia E Recursos Educativos Digitais</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="transition-colors flex items-center gap-2" style={{ color: '#07090f' }}
               onMouseEnter={(e) => e.currentTarget.style.color = '#81a4cd'}
               onMouseLeave={(e) => e.currentTarget.style.color = '#07090f'}>
              <BookOpen className="w-4 h-4" />
              Sobre
            </a>
            <a href="#groups" className="transition-colors flex items-center gap-2" style={{ color: '#07090f' }}
               onMouseEnter={(e) => e.currentTarget.style.color = '#81a4cd'}
               onMouseLeave={(e) => e.currentTarget.style.color = '#07090f'}>
              <Users className="w-4 h-4" />
              Grupos
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
