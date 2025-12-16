import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PracticePageProps {
  operation: "addition" | "subtraction" | "multiplication" | "division";
  decimalsEnabled: boolean;
  onBack: () => void;
}

const operationSymbols = {
  addition: "+",
  subtraction: "−",
  multiplication: "×",
  division: "÷",
};

const operationColors = {
  addition: "bg-addition",
  subtraction: "bg-subtraction",
  multiplication: "bg-multiplication",
  division: "bg-division",
};

const operationNames = {
  addition: "Addition",
  subtraction: "Subtraction",
  multiplication: "Multiplication",
  division: "Division",
};

function generateProblem(
  operation: string,
  decimalsEnabled: boolean
): { num1: number; num2: number; answer: number } {
  let num1: number, num2: number, answer: number;

  if (decimalsEnabled) {
    num1 = Math.round(Math.random() * 100) / 10;
    num2 = Math.round(Math.random() * 100) / 10;
  } else {
    num1 = Math.floor(Math.random() * 13);
    num2 = Math.floor(Math.random() * 13);
  }

  switch (operation) {
    case "addition":
      answer = num1 + num2;
      break;
    case "subtraction":
      if (num2 > num1) [num1, num2] = [num2, num1];
      answer = num1 - num2;
      break;
    case "multiplication":
      answer = num1 * num2;
      break;
    case "division":
      if (decimalsEnabled) {
        num2 = num2 === 0 ? 1 : num2;
        answer = Math.round((num1 / num2) * 100) / 100;
      } else {
        num2 = num2 === 0 ? 1 : num2;
        answer = num1;
        num1 = num1 * num2;
      }
      break;
    default:
      answer = 0;
  }

  return {
    num1: Math.round(num1 * 100) / 100,
    num2: Math.round(num2 * 100) / 100,
    answer: Math.round(answer * 100) / 100,
  };
}

export function PracticePage({ operation, decimalsEnabled, onBack }: PracticePageProps) {
  const [problem, setProblem] = useState(() => generateProblem(operation, decimalsEnabled));
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const newProblem = useCallback(() => {
    setProblem(generateProblem(operation, decimalsEnabled));
    setUserAnswer("");
    setFeedback(null);
  }, [operation, decimalsEnabled]);

  const checkAnswer = () => {
    const parsed = parseFloat(userAnswer);
    if (isNaN(parsed)) return;

    const isCorrect = Math.abs(parsed - problem.answer) < 0.01;
    setFeedback(isCorrect ? "correct" : "incorrect");
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    setTimeout(() => {
      newProblem();
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userAnswer) {
      checkAnswer();
    }
  };

  const handleNumberClick = (num: string) => {
    if (feedback) return;
    if (num === "." && userAnswer.includes(".")) return;
    if (num === "-" && userAnswer.length > 0) return;
    setUserAnswer((prev) => prev + num);
  };

  const handleDelete = () => {
    if (feedback) return;
    setUserAnswer((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (feedback) return;
    setUserAnswer("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className={cn("p-4 text-primary-foreground", operationColors[operation])}>
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-primary-foreground/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{operationNames[operation]}</h1>
          <div className="text-sm font-semibold">
            {score.correct}/{score.total}
          </div>
        </div>
      </header>

      {/* Problem Display */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div
          className={cn(
            "w-full max-w-sm bg-card rounded-2xl shadow-lg p-8 transition-all duration-300",
            feedback === "correct" && "animate-pulse-success",
            feedback === "incorrect" && "animate-shake"
          )}
        >
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-foreground mb-4">
              {problem.num1} {operationSymbols[operation]} {problem.num2}
            </div>
            <div className="text-3xl font-bold text-muted-foreground">= ?</div>
          </div>

          {/* Answer Input */}
          <div className="relative mb-6">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => !feedback && setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Your answer"
              className={cn(
                "w-full text-center text-3xl font-bold p-4 rounded-xl border-2 outline-none transition-all",
                "bg-background",
                feedback === "correct" && "border-addition bg-addition/10",
                feedback === "incorrect" && "border-destructive bg-destructive/10",
                !feedback && "border-border focus:border-primary"
              )}
              readOnly
            />
            {feedback && (
              <div
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center animate-bounce-in",
                  feedback === "correct" ? "bg-addition" : "bg-destructive"
                )}
              >
                {feedback === "correct" ? (
                  <Check className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <X className="w-6 h-6 text-primary-foreground" />
                )}
              </div>
            )}
          </div>

          {feedback === "incorrect" && (
            <div className="text-center text-destructive font-semibold mb-4 animate-bounce-in">
              Correct answer: {problem.answer}
            </div>
          )}
        </div>

        {/* Number Pad */}
        <div className="w-full max-w-sm mt-6 grid grid-cols-3 gap-3">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"].map((key) => (
            <button
              key={key}
              onClick={() => (key === "⌫" ? handleDelete() : handleNumberClick(key))}
              disabled={!!feedback}
              className={cn(
                "py-4 text-2xl font-bold rounded-xl transition-all",
                "bg-card shadow-md hover:shadow-lg active:scale-95",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {key}
            </button>
          ))}
          <button
            onClick={handleClear}
            disabled={!!feedback}
            className="py-4 text-lg font-bold rounded-xl bg-muted text-muted-foreground transition-all hover:bg-muted/80 active:scale-95 disabled:opacity-50"
          >
            Clear
          </button>
          <button
            onClick={checkAnswer}
            disabled={!userAnswer || !!feedback}
            className={cn(
              "col-span-2 py-4 text-xl font-bold rounded-xl transition-all active:scale-95",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              operationColors[operation],
              "text-primary-foreground"
            )}
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
}
