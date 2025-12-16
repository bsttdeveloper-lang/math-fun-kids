import { useState } from "react";
import { Switch } from "@/components/ui/switch";

import OperationCard from "@/components/OperationCard";
import PracticeScreen from "@/components/PracticeScreen";
import DifficultySelect from "@/components/DifficultySelect";
import { Operation, generateQuestions, Question } from "@/lib/mathUtils";

const Index = () => {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [decimalsEnabled, setDecimalsEnabled] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [cumulativeScore, setCumulativeScore] = useState({ correct: 0, incorrect: 0 });

  const handleOperationSelect = (operation: Operation) => {
    setSelectedOperation(operation);
  };

  const handleDifficultySelect = (maxNumber: number) => {
    if (selectedOperation) {
      const newQuestions = generateQuestions(selectedOperation, 10, !decimalsEnabled, maxNumber);
      setQuestions(newQuestions);
      setSelectedDifficulty(maxNumber);
    }
  };

  const handleBackFromDifficulty = () => {
    setSelectedOperation(null);
  };

  const handleBack = () => {
    setSelectedDifficulty(null);
    setQuestions([]);
  };

  const handleReset = () => {
    if (selectedOperation && selectedDifficulty) {
      const newQuestions = generateQuestions(selectedOperation, 10, !decimalsEnabled, selectedDifficulty);
      setQuestions(newQuestions);
      setCumulativeScore({ correct: 0, incorrect: 0 });
    }
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId && !q.isAnswered) {
          const userNum = parseFloat(answer);
          const isCorrect = !isNaN(userNum) && Math.abs(userNum - q.correctAnswer) < 0.01;
          setCumulativeScore(score => ({
            correct: score.correct + (isCorrect ? 1 : 0),
            incorrect: score.incorrect + (isCorrect ? 0 : 1),
          }));
          return {
            ...q,
            userAnswer: answer,
            isAnswered: true,
            isCorrect,
          };
        }
        return q;
      })
    );
  };

  const handleAddMoreQuestions = () => {
    if (selectedOperation && selectedDifficulty) {
      const newQuestions = generateQuestions(selectedOperation, 5, !decimalsEnabled, selectedDifficulty);
      const lastId = questions.length > 0 ? questions[questions.length - 1].id : 0;
      const renumberedQuestions = newQuestions.map((q, index) => ({
        ...q,
        id: lastId + index + 1,
      }));
      setQuestions((prev) => [...prev, ...renumberedQuestions]);
    }
  };

  // Show practice screen if both operation and difficulty are selected
  if (selectedOperation && selectedDifficulty) {
    return (
      <PracticeScreen
        operation={selectedOperation}
        questions={questions}
        wholeNumbersOnly={!decimalsEnabled}
        cumulativeScore={cumulativeScore}
        onBack={handleBack}
        onReset={handleReset}
        onAnswer={handleAnswer}
        onAddMore={handleAddMoreQuestions}
      />
    );
  }

  // Show difficulty selection if operation is selected
  if (selectedOperation) {
    return (
      <DifficultySelect
        operation={selectedOperation}
        onSelect={handleDifficultySelect}
        onBack={handleBackFromDifficulty}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="px-4 pt-8 pb-6">
        <div className="container max-w-md mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary font-nunito mb-3">
            Math Learning App
          </h1>
          <p className="text-lg text-muted-foreground font-nunito mb-6">
            Choose an operation to practice
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-8">
        <div className="container max-w-md mx-auto">
          {/* Decimals Toggle */}
          <div className="bg-secondary/80 rounded-2xl px-5 py-4 mb-6 flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              {decimalsEnabled ? "Decimals enabled (0.1)" : "Decimals enable (0.1)"}
            </span>
            <Switch
              checked={decimalsEnabled}
              onCheckedChange={setDecimalsEnabled}
            />
          </div>

          {/* Operation Cards */}
          <div className="space-y-4">
            <OperationCard operation="addition" onClick={() => handleOperationSelect("addition")} />
            <OperationCard operation="subtraction" onClick={() => handleOperationSelect("subtraction")} />
            <OperationCard operation="multiplication" onClick={() => handleOperationSelect("multiplication")} />
            <OperationCard operation="division" onClick={() => handleOperationSelect("division")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
