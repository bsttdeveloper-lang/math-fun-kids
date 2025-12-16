import { Plus, Minus, X, Divide } from "lucide-react";
import { Operation } from "@/lib/mathUtils";

interface OperationCardProps {
  operation: Operation;
  onClick: () => void;
}

const operationConfig = {
  addition: {
    icon: Plus,
    label: "Addition",
    bgClass: "bg-addition",
  },
  subtraction: {
    icon: Minus,
    label: "Subtraction",
    bgClass: "bg-subtraction",
  },
  multiplication: {
    icon: X,
    label: "Multiplication",
    bgClass: "bg-multiplication",
  },
  division: {
    icon: Divide,
    label: "Division",
    bgClass: "bg-division",
  },
};

const OperationCard = ({ operation, onClick }: OperationCardProps) => {
  const config = operationConfig[operation];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={`
        w-full ${config.bgClass} text-primary-foreground rounded-2xl py-8 px-6
        flex flex-col items-center justify-center gap-3
        transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
        active:scale-[0.98] font-nunito
      `}
    >
      <Icon className="w-12 h-12" strokeWidth={3} />
      <span className="text-2xl font-bold">{config.label}</span>
    </button>
  );
};

export default OperationCard;
