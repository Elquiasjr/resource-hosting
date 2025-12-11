import { Trophy, RotateCcw } from "lucide-react";

interface ProgressProps {
    currentResourceIndex: number;
    completedResources: Set<number>;
    totalResources: number;
    resetProgress: () => void;
}

export function Progress({ currentResourceIndex, completedResources, totalResources, resetProgress }: ProgressProps) {
    const completedCount = completedResources.size;
    const percentage = Math.round((completedCount / totalResources) * 100);

    const handleReset = () => {
        if (confirm('Tem certeza que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.')) {
            resetProgress();
        }
    };

    return(
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <Trophy className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-slate-900 mb-2">Seu Progresso</h2>
                <p className="text-slate-600 mb-4">
                    Você completou {completedCount} de {totalResources} etapas
                </p>
                
                {(completedCount > 0 || currentResourceIndex > 0) && (
                    <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
                        title="Resetar progresso"
                    >
                        <RotateCcw className="w-5 h-5" />
                        <span>Resetar</span>
                    </button>
                )}
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-3">
                <span className="text-slate-700">Progresso Total</span>
                <span className="text-green-600">{percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden">
                <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-6 rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                    style={{ width: `${percentage}%` }}
                >
                    {percentage > 10 && (
                    <span className="text-white text-xs">{percentage}%</span>
                    )}
                </div>
                </div>

                {percentage === 100 && (
                <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
                    <p className="text-green-800">
                    🎉 Parabéns! Você completou todos os materiais e é um verdadeiro Guardião da Floresta!
                    </p>
                </div>
                )}
            </div>
        </div>
    );
}