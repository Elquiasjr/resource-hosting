import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Home, Lock } from 'lucide-react';
import { Book } from './Book';

const resourcesData = [
  {
    id: 0,
    title: 'HQ Interativa: Conexões Ecológicas',
    color: 'from-green-500 to-emerald-600',
    type: 'hq',
    description: 'Galeria de imagens das florestas',
    fullDescription: 'Explore nossa história ilustrada sobre a importância da preservação ambiental. Veja como a ciência, a tecnologia e a sociedade (CTS) trabalham juntas para proteger a biodiversidade na Mata Atlântica e na Floresta de Cantanhez.',
    content: {
      type: 'hq',
      images: [
        '/resource-hosting/images/page_1.jpg',
        '/resource-hosting/images/page_2.jpg',
        '/resource-hosting/images/page_3.jpg',
        '/resource-hosting/images/page_4.jpg',
        '/resource-hosting/images/page_5.jpg',
        '/resource-hosting/images/page_6.jpg',
        '/resource-hosting/images/page_7.jpg',
        '/resource-hosting/images/page_8.jpg',
        '/resource-hosting/images/page_9.jpg'
      ],
      audioPages: [
        { pageIndex: 0, audioSrc: '/resource-hosting/audios/audio1.mp3', title: 'Áudio da Página 1'},
        { pageIndex: 1, audioSrc: '/resource-hosting/audios/audio2.mp3', title: 'Áudio da Página 2'},
        { pageIndex: 2, audioSrc: '/resource-hosting/audios/audio3.mp3', title: 'Áudio da Página 3'},
        { pageIndex: 3, audioSrc: '/resource-hosting/audios/audio4.mp3', title: 'Áudio da Página 4'},
        { pageIndex: 4, audioSrc: '/resource-hosting/audios/audio5.mp3', title: 'Áudio da Página 5'},
        { pageIndex: 5, audioSrc: '/resource-hosting/audios/audio6.mp3', title: 'Áudio da Página 6'},
        { pageIndex: 6, audioSrc: '/resource-hosting/audios/audio7.mp3', title: 'Áudio da Página 7'},
        { pageIndex: 7, audioSrc: '/resource-hosting/audios/audio8.mp3', title: 'Áudio da Página 8'},
        { pageIndex: 8, audioSrc: '/resource-hosting/audios/audio9.mp3', title: 'Áudio da Página 9'}
      ]
    }
  },
  {
    id: 1,
    title: 'Aprendendo com Vídeos',
    color: 'from-blue-500 to-cyan-600',
    type: 'media',
    description: 'Conteúdos em vídeo',
    fullDescription: 'Assista aos vídeos para aprender mais sobre as florestas.',
    content: {
        type: 'media',
        videos: [
          { url: '/resource-hosting/videos/video1.mp4', title: 'Cantanhez: Uma Biblioteca Viva da Natureza' },
          { url: '/resource-hosting/videos/video2.mp4', title: 'Florestas Conectadas: Desafios e Soluções Globais' }
        ],
        audioPlayers: 3
    }
  },
  {
    id: 2,
    title: 'Hora do Desafio!',
    color: 'from-orange-500 to-amber-600',
    type: 'quiz',
    description: 'Teste seus conhecimentos',
    fullDescription: 'Queridos desbravadores, preparem-se para embarcar em um desafio divertido e educativo!',
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
    const [canProceed, setCanProceed] = useState(false);

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

    useEffect(() => {
        if (resource?.content.type !== 'hq') {
            setCanProceed(true);
        } else {
            setCanProceed(false);
        }
    }, [resourceId, resource]);

    const handleLastPageReached = () => {
        setCanProceed(true);
    };

    const handlePrevious = () => {
        if (resourceId > 0) {
            navigate(`/trilha/${resourceId - 1}`);
        }
    };

    const handleNext = () => {
        if (!canProceed && resource?.content.type === 'hq') {
            return;
        }
        markAsCompleted(resourceId);
        if (resourceId < resourcesData.length - 1) {
            setCurrentResource(resourceId + 1);
            navigate(`/trilha/${resourceId + 1}`);
        } else {
            navigate('/');
        }
    };

    const handleHome = () => {
        navigate('/');
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
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-all shadow-sm hover:shadow-md font-medium border border-slate-300"
                        aria-label="Voltar para a página inicial"
                    >
                        <Home className="w-5 h-5" />
                        <span>Página Inicial</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 font-medium">
                            Etapa {resourceId + 1} de {resourcesData.length}
                        </span>
                    </div>
                </div>
            </header>

            { /* Resource Section */ }
            <div className={`bg-gradient-to-r ${resource.color} py-6`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-white">
                        <h1 className="mb-2">{resource.title}</h1>
                        <p className="text-lg max-w-5xl mx-auto opacity-95">
                        {resource.fullDescription}
                        </p>
                    </div>
                </div>
            </div>

            {/* Book Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {resource.content.type === 'hq' && resource.content.images && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-2">
                        <p className="text-black font-bold text-2xl text-center mb-4">
                            Clique nas bordas das páginas ou use os botões para navegar
                        </p>
                        {!canProceed && (
                            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-6 text-center">
                                <p className="text-blue-800 font-medium">
                                    📖 Você precisa ler todas as páginas antes de continuar para a próxima etapa
                                </p>
                            </div>
                        )}
                        <div className="flex justify-center items-center">
                            <Book 
                                pages={resource.content.images}
                                audioPages={resource.content.audioPages}
                                onLastPageReached={handleLastPageReached}
                            />
                        </div>
                    </div>
                )}

               {/* Media (Video + Audio) */}
                {resource.content.type === 'media' && (
                    <div className="space-y-8 mb-4">
                        {/* Videos Section */}
                        {resource.content.videos && resource.content.videos.map((video, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">{video.title}</h2>
                                <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 border-4 border-slate-200 shadow-inner relative">
                                    {video.url.includes('youtube.com') || video.url.includes('youtu.be') ? (
                                        // YouTube Embed
                                        <iframe
                                            src={video.url}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={video.title}
                                        />
                                    ) : (
                                        // Local Video Player
                                        <video 
                                            className="w-full h-full object-cover"
                                            controls
                                            playsInline
                                            preload="metadata"
                                        >
                                            <source src={video.url} type="video/mp4" />
                                            Seu navegador não suporta a tag de vídeo.
                                        </video>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Quiz */}
                {resource.content.type === 'quiz' && (
                    <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6 relative overflow-hidden mb-1">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-amber-500" />
                        
                        <div className="text-center mb-3 relative z-10">
                            <p className="text-slate-600 text-sm md:text-base text-justify indent-6 max-w-6xl mx-auto mb-1">
                                Iremos utilizar a ferramenta Wordwall para um quiz interativo que explorará as riquezas e os perigos que rondam dois biomas essenciais: 
                                a nossa brasileira Mata Atlântica e a africana Floresta de Cantanhez, na Guiné-Bissau. 
                            </p>
                            <p className="text-slate-600 text-sm md:text-base text-justify indent-6 max-w-6xl mx-auto">
                                O quiz apresentará perguntas de múltipla escolha, abrangendo o assunto presente na História em Quadrinhos e no Vídeo,  
                                o objetivo é que, ao competir e aprender sobre a interconexão da vida nesses ecossistemas, 
                                vocês compreendam a importância de ações locais e globais para proteger esses lugares cheios de vida.
                            </p>
                        </div>

                        <div className="w-full max-w-6xl mx-auto">
                            {/* Game Frame */}
                            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-slate-900 border-4 border-slate-800">
                                <div className="relative w-full aspect-video bg-slate-100">
                                    <iframe 
                                        src={resource.content.embedUrl} 
                                        title="Quiz dos Guardiões" 
                                        className="absolute top-0 left-0 w-full h-full"
                                        frameBorder="0" 
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-3 text-center">
                                <p className="text-xs text-slate-500">
                                    O jogo não carregou? {' '}
                                    <a 
                                        href={resource.content.embedUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-orange-600 font-medium hover:text-orange-700 underline"
                                    >
                                        Abrir em nova janela
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-2">
                <div className="bg-white rounded-2xl shadow-lg p-4">
                    <div className="flex items-center justify-between gap-4">
                        <button
                            onClick={handlePrevious}
                            disabled={resourceId === 0}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all text-base ${
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
                            disabled={!canProceed && resource.content.type === 'hq'}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all text-base ${
                                !canProceed && resource.content.type === 'hq'
                                ? `bg-slate-100 text-slate-400 cursor-not-allowed`
                                : resourceId === resourcesData.length - 1
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90'
                                : `bg-gradient-to-r ${resource.color} text-white hover:opacity-90`
                            }`}
                        >
                            {!canProceed && resource.content.type === 'hq' && (
                                <Lock className="w-5 h-5" />
                            )}
                            {resourceId === resourcesData.length - 1 ? 'Finalizar Trilha' : 'Próxima Etapa'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};