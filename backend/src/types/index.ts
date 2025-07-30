/* ------------------------------------------------------------------ */
/*  TOP-LEVEL USER MODEL                                              */
/* ------------------------------------------------------------------ */

export interface User {
  id: string;
  name: string;
  email: string;
  /** Stored in-memory only.  Omit or hash in production. */
  password?: string;                 // optional so admins could be SSO-only
  department: string;
  role: 'learner' | 'admin';
  skillProfile?: SkillProfile;
  learningPath?: LearningPath;
  workflowStatus: WorkflowStatus;
}

/* ------------------------------------------------------------------ */
/*  SKILL + PERFORMANCE                                               */
/* ------------------------------------------------------------------ */

export interface SkillProfile {
  userId: string;
  skills: SkillVector[];
  lastUpdated: Date;
  completedCourses: string[];
  performanceRatings: PerformanceRating[];
}

export interface SkillVector {
  skill: string;
  proficiency: number;   // 0-100
  confidence: number;    // 0-100
  lastAssessed: Date;
}

export interface PerformanceRating {
  area: string;
  score: number;         // 1-5, half-points allowed
  date: Date;
  reviewer: string;
}

/* ------------------------------------------------------------------ */
/*  ASSESSMENT FLOW                                                   */
/* ------------------------------------------------------------------ */

export interface Assessment {
  id: string;
  userId: string;
  questions: Question[];
  responses: Response[];
  score: number;                       // 0-1, set on completion
  completedAt?: Date;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;               // index of options[]
  skill: string;
  difficulty: number;                  // 1-3 scale for quick filtering
}

export interface Response {
  questionId: string;
  selectedAnswer: number;
  timeSpent: number;                   // seconds
  isCorrect: boolean;
}

/* ------------------------------------------------------------------ */
/*  LEARNING PATH + MODULES                                           */
/* ------------------------------------------------------------------ */

export interface LearningPath {
  id: string;
  userId: string;
  modules: LearningModule[];
  estimatedTime: number;               // minutes
  completionPercentage: number;        // 0-100
  generatedAt: Date;
  reasoning: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  estimatedTime: number;               // minutes
  status: 'not_started' | 'in_progress' | 'completed';
  skills: string[];
  prerequisites: string[];
  content: ModuleContent[];
}

export interface ModuleContent {
  type: 'video' | 'article' | 'exercise' | 'quiz';
  title: string;
  url?: string;
  duration: number;                    // minutes
  completed: boolean;
}

/* ------------------------------------------------------------------ */
/*  WORKFLOW + AGENT MONITOR                                          */
/* ------------------------------------------------------------------ */

export interface WorkflowStatus {
  profileLoaded: boolean;
  assessmentPending: boolean;
  assessmentCompleted: boolean;
  recommendationsGenerated: boolean;
  learningInProgress: boolean;
  /** Pointer for wizard-style UIs */
  currentStep: number;
  lastUpdated: Date;
}

export interface AgentStatus {
  name: string;                        // e.g. “Profile Agent”
  status: 'active' | 'processing' | 'idle' | 'error';
  queueSize: number;
  averageLatency: number;              // ms
  errorRate: number;                   // 0-1
  lastActivity: Date;
}

/* ------------------------------------------------------------------ */
/*  DASHBOARD-LEVEL ANALYTICS                                         */
/* ------------------------------------------------------------------ */

export interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  completedAssessments: number;
  generatedPaths: number;
  averageCompletionRate: number;       // 0-1
}

export interface DepartmentAnalytics {
  department: string;
  userCount: number;
  averageSkillLevel: number;           // 0-100
  completionRate: number;              // 0-1
  topSkillGaps: string[];
  recommendedTraining: string[];
}
