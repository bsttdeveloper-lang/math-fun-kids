import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import QuestionCard from "@/components/QuestionCard";
import { Operation, Question } from "@/lib/mathUtils";

interface PracticeScreenProps {
  operation: Operation;
  questions: Question[];
  wholeNumbersOnly: boolean;
  cumulativeScore: { correct: number; incorrect: number };
  onBack: () => void;
  onReset: () => void;
  onAnswer: (questionId: number, answer: string) => void;
  onAddMore: () => void;
}

const operationColors = {
  addition: "bg-addition",
  subtraction: "bg-subtraction",
  multiplication: "bg-multiplication",
  division: "bg-division",
};

const PracticeScreen = ({
  operation,
  questions,
  wholeNumbersOnly,
  cumulativeScore,
  onBack,
  onReset,
  onAnswer,
  onAddMore,
}: PracticeScreenProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 5;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const correctCount = cumulativeScore.correct;
  const incorrectCount = cumulativeScore.incorrect;
  const totalAnswered = correctCount + incorrectCount;

  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Add more questions and go to next page
      onAddMore();
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-practice px-4 py-6">
      <div className="container max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-card shadow-md flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>

          {/* Score Display */}
          <div className="flex items-center gap-4 text-lg font-bold">
            <span className="flex items-center gap-1">
              {correctCount}
              <Check className="w-5 h-5 text-success" strokeWidth={3} />
            </span>
            <span className="flex items-center gap-1">
              {incorrectCount}
              <X className="w-5 h-5 text-destructive" strokeWidth={3} />
            </span>
            <span className="text-muted-foreground">{totalAnswered}</span>
          </div>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className={`${operationColors[operation]} text-primary-foreground px-5 py-2.5 rounded-full font-bold hover:opacity-90 transition-opacity`}
          >
            Reset
          </button>
        </div>

        {/* Questions */}
        <div className="space-y-4 mb-6">
          {currentQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              wholeNumbersOnly={wholeNumbersOnly}
              onAnswer={(answer) => onAnswer(question.id, answer)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className={`
              flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2
              ${currentPage === 0
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-muted hover:bg-border text-muted-foreground"
              }
              transition-colors
            `}
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={handleNext}
            className={`
              flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2
              ${operationColors[operation]} text-primary-foreground hover:opacity-90
              transition-all
            `}
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeScreen;
