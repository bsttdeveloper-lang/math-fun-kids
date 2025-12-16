import { useState } from "react";
import { Sparkles } from "lucide-react";
import { OperationButton } from "@/components/OperationButton";
import { PracticePage } from "@/components/PracticePage";
import { Switch } from "@/components/ui/switch";

type Operation = "addition" | "subtraction" | "multiplication" | "division" | null;

const Index = () => {
  const [selectedOperation, setSelectedOperation] = useState<Operation>(null);
  const [decimalsEnabled, setDecimalsEnabled] = useState(false);

  if (selectedOperation) {
    return (
      <PracticePage
        operation={selectedOperation}
        decimalsEnabled={decimalsEnabled}
        onBack={() => setSelectedOperation(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-badge text-badge-foreground text-sm font-semibold mb-6">
        <Sparkles className="w-4 h-4" />
        <span>Math Practice</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary text-center italic mb-3">
        Math Learning App
      </h1>
      <p className="text-muted-foreground text-lg mb-8">
        Choose an operation to practice
      </p>

      {/* Decimals Toggle */}
      <div className="w-full max-w-sm bg-card rounded-xl shadow-sm p-4 flex items-center justify-between mb-6">
        <span className="text-foreground font-medium">Decimals enable (0.1)</span>
        <Switch
          checked={decimalsEnabled}
          onCheckedChange={setDecimalsEnabled}
        />
      </div>

      {/* Operation Buttons */}
      <div className="w-full max-w-sm space-y-4">
        <OperationButton
          operation="addition"
          onClick={() => setSelectedOperation("addition")}
        />
        <OperationButton
          operation="subtraction"
          onClick={() => setSelectedOperation("subtraction")}
        />
        <OperationButton
          operation="multiplication"
          onClick={() => setSelectedOperation("multiplication")}
        />
        <OperationButton
          operation="division"
          onClick={() => setSelectedOperation("division")}
        />
      </div>
    </div>
  );
};

export default Index;
