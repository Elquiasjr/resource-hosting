import { GraduationCap, Calendar, Users, ChevronRight, Globe } from 'lucide-react';

interface Edition {
  id: string;
  year: string;
  semester: string;
  professors: string[];
  groupCount: number;
}

interface LandingPageProps {
  onSelectEdition: (edition: Edition) => void;
}

const mockEditions: Edition[] = [
  {
    id: 'edition-2025-1',
    year: '2025',
    semester: '1º Semestre',
    professors: ['Prof. Dr. João Silva', 'Prof. Dra. Maria Santos'],
    groupCount: 3,
  },
  {
    id: 'edition-2024-2',
    year: '2024',
    semester: '2º Semestre',
    professors: ['Prof. Dr. Carlos Oliveira', 'Prof. Dra. Ana Costa'],
    groupCount: 5,
  },
  {
    id: 'edition-2024-1',
    year: '2024',
    semester: '1º Semestre',
    professors: ['Prof. Dr. Pedro Lima', 'Prof. Dra. Laura Ferreira'],
    groupCount: 4,
  },
];

export function LandingPage({ onSelectEdition }: LandingPageProps) {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #dbe4ee, #c5d1df)' }}>
      {/* Hero Section */}
      <div className="text-white py-20" style={{ background: 'linear-gradient(to right, #320a28, #07090f)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Globe className="w-16 h-16" />
              </div>
            </div>
            <h1 className="mb-6 text-white">
              Disciplina COIL
            </h1>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: '#dbe4ee' }}>
              Collaborative Online International Learning
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
              <p className="leading-relaxed" style={{ color: '#dbe4ee' }}>
                O COIL (Collaborative Online International Learning) é uma abordagem inovadora de 
                ensino que conecta estudantes de diferentes países e culturas através de projetos 
                colaborativos online. Esta disciplina promove o desenvolvimento de competências 
                interculturais, trabalho em equipe global e comunicação digital, preparando os 
                alunos para um mercado de trabalho cada vez mais globalizado.
              </p>
            </div>

            {/* University Logos */}
            <div className="mt-12">
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow w-48">
                  <img 
                    src={"src/assets/ipb-logo.png"} 
                    alt="Instituto Politécnico de Bragança" 
                    className="h-16 w-full object-contain"
                  />
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow w-48">
                  <img 
                    src={"src/assets/utf-logo.png"} 
                    alt="Universidade Tecnológica Federal do Paraná" 
                    className="h-16 w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#81a4cd' }}>
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2" style={{ color: '#07090f' }}>Aprendizagem Colaborativa</h3>
              <p style={{ color: '#07090f', opacity: 0.7 }}>
                Trabalhe em equipe com estudantes de diferentes instituições e culturas
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#937666' }}>
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2" style={{ color: '#07090f' }}>Perspectiva Global</h3>
              <p style={{ color: '#07090f', opacity: 0.7 }}>
                Desenvolva uma compreensão intercultural e visão internacional
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#320a28' }}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2" style={{ color: '#07090f' }}>Projetos Práticos</h3>
              <p style={{ color: '#07090f', opacity: 0.7 }}>
                Crie recursos educacionais reais aplicando conhecimentos adquiridos
              </p>
            </div>
          </div>

          {/* Editions Section */}
          <div className="mb-8">
            <h2 className="mb-12 text-center" style={{ color: '#07090f', fontSize: '2rem' }}>Edições da Disciplina</h2>
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
              {mockEditions.map((edition) => (
                <button
                  key={edition.id}
                  onClick={() => onSelectEdition(edition)}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 hover:scale-105 text-left group"
                  style={{ border: '2px solid rgba(129, 164, 205, 0.2)' }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-white rounded-xl p-4 shadow-md" style={{ background: 'linear-gradient(to bottom right, #81a4cd, #320a28)' }}>
                        <Calendar className="w-10 h-10" />
                      </div>
                      <div>
                        <div className="text-2xl" style={{ color: '#07090f', fontWeight: '600' }}>{edition.year}</div>
                        <div style={{ color: '#07090f', opacity: 0.7 }}>{edition.semester}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-all" style={{ color: '#937666' }} />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs mb-2 uppercase tracking-wider" style={{ color: '#937666', fontWeight: '600' }}>Professores</div>
                      <div className="space-y-2">
                        {edition.professors.map((prof, idx) => (
                          <div key={idx} style={{ color: '#07090f', fontSize: '0.95rem' }}>
                            {prof}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t-2" style={{ borderColor: 'rgba(129, 164, 205, 0.2)' }}>
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(129, 164, 205, 0.1)' }}>
                        <Users className="w-5 h-5" style={{ color: '#81a4cd' }} />
                      </div>
                      <span style={{ color: '#07090f', fontSize: '0.95rem', fontWeight: '500' }}>
                        {edition.groupCount} {edition.groupCount === 1 ? 'grupo' : 'grupos'}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="rounded-2xl p-8 text-center text-white mt-12" style={{ background: 'linear-gradient(to right, #81a4cd, #937666)' }}>
            <h3 className="mb-3 text-white">Explore os Recursos</h3>
            <p className="mb-6" style={{ color: '#dbe4ee' }}>
              Selecione uma edição acima para acessar a central de conteúdos e visualizar 
              os recursos educacionais criados pelos grupos participantes.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-8" style={{ borderColor: 'rgba(7, 9, 15, 0.15)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center" style={{ color: '#07090f' }}>
            <p>© 2025 Disciplina COIL. Todos os direitos reservados.</p>
            <p className="text-sm mt-2" style={{ color: '#07090f', opacity: 0.6 }}>
              Promovendo educação global e colaborativa
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
