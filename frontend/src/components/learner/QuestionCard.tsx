/*=================================================================
  2. src/components/learner/QuestionCard.tsx - FIXED VERSION
=================================================================*/
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  Circle, 
  AlertCircle,
  HelpCircle,
  Timer,
  Zap
} from 'lucide-react';

interface Props {
  q: { 
    id: string; 
    text: string; 
    options: string[];
    type?: 'multiple_choice' | 'true_false' | 'single_select';
    difficulty?: 'easy' | 'medium' | 'hard' | string;  // Made more flexible
    category?: string;
    hint?: string;
  };
  index: number;
  totalQuestions: number;
  onSelect: (option: number, timeSpent: number, confidence?: number) => void;
  selectedOption?: number;
  isAnswered?: boolean;
  showResult?: boolean;
  correctAnswer?: number;
  timeLimit?: number; // in seconds
  isLoading?: boolean;
}

const getDifficultyColor = (difficulty?: string) => {
  if (!difficulty || typeof difficulty !== 'string') {
    return 'bg-blue-100 text-blue-700 border-blue-200';
  }
  
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'medium':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'hard':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-blue-100 text-blue-700 border-blue-200';
  }
};

const formatDifficultyText = (difficulty?: string) => {
  if (!difficulty || typeof difficulty !== 'string') {
    return 'Standard';
  }
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
};

const getOptionLabel = (index: number) => {
  return String.fromCharCode(65 + index); // A, B, C, D
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.95 }
};

const optionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  hover: { x: 4, scale: 1.02 }
};

export default function QuestionCard({ 
  q, 
  index, 
  totalQuestions,
  onSelect, 
  selectedOption,
  isAnswered = false,
  showResult = false,
  correctAnswer,
  timeLimit,
  isLoading = false
}: Props) {
  const [timeSpent, setTimeSpent] = useState(0);
  const [confidence, setConfidence] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());

  // Timer for time tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    const totalTime = (Date.now() - startTime) / 1000;
    onSelect(optionIndex, totalTime, confidence);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getOptionStatus = (optionIndex: number) => {
    if (!showResult) {
      return selectedOption === optionIndex ? 'selected' : 'default';
    }
    
    if (correctAnswer === optionIndex) {
      return 'correct';
    } else if (selectedOption === optionIndex && selectedOption !== correctAnswer) {
      return 'incorrect';
    }
    return 'default';
  };

  const getOptionStyles = (status: string) => {
    switch (status) {
      case 'selected':
        return 'bg-blue-50 border-blue-300 text-blue-900 shadow-md';
      case 'correct':
        return 'bg-emerald-50 border-emerald-300 text-emerald-900';
      case 'incorrect':
        return 'bg-red-50 border-red-300 text-red-900';
      default:
        return 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 animate-pulse">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-32" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          {/* Question Number & Progress */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <span className="text-sm font-medium text-gray-600">
                of {totalQuestions}
              </span>
            </div>

            {/* Difficulty Badge - FIXED */}
            {q.difficulty && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(q.difficulty)}`}
              >
                {formatDifficultyText(q.difficulty)}
              </motion.div>
            )}

            {/* Category */}
            {q.category && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                {q.category}
              </span>
            )}
          </div>

          {/* Timer */}
          <div className="flex items-center space-x-4">
            {timeLimit && (
              <div className={`flex items-center space-x-2 ${
                timeSpent > timeLimit * 0.8 ? 'text-red-600' : 'text-gray-600'
              }`}>
                <Timer size={16} />
                <span className="text-sm font-medium">
                  {formatTime(timeLimit - timeSpent)}
                </span>
              </div>
            )}

            <div className="flex items-center space-x-2 text-gray-600">
              <Clock size={16} />
              <span className="text-sm font-medium">{formatTime(timeSpent)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((index + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8">
        {/* Question Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 leading-relaxed mb-4">
            {q.text}
          </h3>
          
          {/* Hint Toggle */}
          {q.hint && (
            <div className="mb-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <HelpCircle size={16} />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </motion.button>
              
              <AnimatePresence mode="wait">
                {showHint && (
                  <motion.div
                    key="hint"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200 overflow-hidden"
                  >
                    <div className="flex items-start space-x-2">
                      <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-800">{q.hint}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Options */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {q.options.map((option, optionIndex) => {
              const status = getOptionStatus(optionIndex);
              
              return (
                <motion.button
                  key={`option-${optionIndex}`}
                  variants={optionVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={!isAnswered ? "hover" : {}}
                  transition={{ delay: 0.4 + optionIndex * 0.1 }}
                  onClick={() => handleOptionSelect(optionIndex)}
                  disabled={isAnswered}
                  className={`w-full text-left border-2 rounded-xl p-4 transition-all duration-200 ${
                    getOptionStyles(status)
                  } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Option Label */}
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      status === 'selected' ? 'bg-blue-600 border-blue-600 text-white' :
                      status === 'correct' ? 'bg-emerald-600 border-emerald-600 text-white' :
                      status === 'incorrect' ? 'bg-red-600 border-red-600 text-white' :
                      'border-gray-300 text-gray-600'
                    }`}>
                      {getOptionLabel(optionIndex)}
                    </div>

                    {/* Option Text */}
                    <span className="flex-1 font-medium">{option}</span>

                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {status === 'correct' && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle size={20} className="text-emerald-600" />
                        </motion.div>
                      )}
                      {status === 'incorrect' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Circle size={20} className="text-red-600" />
                        </motion.div>
                      )}
                      {status === 'selected' && !showResult && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-blue-600 rounded-full"
                        />
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Confidence Slider (before answering) */}
        {!isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                How confident are you?
              </label>
              <div className="flex items-center space-x-1">
                <Zap size={16} className="text-amber-500" />
                <span className="text-sm font-semibold text-gray-900">
                  {confidence}/5
                </span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={confidence}
              onChange={(e) => setConfidence(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Not sure</span>
              <span>Very confident</span>
            </div>
          </motion.div>
        )}

        {/* Result Feedback */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`mt-8 p-6 rounded-xl border-2 ${
              selectedOption === correctAnswer 
                ? 'bg-emerald-50 border-emerald-200' 
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              {selectedOption === correctAnswer ? (
                <CheckCircle size={24} className="text-emerald-600" />
              ) : (
                <Circle size={24} className="text-red-600" />
              )}
              <div>
                <p className={`font-semibold ${
                  selectedOption === correctAnswer ? 'text-emerald-800' : 'text-red-800'
                }`}>
                  {selectedOption === correctAnswer ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Time taken: {formatTime(timeSpent)}
                  {confidence && ` • Confidence: ${confidence}/5`}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent opacity-50 rounded-bl-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100 to-transparent opacity-50 rounded-tr-3xl" />
    </motion.div>
  );
}
