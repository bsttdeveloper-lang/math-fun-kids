import { ArrowLeft } from "lucide-react";
import { Operation } from "@/lib/mathUtils";

interface DifficultySelectProps {
  operation: Operation;
  onSelect: (maxNumber: number) => void;
  onBack: () => void;
}

const operationLabels: Record<Operation, string> = {
  addition: "Addition",
  subtraction: "Subtraction",
  multiplication: "Multiplication",
  division: "Division",
};

const operationBorderColors: Record<Operation, string> = {
  addition: "border-addition",
  subtraction: "border-subtraction",
  multiplication: "border-multiplication",
  division: "border-division",
};

const difficulties = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const DifficultySelect = ({ operation, onSelect, onBack }: DifficultySelectProps) => {
  const borderColor = operationBorderColors[operation];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="container max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1 text-center pr-10">
              <h1 className="text-2xl font-bold text-foreground font-nunito">
                {operationLabels[operation]}
              </h1>
              <p className="text-muted-foreground text-sm">Choose your level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Options */}
      <div className="px-4 pb-8">
        <div className="container max-w-md mx-auto space-y-3">
          {difficulties.map((max) => (
            <button
              key={max}
              onClick={() => onSelect(max)}
              className={`w-full py-4 px-6 bg-card rounded-2xl border-2 ${borderColor} shadow-sm hover:shadow-md transition-all text-lg font-semibold text-foreground hover:scale-[1.02] active:scale-[0.98]`}
            >
              1 to {max}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DifficultySelect;
