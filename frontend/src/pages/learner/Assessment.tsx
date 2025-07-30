/*=================================================================
  3. src/pages/learner/Assessment.tsx
=================================================================*/
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Target, 
  Brain, 
  Zap, 
  Star,
  CheckCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  TrendingUp,
  BookOpen,
  AlertCircle,
  Play,
  Pause
} from 'lucide-react';
import { useAssessment } from '../../api/hooks/learner/useAssessment';
import QuestionCard from '../../components/learner/QuestionCard';

type AssessmentState = 'selection' | 'countdown' | 'active' | 'paused' | 'completed' | 'results';
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

const difficultyConfig = {
  beginner: {
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    icon: BookOpen,
    description: 'Perfect for getting started',
    estimatedTime: '10-15 min',
    questions: '15-20',
    level: 1
  },
  intermediate: {
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    icon: Brain,
    description: 'Test your growing knowledge',
    estimatedTime: '15-25 min',
    questions: '20-30',
    level: 2
  },
  advanced: {
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    icon: Zap,
    description: 'Challenge your expertise',
    estimatedTime: '25-35 min',
    questions: '30-40',
    level: 3
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

export default function AssessmentPage() {
  const { start, answer, finish } = useAssessment();
  const [assessment, setAssessment] = useState<any | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [assessmentState, setAssessmentState] = useState<AssessmentState>('selection');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [sessionTime, setSessionTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [answers, setAnswers] = useState<any[]>([]);
  const navigate = useNavigate();

  // Timer for session tracking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (assessmentState === 'active' && !isPaused) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [assessmentState, isPaused]);

  // Countdown timer
  useEffect(() => {
    if (assessmentState === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (assessmentState === 'countdown' && countdown === 0) {
      setAssessmentState('active');
    }
  }, [assessmentState, countdown]);

  const startAssessment = async (difficulty: DifficultyLevel) => {
    setSelectedDifficulty(difficulty);
    setAssessmentState('countdown');
    setCountdown(3);
    
    try {
      const newAssessment = await start.mutateAsync(difficulty);
      setAssessment(newAssessment);
      setCurrentQuestion(0);
      setSessionTime(0);
      setAnswers([]);
    } catch (error) {
      console.error('Failed to start assessment:', error);
      setAssessmentState('selection');
    }
  };

  const handleAnswer = async (option: number, timeSpent: number, confidence?: number) => {
    if (!assessment) return;

    const currentQ = assessment.questions[currentQuestion];
    const answerData = {
      questionId: currentQ.id,
      selectedAnswer: option,
      timeSpent,
      confidence: confidence || 3
    };

    setAnswers(prev => [...prev, answerData]);

    try {
      const updatedAssessment = await answer.mutateAsync({
        assessmentId: assessment.id,
        ...answerData
      });

      setAssessment(updatedAssessment);

      if (currentQuestion + 1 < updatedAssessment.questions.length) {
        setTimeout(() => {
          setCurrentQuestion(prev => prev + 1);
        }, 1000);
      } else {
        setAssessmentState('completed');
        setTimeout(async () => {
          try {
            const results = await finish.mutateAsync(updatedAssessment.id);
            setAssessment({ ...updatedAssessment, results });
            setAssessmentState('results');
          } catch (error) {
            console.error('Failed to finish assessment:', error);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    setAssessmentState(isPaused ? 'active' : 'paused');
  };

  const restartAssessment = () => {
    setAssessment(null);
    setCurrentQuestion(0);
    setAssessmentState('selection');
    setSelectedDifficulty(null);
    setSessionTime(0);
    setAnswers([]);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = (): number => {
    if (!assessment) return 0;
    return ((currentQuestion + 1) / assessment.questions.length) * 100;
  };

  // Loading state
  if (start.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-medium text-gray-700">Preparing your assessment...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <AnimatePresence mode="wait">
        
        {/* Difficulty Selection */}
        {assessmentState === 'selection' && (
          <motion.div
            key="selection"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="container mx-auto px-6 py-12"
          >
            <div className="max-w-4xl mx-auto">
              
              {/* Header */}
              <motion.div variants={itemVariants} className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Target size={32} className="text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Skills Assessment
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Choose your difficulty level and test your knowledge with our comprehensive assessment system
                </p>
              </motion.div>

              {/* Difficulty Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {(Object.keys(difficultyConfig) as DifficultyLevel[]).map((difficulty, index) => {
                  const config = difficultyConfig[difficulty];
                  const IconComponent = config.icon;
                  
                  return (
                    <motion.div
                      key={difficulty}
                      variants={itemVariants}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                           onClick={() => startAssessment(difficulty)}>
                        
                        {/* Difficulty Level Indicator */}
                        <div className="flex items-center justify-between mb-6">
                          <div className={`w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                            <IconComponent size={24} className="text-white" />
                          </div>
                          <div className="flex space-x-1">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-6 rounded-full ${
                                  i < config.level ? `bg-${config.color}-500` : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-gray-900 capitalize">
                            {difficulty}
                          </h3>
                          <p className="text-gray-600">
                            {config.description}
                          </p>
                          
                          {/* Stats */}
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock size={16} className="mr-2" />
                              <span>{config.estimatedTime}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Target size={16} className="mr-2" />
                              <span>{config.questions} questions</span>
                            </div>
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300" />
                        
                        {/* Action Arrow */}
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight size={20} className={`text-${config.color}-500`} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Assessment Info */}
              <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                      <Brain size={24} className="text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Adaptive Questions</h4>
                    <p className="text-sm text-gray-600">Questions adapt based on your performance</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                      <TrendingUp size={24} className="text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Detailed Analytics</h4>
                    <p className="text-sm text-gray-600">Get comprehensive performance insights</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                      <Trophy size={24} className="text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Instant Results</h4>
                    <p className="text-sm text-gray-600">Receive immediate feedback and scores</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Countdown */}
        {assessmentState === 'countdown' && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="min-h-screen flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`w-32 h-32 bg-gradient-to-br ${difficultyConfig[selectedDifficulty!].gradient} rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl`}
              >
                <span className="text-6xl font-bold text-white">
                  {countdown || "GO!"}
                </span>
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get Ready!
              </h2>
              <p className="text-gray-600">
                Your {selectedDifficulty} assessment is about to begin
              </p>
            </div>
          </motion.div>
        )}

        {/* Assessment Active */}
        {(assessmentState === 'active' || assessmentState === 'paused') && assessment && (
          <motion.div
            key="active"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-6 py-6"
          >
            {/* Assessment Header */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                
                {/* Progress Info */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${difficultyConfig[selectedDifficulty!].gradient} rounded-xl flex items-center justify-center`}>
                      <Target size={20} className="text-white" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900 capitalize">
                        {selectedDifficulty} Assessment
                      </h2>
                      <p className="text-sm text-gray-500">
                        Question {currentQuestion + 1} of {assessment.questions.length}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="hidden md:block flex-1 max-w-md">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>Progress</span>
                      <span>{Math.round(calculateProgress())}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 bg-gradient-to-r ${difficultyConfig[selectedDifficulty!].gradient} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateProgress()}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-4">
                  {/* Timer */}
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <Clock size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {formatTime(sessionTime)}
                    </span>
                  </div>

                  {/* Pause/Resume */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePause}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isPaused ? <Play size={16} /> : <Pause size={16} />}
                    <span className="text-sm font-medium">
                      {isPaused ? 'Resume' : 'Pause'}
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Mobile Progress Bar */}
              <div className="md:hidden mt-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(calculateProgress())}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 bg-gradient-to-r ${difficultyConfig[selectedDifficulty!].gradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${calculateProgress()}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Pause Overlay */}
            {assessmentState === 'paused' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4"
                >
                  <div className="text-center">
                    <Pause size={48} className="text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Assessment Paused</h3>
                    <p className="text-gray-600 mb-6">Take your time. Click resume when you're ready to continue.</p>
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={restartAssessment}
                        className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Restart
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={togglePause}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Resume
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Question */}
            {!isPaused && (
              <motion.div variants={itemVariants}>
                <QuestionCard
                  q={assessment.questions[currentQuestion]}
                  index={currentQuestion}
                  totalQuestions={assessment.questions.length}
                  onSelect={handleAnswer}
                  isLoading={answer.isLoading}
                />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Completion Screen */}
        {assessmentState === 'completed' && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex items-center justify-center"
          >
            <div className="text-center max-w-lg mx-auto px-6">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
              >
                <CheckCircle size={40} className="text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Assessment Complete!
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Great job! We're calculating your results...
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto animate-pulse" />
            </div>
          </motion.div>
        )}

        {/* Results Screen */}
        {assessmentState === 'results' && assessment?.results && (
          <motion.div
            key="results"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-6 py-12"
          >
            <div className="max-w-4xl mx-auto">
              
              {/* Results Header */}
              <motion.div variants={itemVariants} className="text-center mb-12">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <Trophy size={32} className="text-white" />
                </motion.div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Assessment Results
                </h1>
                <p className="text-xl text-gray-600">
                  Here's how you performed on your {selectedDifficulty} assessment
                </p>
              </motion.div>

              {/* Score Card */}
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {Math.round(assessment.results.score * 100)}%
                    </div>
                    <div className="text-sm font-medium text-gray-600">Overall Score</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {assessment.results.correct}
                    </div>
                    <div className="text-sm font-medium text-gray-600">Correct Answers</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {formatTime(sessionTime)}
                    </div>
                    <div className="text-sm font-medium text-gray-600">Time Taken</div>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={restartAssessment}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RotateCcw size={20} />
                  <span>Take Another Assessment</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/learner')}
                  className="flex items-center justify-center space-x-2 px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowRight size={20} />
                  <span>Back to Dashboard</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
