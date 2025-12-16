export type Operation = "addition" | "subtraction" | "multiplication" | "division";

export interface Question {
  id: number;
  num1: number;
  num2: number;
  operation: Operation;
  correctAnswer: number;
  userAnswer: string;
  isAnswered: boolean;
  isCorrect: boolean | null;
}

export const getOperationSymbol = (operation: Operation): string => {
  switch (operation) {
    case "addition":
      return "+";
    case "subtraction":
      return "−";
    case "multiplication":
      return "×";
    case "division":
      return "÷";
  }
};

export const calculateAnswer = (num1: number, num2: number, operation: Operation): number => {
  switch (operation) {
    case "addition":
      return Math.round((num1 + num2) * 10) / 10;
    case "subtraction":
      return Math.round((num1 - num2) * 10) / 10;
    case "multiplication":
      return Math.round((num1 * num2) * 10) / 10;
    case "division":
      return Math.round((num1 / num2) * 10) / 10;
  }
};

export const formatNumber = (num: number, wholeNumbersOnly: boolean): string => {
  if (wholeNumbersOnly) {
    return Math.round(num).toString();
  }
  return num.toFixed(1);
};

export const generateQuestions = (
  operation: Operation,
  count: number,
  wholeNumbersOnly: boolean,
  maxNumber: number = 12
): Question[] => {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    let num1: number;
    let num2: number;

    if (wholeNumbersOnly) {
      if (operation === "division") {
        num2 = Math.floor(Math.random() * Math.min(maxNumber, 10)) + 1;
        const maxMultiplier = Math.floor(maxNumber / num2);
        num1 = num2 * (Math.floor(Math.random() * maxMultiplier) + 1);
      } else if (operation === "subtraction") {
        num1 = Math.floor(Math.random() * maxNumber) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
      } else {
        num1 = Math.floor(Math.random() * maxNumber) + 1;
        num2 = Math.floor(Math.random() * maxNumber) + 1;
      }
    } else {
      const decimalMax = maxNumber - 0.1;
      if (operation === "addition") {
        num1 = Math.round((Math.random() * decimalMax + 0.1) * 10) / 10;
        num2 = Math.round((Math.random() * decimalMax + 0.1) * 10) / 10;
      } else if (operation === "subtraction") {
        num1 = Math.round((Math.random() * decimalMax + 1) * 10) / 10;
        num2 = Math.round((Math.random() * (num1 - 0.1) + 0.1) * 10) / 10;
      } else if (operation === "multiplication") {
        const multMax = Math.min(maxNumber, 10) - 0.1;
        num1 = Math.round((Math.random() * multMax + 0.1) * 10) / 10;
        num2 = Math.round((Math.random() * multMax + 0.1) * 10) / 10;
      } else {
        const divMax = Math.min(maxNumber, 10) - 0.1;
        num2 = Math.round((Math.random() * divMax + 0.1) * 10) / 10;
        const result = Math.round((Math.random() * divMax + 0.1) * 10) / 10;
        num1 = Math.round((num2 * result) * 10) / 10;
      }
    }

    questions.push({
      id: i + 1,
      num1,
      num2,
      operation,
      correctAnswer: calculateAnswer(num1, num2, operation),
      userAnswer: "",
      isAnswered: false,
      isCorrect: null,
    });
  }

  return questions;
};
