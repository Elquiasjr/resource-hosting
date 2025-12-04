import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { GroupSection } from './components/GroupSection';
import { GroupDetailPage } from './components/GroupDetailPage';
import { ResourceModal } from './components/ResourceModal';
import { LandingPage } from './components/LandingPage';

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'game' | 'slideshow';
  description: string;
  url: string;
  thumbnail?: string;
}

export interface Group {
  id: string;
  name: string;
  members: string[];
  resources: Resource[];
}

// Mock data - replace with actual data later
const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Grupo 1',
    members: ['Alice', 'Bob', 'Charlie'],
    resources: [
      {
        id: 'res-1',
        title: 'Exemplo de conteúdo visual',
        type: 'video',
        description: 'Vídeo disponibilizado no Youtube',
        url: 'https://www.youtube.com/embed/kcfs1-ryKWE',
      },
      {
        id: 'res-2',
        title: 'Jogo Interativo no Scratch',
        type: 'game',
        description: 'Um jogo divertido criado com Scratch - clique para jogar!',
        url: 'https://scratch.mit.edu/projects/490628362/embed',
      },
      {
        id: 'res-3',
        title: 'JavaScript Fundamentals',
        type: 'slideshow',
        description: 'Key concepts and best practices in JavaScript',
        url: '#',
      },
    ],
  },
  {
    id: 'group-2',
    name: 'Grupo 2',
    members: ['David', 'Emma', 'Frank'],
    resources: [
      {
        id: 'res-4',
        title: 'CSS Grid Tutorial',
        type: 'video',
        description: 'Learn CSS Grid layout system with practical examples',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        id: 'res-5',
        title: 'Quiz Interativo',
        type: 'game',
        description: 'Teste seus conhecimentos com este quiz interativo',
        url: 'https://wayground.com/join/quiz/5fb6f118e49310001f9387c0/start?studentShare=true',
      },
    ],
  },
  {
    id: 'group-3',
    name: 'Grupo 3',
    members: ['Grace', 'Henry', 'Iris'],
    resources: [
      {
        id: 'res-6',
        title: 'React Components Overview',
        type: 'slideshow',
        description: 'Understanding React component architecture',
        url: '#',
      },
    ],
  },
];

export default function App() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [viewedResources, setViewedResources] = useState<Set<string>>(new Set());
  const [currentView, setCurrentView] = useState<'landing' | 'hub'>('landing');
  const [selectedEdition, setSelectedEdition] = useState<any>(null);

  // Carregar recursos visualizados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('viewedResources');
    if (stored) {
      setViewedResources(new Set(JSON.parse(stored)));
    }
  }, []);

  // Marcar recurso como visto
  const markAsViewed = (resourceId: string) => {
    setViewedResources(prev => {
      const updated = new Set(prev);
      updated.add(resourceId);
      localStorage.setItem('viewedResources', JSON.stringify([...updated]));
      return updated;
    });
  };

  // Função para fechar modal e marcar como visto
  const handleCloseModal = () => {
    if (selectedResource) {
      markAsViewed(selectedResource.id);
    }
    setSelectedResource(null);
  };

  // Função para selecionar edição e navegar para hub
  const handleSelectEdition = (edition: any) => {
    setSelectedEdition(edition);
    setCurrentView('hub');
  };

  // Mostrar Landing Page
  if (currentView === 'landing') {
    return <LandingPage onSelectEdition={handleSelectEdition} />;
  }

  // Se um grupo está selecionado, mostrar a página de detalhes
  if (selectedGroup) {
    return (
      <>
        <Header 
          showBackButton={true}
          onBackToHome={() => setCurrentView('landing')}
        />
        <GroupDetailPage
          group={selectedGroup}
          onBack={() => setSelectedGroup(null)}
          onResourceClick={setSelectedResource}
          viewedResources={viewedResources}
        />
        <ResourceModal
          resource={selectedResource}
          onClose={handleCloseModal}
        />
      </>
    );
  }

  // Caso contrário, mostrar a lista de grupos
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #dbe4ee, #c5d1df)' }}>
      <Header 
        showBackButton={true}
        onBackToHome={() => setCurrentView('landing')}
      />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="mb-4" style={{ color: '#07090f' }}>Recursos da disciplina</h1>
          <p className="max-w-2xl mx-auto" style={{ color: '#07090f', opacity: 0.7 }}>
            Bem vindo a nossa plataforma de aprendizagem colaborativa. 
            Explore os recursos criados por diferentes grupos.
          </p>
          {selectedEdition && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#81a4cd', color: '#ffffff' }}>
              <span className="text-sm">
                {selectedEdition.year} - {selectedEdition.semester}
              </span>
            </div>
          )}
        </section>

        <div className="space-y-12">
          {mockGroups.map((group) => (
            <GroupSection
              key={group.id}
              group={group}
              onResourceClick={setSelectedResource}
              onViewGroup={() => setSelectedGroup(group)}
              viewedResources={viewedResources}
            />
          ))}
        </div>

        {mockGroups.length === 0 && (
          <div className="text-center py-16">
            <p style={{ color: '#07090f', opacity: 0.6 }}>Nenhum grupo enviou recursos ainda.</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-16 py-6" style={{ borderColor: 'rgba(7, 9, 15, 0.15)' }}>
        <div className="container mx-auto px-4 text-center" style={{ color: '#07090f' }}>
          <p>© 2025 Central de Conteúdos. Todos os direitos reservados.</p>
        </div>
      </footer>

      <ResourceModal
        resource={selectedResource}
        onClose={handleCloseModal}
      />
    </div>
  );
}
