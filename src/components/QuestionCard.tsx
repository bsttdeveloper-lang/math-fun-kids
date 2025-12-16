import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { Question, getOperationSymbol, formatNumber } from "@/lib/mathUtils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  wholeNumbersOnly: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, wholeNumbersOnly }) => {
  const [inputValue, setInputValue] = useState(question.userAnswer);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^-?\d*[.,]?\d*$/.test(value) || value === "") {
      setInputValue(value);
    }
  };

  const normalizeAnswer = (value: string): string => {
    return value.replace(',', '.');
  };

  const handleSubmit = () => {
    if (inputValue.trim() === "") return;
    onAnswer(normalizeAnswer(inputValue));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const getInputBorderColor = () => {
    if (!question.isAnswered) return "border-muted";
    return question.isCorrect ? "border-success bg-success/10" : "border-destructive bg-destructive/10";
  };

  return (
    <div className="bg-card rounded-2xl p-5 border-2 border-border shadow-sm transition-all duration-200">
      <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
        Question {question.id}
      </p>

      <div className="flex items-center gap-3">
        <span className="text-4xl font-bold text-foreground">
          {formatNumber(question.num1, wholeNumbersOnly)} {getOperationSymbol(question.operation)} {formatNumber(question.num2, wholeNumbersOnly)} =
        </span>

        <div className="relative flex items-center gap-2">
          <input
            type="text"
            inputMode="decimal"
            value={question.isAnswered ? question.userAnswer : inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleSubmit}
            disabled={question.isAnswered}
            placeholder="?"
            className={`
              w-20 h-14 text-center text-2xl font-bold rounded-xl border-2
              ${getInputBorderColor()}
              bg-muted/50 text-foreground placeholder-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-ring
              disabled:opacity-100
              transition-colors duration-200
            `}
          />

          {question.isAnswered && (
            <div className="animate-pop-in">
              {question.isCorrect ? (
                <Check className="w-8 h-8 text-success" strokeWidth={3} />
              ) : (
                <X className="w-8 h-8 text-destructive" strokeWidth={3} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
