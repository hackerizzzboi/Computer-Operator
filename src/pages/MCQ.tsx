import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileQuestion, Clock, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserData } from '@/contexts/UserDataContext';
import { useToast } from '@/hooks/use-toast';

const sampleQuestions = [
  {
    id: 1,
    question: 'What is the shortcut key for Copy in Windows?',
    options: ['Ctrl + C', 'Ctrl + V', 'Ctrl + X', 'Ctrl + Z'],
    correct: 0,
  },
  {
    id: 2,
    question: 'Which of the following is not an operating system?',
    options: ['Windows', 'Linux', 'Oracle', 'macOS'],
    correct: 2,
  },
  {
    id: 3,
    question: 'What does CPU stand for?',
    options: ['Central Process Unit', 'Central Processing Unit', 'Computer Personal Unit', 'Central Processor Unit'],
    correct: 1,
  },
  {
    id: 4,
    question: 'Which function key is used to refresh a webpage?',
    options: ['F3', 'F4', 'F5', 'F6'],
    correct: 2,
  },
  {
    id: 5,
    question: 'What is the file extension for Microsoft Word documents?',
    options: ['.xls', '.ppt', '.docx', '.pdf'],
    correct: 2,
  },
];

export default function MCQPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(sampleQuestions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);

  const { stats, updateStats } = useUserData();
  const { toast } = useToast();

  const question = sampleQuestions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast({
        title: 'Select an answer',
        description: 'Please select an option before proceeding.',
        variant: 'destructive',
      });
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (selectedAnswer === question.correct) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        updateStats({ mcqCompleted: stats.mcqCompleted + 1 });
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(Array(sampleQuestions.length).fill(null));
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / sampleQuestions.length) * 100);
    return (
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 text-center"
        >
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${percentage >= 70 ? 'bg-accent/20' : 'bg-destructive/20'}`}>
            {percentage >= 70 ? (
              <CheckCircle className="w-12 h-12 text-accent" />
            ) : (
              <XCircle className="w-12 h-12 text-destructive" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Completed!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            You scored {score} out of {sampleQuestions.length}
          </p>
          <div className="text-5xl font-bold gradient-text mb-8">{percentage}%</div>
          <Button variant="hero" size="lg" onClick={resetQuiz} className="gap-2">
            <RotateCcw className="w-5 h-5" />
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <FileQuestion className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">MCQ Practice</h1>
            <p className="text-sm text-muted-foreground">Test your objective knowledge</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {currentQuestion + 1}/{sampleQuestions.length}
          </span>
        </div>
      </motion.div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass rounded-3xl p-6 md:p-8"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock className="w-4 h-4" />
          <span>Question {currentQuestion + 1}</span>
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
          {question.question}
        </h2>

        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct;
            const showCorrectness = showResult && isSelected;

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                  showCorrectness
                    ? isCorrect
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-destructive bg-destructive/10 text-foreground'
                    : isSelected
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-secondary/50 text-foreground hover:border-primary/50 hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                    showCorrectness && isCorrect
                      ? 'bg-accent text-accent-foreground'
                      : showCorrectness && !isCorrect
                      ? 'bg-destructive text-destructive-foreground'
                      : isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-accent" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        <Button
          variant="hero"
          size="lg"
          onClick={handleNext}
          disabled={showResult}
          className="w-full gap-2"
        >
          {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
}
