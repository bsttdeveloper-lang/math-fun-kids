import { Plus, Minus, X, Divide } from "lucide-react";
import { cn } from "@/lib/utils";

interface OperationButtonProps {
  operation: "addition" | "subtraction" | "multiplication" | "division";
  onClick: () => void;
}

const operationConfig = {
  addition: {
    icon: Plus,
    label: "Addition",
    className: "bg-addition hover:bg-addition/90",
  },
  subtraction: {
    icon: Minus,
    label: "Subtraction",
    className: "bg-subtraction hover:bg-subtraction/90",
  },
  multiplication: {
    icon: X,
    label: "Multiplication",
    className: "bg-multiplication hover:bg-multiplication/90",
  },
  division: {
    icon: Divide,
    label: "Division",
    className: "bg-division hover:bg-division/90",
  },
};

export function OperationButton({ operation, onClick }: OperationButtonProps) {
  const config = operationConfig[operation];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full py-6 px-8 rounded-xl text-primary-foreground font-bold text-xl",
        "flex flex-col items-center justify-center gap-2",
        "transition-all duration-200 transform active:scale-95",
        "shadow-lg hover:shadow-xl",
        config.className
      )}
    >
      <Icon className="w-8 h-8" strokeWidth={3} />
      <span>{config.label}</span>
    </button>
  );
}
