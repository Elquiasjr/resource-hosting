import { useNavigate } from 'react-router-dom';
import { Progress } from './Progress';
import { Trees, Play } from 'lucide-react';
import { About } from "./Sobre";

const resources = [
  {
    id: 0,
    title: 'Conhecendo as Florestas',
    description: 'Galeria de imagens das florestas',
    icon: '🖼️',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 1,
    title: 'Aprendendo com Vídeos e Áudios',
    description: 'Conteúdos em vídeo e áudio',
    icon: '🎬',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 2,
    title: 'Quiz dos Guardiões',
    description: 'Teste seus conhecimentos',
    icon: '🎯',
    color: 'from-orange-500 to-amber-600'
  }
];

interface LandingPageProps {
  currentResourceIndex: number;
  completedResources: Set<number>;
  resetProgress: () => void;
}

export default function LandingPage({ currentResourceIndex, completedResources, resetProgress }: LandingPageProps) {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(`/trilha/${currentResourceIndex}`);
  };

  const handleStart = () => {
    navigate('/trilha/0');
  };

  const totalResources = resources.length;
  const isCompleted = completedResources.size === totalResources;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 justify-center">
            <Trees className="w-10 h-10" />
            <h1 className="text-center">Guardiões da Floresta</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-8xl mb-6">🌳</div>
          <h2 className="text-slate-900 mb-4">
            Bem-vindo ao Projeto Guardiões da Floresta
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-left">
            <p className="text-slate-700 mb-4">
              Você já parou para pensar em como as florestas são importantes para a nossa vida? 
              A <strong>Mata Atlântica</strong>, aqui no Brasil, e a <strong>Floresta de Cantanhez</strong>, 
              na Guiné-Bissau, são dois exemplos incríveis de ambientes ricos em vida, cultura e história. 
              Mesmo estando em continentes diferentes, elas têm algo em comum: ambas abrigam uma grande 
              diversidade de plantas e animais e são fundamentais para o equilíbrio do planeta.
            </p>
            <p className="text-slate-700 mb-4">
              Estudar essas florestas nos ajuda a entender como os seres vivos se relacionam entre si 
              e com o ambiente, além de mostrar como as ações humanas podem proteger ou prejudicar a natureza. 
              É aqui que entra o enfoque <strong>CTS — Ciência, Tecnologia e Sociedade</strong>. Ele nos ajuda 
              a perceber que as decisões que tomamos, como o uso dos recursos naturais e a criação de tecnologias, 
              têm impacto direto na vida das pessoas e na saúde do meio ambiente.
            </p>
            <p className="text-slate-700">
              Nosso objetivo é explorar essas conexões e mostrar como cada um de nós pode fazer a diferença. 
              Vamos descobrir juntos curiosidades, desafios e soluções para conservar essas florestas tão importantes!
            </p>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Progress 
          currentResourceIndex={currentResourceIndex}
          completedResources={completedResources}
          totalResources={totalResources}
          resetProgress={resetProgress}
        />
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-slate-900 mb-4">
            {isCompleted ? 'Parabéns! Você completou a trilha!' : 
             currentResourceIndex > 0 ? 'Continue sua jornada' : 'Comece sua jornada'}
          </h2>
          <p className="text-slate-600 mb-8 text-lg">
            {isCompleted ? 'Você pode revisar o conteúdo ou começar novamente.' :
             currentResourceIndex > 0 ? 'Continue de onde parou e complete sua trilha de aprendizado.' :
             'Clique no botão abaixo para iniciar a trilha de aprendizado.'}
          </p>
          
          {isCompleted ? (
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg inline-flex items-center gap-2"
              >
                <Play className="w-6 h-6" />
                Revisar Conteúdo
              </button>
            </div>
          ) : currentResourceIndex > 0 ? (
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-xl hover:opacity-90 transition-opacity text-xl inline-flex items-center gap-3"
            >
              <Play className="w-7 h-7" />
              Continuar Trilha
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-xl hover:opacity-90 transition-opacity text-xl inline-flex items-center gap-3"
            >
              <Play className="w-7 h-7" />
              Iniciar Trilha
            </button>
          )}
        </div>
      </section>

      {/* Trail Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-slate-900 mb-3">
            Conteúdos da Trilha
          </h2>
          <p className="text-slate-600 text-lg">
            Siga a sequência para completar seu aprendizado
          </p>
        </div>
        
        <div className="space-y-4">
          {resources.map((resource, index) => {
            const isCompleted = completedResources.has(index);
            const isCurrent = currentResourceIndex === index;
            const isLocked = index > currentResourceIndex && !isCompleted;

            return (
              <div
                key={resource.id}
                className={`bg-white rounded-xl shadow-md p-6 flex items-center gap-6 ${
                  isLocked ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`text-5xl ${isLocked ? 'grayscale' : ''}`}>
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-slate-900">{resource.title}</h3>
                      {isCompleted && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          ✓ Concluído
                        </span>
                      )}
                      {isCurrent && !isCompleted && (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          Disponível
                        </span>
                      )}
                      {isLocked && (
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">
                          🔒 Bloqueado
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600">{resource.description}</p>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${resource.color} flex items-center justify-center text-white text-xl`}>
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <About />
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-green-100">
            © 2025 Guardiões da Floresta - Preservando nosso futuro
          </p>
        </div>
      </footer>
    </div>
  );
}