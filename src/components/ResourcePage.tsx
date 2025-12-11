import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { Book } from './Book';

const resourcesData = [
  {
    id: 0,
    title: 'Conhecendo as Florestas',
    icon: '🖼️',
    color: 'from-green-500 to-emerald-600',
    type: 'hq',
    description: 'Galeria de imagens das florestas',
    fullDescription: 'Explore as belezas da Mata Atlântica e da Floresta de Cantanhez através desta galeria de imagens.',
    content: {
      type: 'hq',
      images: [
        '/resource-hosting/images/page_1.jpg',  // Changed: Use public folder paths
        '/resource-hosting/images/page_2.jpg',
        '/resource-hosting/images/page_3.jpg',
        '/resource-hosting/images/page_4.jpg',
        '/resource-hosting/images/page_5.jpg',
        '/resource-hosting/images/page_6.jpg',
        '/resource-hosting/images/page_7.jpg',
        '/resource-hosting/images/page_8.jpg',
        '/resource-hosting/images/page_9.jpg'
      ]
    }
  },
  {
    id: 1,
    title: 'Aprendendo com Vídeos e Áudios',
    icon: '🎬',
    color: 'from-blue-500 to-cyan-600',
    type: 'media',
    description: 'Conteúdos em vídeo e áudio',
    fullDescription: 'Assista ao vídeo e ouça os áudios para aprender mais sobre as florestas.',
    content: {
      type: 'media',
      videoUrl: 'https://www.youtube.com/embed/278IRQ6HSi4',
      audioPlayers: 3
    }
  },
  {
    id: 2,
    title: 'Quiz dos Guardiões',
    icon: '🎯',
    color: 'from-orange-500 to-amber-600',
    type: 'quiz',
    description: 'Teste seus conhecimentos',
    fullDescription: 'Responda às perguntas e descubra o quanto você sabe sobre a preservação das florestas!',
    content: {
      type: 'quiz',
      embedUrl: 'https://wordwall.net/pt/embed/b907b90b125445958294f6cc101d489e?themeId=1&templateId=5&fontStackId=0'
    }
  }
];

interface ResourceHostingPageProps {
    currentResourceIndex: number;
    setCurrentResource: (index: number) => void;
    markAsCompleted: (index: number) => void;
    completedResources: Set<number>;
}

export default function ResourcePage({ currentResourceIndex, setCurrentResource, markAsCompleted }: ResourceHostingPageProps) {
    const { id } = useParams<{ id: string}>();
    const navigate = useNavigate();

    const resourceId = id ? parseInt(id, 10) : 0;
    const resource = resourcesData[resourceId];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if (resourceId !== currentResourceIndex && resourceId <= currentResourceIndex) {
            setCurrentResource(resourceId);
        }
    }, [resourceId, currentResourceIndex, setCurrentResource]);

    const handlePrevious = () => {
        if (resourceId > 0) {
            navigate(`/resource-hosting/trilha/${resourceId - 1}`);
        }
    };

    const handleNext = () => {
        // Mark current as completed when moving to next
        markAsCompleted(resourceId);
        if (resourceId < resourcesData.length - 1) {
            setCurrentResource(resourceId + 1);
            navigate(`/resource-hosting/trilha/${resourceId + 1}`);
        } else {
            navigate('/resource-hosting/');
        }
    };

    const handleHome = () => {
        navigate('/resource-hosting/');
    };

    if (!resource) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-slate-900 mb-4">Recurso não encontrado</h2>
                    <button
                        onClick={handleHome}
                        className="text-green-600 hover:text-green-700"
                    >
                        Voltar para a página inicial
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
            { /* Resource Header */ }
            <header className="bg-white shadow-sm sticky top-0 z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <button
                        onClick={handleHome}
                        className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        <span>Página Inicial</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600">
                            Etapa {resourceId + 1} de {resourcesData.length}
                        </span>
                    </div>
                </div>
            </header>

            { /* Resource Section */ }
            <div className={`bg-gradient-to-r ${resource.color} py-12`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-white">
                        <div className="text-8xl mb-4">{resource.icon}</div>
                        <h1 className="mb-3">{resource.title}</h1>
                        <p className="text-xl max-w-2xl mx-auto opacity-95">
                        {resource.fullDescription}
                        </p>
                    </div>
                </div>
            </div>

            {/* Book Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {resource.content.type === 'hq' && resource.content.images && (
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Galeria de Imagens</h2>
                        <p className="text-slate-600 text-center mb-8">
                            Clique nas bordas das páginas ou use os botões para navegar
                        </p>
                        <div className="flex justify-center items-center">
                            <Book pages={resource.content.images} />
                        </div>
                    </div>
                )}
            </div>

           {/* Media (Video + Audio) */}
            {resource.content.type === 'media' && (
                <div className="space-y-8">
                    {/* Video Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-slate-900 mb-6 text-center">Vídeo Educativo</h2>
                        <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 border-4 border-slate-200">
                            <iframe
                            src={resource.content.videoUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Vídeo Educativo"
                            />
                        </div>
                    </div>

                    {/* Audio Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-slate-900 mb-6 text-center">Áudios Complementares</h2>
                        <div className="space-y-6">
                            {Array.from({ length: resource.content.audioPlayers || 0 }, (_, index) => (
                            <div key={index} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                                <h3 className="text-slate-800 mb-4">Áudio {index + 1}</h3>
                                <div className="bg-white rounded-lg p-4 border-2 border-dashed border-slate-300 text-center text-slate-500">
                                    <p className="mb-2">🎵 Espaço reservado para o player de áudio {index + 1}</p>
                                    <p className="text-sm">O grupo deverá adicionar o player de áudio aqui</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Quiz */}
            {resource.content.type === 'quiz' && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-slate-900 mb-4">Teste Seus Conhecimentos</h2>
                    <p className="text-slate-600">
                        Complete o quiz abaixo para testar o que você aprendeu sobre a preservação das florestas!
                    </p>
                </div>

                <div className="w-full">
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '635px' }}>
                        <iframe 
                        src={resource.content.embedUrl} 
                        title="Quiz dos Guardiões" 
                        style={{ flex: 1, borderRadius: '12px' }} 
                        frameBorder="0" 
                        allowFullScreen
                        />
                    </div>
                </div>
            </div>
            )}

            {/* Navigation Buttons */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center justify-between gap-4">
                        <button
                        onClick={handlePrevious}
                        disabled={resourceId === 0}
                        className={`flex items-center gap-2 px-8 py-4 rounded-xl transition-all text-lg ${
                            resourceId === 0
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                        >
                        <ArrowLeft className="w-5 h-5" />
                        Etapa Anterior
                        </button>

                        <button
                        onClick={handleNext}
                        className={`flex items-center gap-2 px-8 py-4 rounded-xl transition-all text-lg ${
                            resourceId === resourcesData.length - 1
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90'
                            : `bg-gradient-to-r ${resource.color} text-white hover:opacity-90`
                        }`}
                        >
                        {resourceId === resourcesData.length - 1 ? 'Finalizar Trilha' : 'Próxima Etapa'}
                        <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};