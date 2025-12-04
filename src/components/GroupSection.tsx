import { ArrowRight } from 'lucide-react';
import { ResourceCard } from './ResourceCard';
import type { Group, Resource } from '../App';

interface GroupSectionProps {
  group: Group;
  onResourceClick: (resource: Resource) => void;
  onViewGroup: () => void;
  viewedResources: Set<string>;
}

export function GroupSection({ group, onResourceClick, onViewGroup, viewedResources }: GroupSectionProps) {

  return (
    <section className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'rgba(7, 9, 15, 0.15)' }}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 style={{ color: '#81a4cd' }}>{group.name}</h2>
          <button
            onClick={onViewGroup}
            className="flex items-center gap-2 transition-colors group"
            style={{ color: '#07090f' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#81a4cd'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#07090f'}
            aria-label="Ver detalhes do grupo"
          >
            <span className="text-sm">Ver recursos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <p className="text-sm" style={{ color: '#07090f', opacity: 0.7 }}>
          Membros: {group.members.join(', ')}
        </p>
      </div>

      {group.resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {group.resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onClick={() => onResourceClick(resource)}
              isViewed={viewedResources.has(resource.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8" style={{ color: '#07090f', opacity: 0.6 }}>
          <p>Nenhum recurso enviado ainda</p>
        </div>
      )}
    </section>
  );
}
