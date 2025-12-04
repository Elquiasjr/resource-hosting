import { ArrowLeft, Users } from 'lucide-react';
import { MemberPill } from './MemberPill';
import { ResourceCard } from './ResourceCard';
import type { Group, Resource } from '../App';

interface GroupDetailPageProps {
  group: Group;
  onBack: () => void;
  onResourceClick: (resource: Resource) => void;
  viewedResources: Set<string>;
}

export function GroupDetailPage({ group, onBack, onResourceClick, viewedResources }: GroupDetailPageProps) {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #dbe4ee, #c5d1df)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Botão de voltar */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 transition-colors mb-6 group"
          style={{ color: '#07090f' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#81a4cd'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#07090f'}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar aos grupos</span>
        </button>

        {/* Cabeçalho do grupo */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8" style={{ borderColor: 'rgba(7, 9, 15, 0.15)' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#81a4cd' }}>
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 style={{ color: '#81a4cd' }}>{group.name}</h1>
              <p style={{ color: '#07090f', opacity: 0.7 }}>
                {group.resources.length} {group.resources.length === 1 ? 'recurso' : 'recursos'} disponíveis
              </p>
            </div>
          </div>

          {/* Membros */}
          <div className="mb-4">
            <h3 className="mb-3" style={{ color: '#07090f' }}>Membros da Equipe</h3>
            <div className="flex flex-wrap gap-3">
              {group.members.map((member, index) => (
                <MemberPill key={index} name={member} />
              ))}
            </div>
          </div>
        </div>

        {/* Recursos */}
        <div className="flex flex-col items-center">
          <h2 className="mb-6 self-start" style={{ color: '#07090f' }}>Recursos Criados</h2>
          {group.resources.length > 0 ? (
            <div className="flex flex-col gap-6 max-w-3xl w-full">
              {group.resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onClick={() => onResourceClick(resource)}
                  isViewed={viewedResources.has(resource.id)}
                  expanded={true}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center" style={{ borderColor: 'rgba(7, 9, 15, 0.15)' }}>
              <p style={{ color: '#07090f', opacity: 0.6 }}>Nenhum recurso enviado ainda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
