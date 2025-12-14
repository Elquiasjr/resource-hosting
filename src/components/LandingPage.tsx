import { useNavigate } from 'react-router-dom';
import { Progress } from './Progress';
import { Trees, Play } from 'lucide-react';
import { About } from "./Sobre";

const resources = [
  {
    id: 0,
    title: 'HQ Interativa: Conexões Ecológicas',
    description: 'Explore nossa história ilustrada',
    icon: '🖼️',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 1,
    title: 'Aprendendo com Vídeos',
    description: 'Conteúdos em vídeo',
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
    navigate(`/resource-hosting/trilha/${currentResourceIndex}`);
  };

  const handleStart = () => {
    navigate('/resource-hosting/trilha/0');
  };

  const totalResources = resources.length;
  const isCompleted = completedResources.size === totalResources;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 justify-center">
            <Trees className="w-8 h-8" />
            <h1 className="text-center text-2xl">Guardiões da Floresta</h1>
          </div>
        </div>
      </header>

      {/* Main Layout with Sidebar */}
      <div className="relative">
        {/* Left Sidebar Navigation - Floating */}
        <aside className="hidden lg:block fixed left-4 top-24 w-56 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-6 text-lg">Navegação</h3>
              <nav className="space-y-3">
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="w-full text-left px-4 py-3 text-slate-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                >
                  Sobre o Projeto
                </button>
                <button
                  onClick={() => scrollToSection('progresso')}
                  className="w-full text-left px-4 py-3 text-slate-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                >
                  Seu Progresso
                </button>
                <button
                  onClick={() => scrollToSection('comece')}
                  className="w-full text-left px-4 py-3 text-slate-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                >
                  Comece Agora
                </button>
                <button
                  onClick={() => scrollToSection('conteudos')}
                  className="w-full text-left px-4 py-3 text-slate-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                >
                  Conteúdos da Trilha
                </button>
                <button
                  onClick={() => scrollToSection('equipe')}
                  className="w-full text-left px-4 py-3 text-slate-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                >
                  Nossa Equipe
                </button>
              </nav>
          </div>
        </aside>

        {/* Main Content - Centered */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <main className="space-y-16">
            {/* Sobre Section */}
            <section id="sobre" className="scroll-mt-8">
              <div className="text-center mb-8">
                <div className="text-7xl mb-6">🌳</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                  Sobre o Projeto
                </h2>
                <p className="text-slate-600 text-lg">Bem-vindo ao Projeto Guardiões da Floresta</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-10">
            <p className="text-slate-700 mb-6">
              Você já parou para pensar em como as florestas são importantes para a nossa vida? 
              A <strong>Mata Atlântica</strong>, aqui no Brasil, e a <strong>Floresta de Cantanhez</strong>, 
              na Guiné-Bissau, são dois exemplos incríveis de ambientes ricos em vida, cultura e história. 
              Mesmo estando em continentes diferentes, elas têm algo em comum: ambas abrigam uma grande 
              diversidade de plantas e animais e são fundamentais para o equilíbrio do planeta.
            </p>
            <p className="text-slate-700 mb-6">
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
            </section>

            {/* Progress Section */}
            <section id="progresso" className="scroll-mt-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Seu Progresso
                </h2>
              </div>
              <Progress 
                currentResourceIndex={currentResourceIndex}
                completedResources={completedResources}
                totalResources={totalResources}
                resetProgress={resetProgress}
              />
            </section>

            {/* CTA Section */}
            <section id="comece" className="scroll-mt-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Comece Agora
                </h2>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  {isCompleted ? 'Parabéns! Você completou a trilha!' : 
                   currentResourceIndex > 0 ? 'Continue sua jornada' : 'Comece sua jornada'}
                </h3>
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
            <section id="conteudos" className="scroll-mt-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                  Conteúdos da Trilha
                </h2>
                <p className="text-slate-600 text-lg">
                  Siga a sequência para completar seu aprendizado
                </p>
              </div>
              
              <div className="space-y-5">
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
            <section id="equipe" className="scroll-mt-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Nossa Equipe
                </h2>
              </div>
              <About />
            </section>
          </main>
        </div>
      </div>

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