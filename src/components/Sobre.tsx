import { Heart } from "lucide-react";

const team = [
    {
        name: 'Elquias Junior',
        role: 'Frontend Developer',
        avatar: '👨‍💻'
    },
    {
        name: 'Elquias Junior',
        role: 'Frontend Developer',
        avatar: '👨‍💻'
    },
    {
        name: 'Elquias Junior',
        role: 'Frontend Developer',
        avatar: '👨‍💻'
    },
    {
        name: 'Elquias Junior',
        role: 'Frontend Developer',
        avatar: '👨‍💻'
    }
];

export function About() {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="mb-3">Quem Criou Este Projeto</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                Somos um grupo dedicado à educação ambiental e à preservação das florestas. 
                Criamos este projeto para inspirar a próxima geração de guardiões da natureza.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {team.map((member, index) => (
                <div 
                    key={index}
                    className="text-center"
                >
                    <div className="text-6xl mb-3">{member.avatar}</div>
                    
                    <h3 className="text-slate-900 mb-1">{member.name}</h3>
                    
                    <p className="text-green-600">
                    {member.role}
                    </p>
                </div>
                ))}
            </div>
        </div>
    );
}