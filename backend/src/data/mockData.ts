// src/data/mockData.ts
import type {
  User,
  AgentStatus,
  SystemMetrics,
  DepartmentAnalytics
} from "../types";

/* ------------------------------------------------------------------ */
/*  USERS                                                             */
/* ------------------------------------------------------------------ */

export const mockUsers: User[] = [
  /* ────────────────────────────────────────────────────────── Sarah ── */
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    password: "123456",
    department: "Engineering",
    role: "learner",
    workflowStatus: {
      profileLoaded: true,
      assessmentPending: false,
      assessmentCompleted: true,
      recommendationsGenerated: true,
      learningInProgress: true,
      currentStep: 4,
      lastUpdated: new Date()
    },
    skillProfile: {
      userId: "1",
      skills: [
        { skill: "JavaScript", proficiency: 85, confidence: 90, lastAssessed: new Date() },
        { skill: "React", proficiency: 78, confidence: 82, lastAssessed: new Date() },
        { skill: "Node.js", proficiency: 65, confidence: 70, lastAssessed: new Date() },
        { skill: "Python", proficiency: 45, confidence: 50, lastAssessed: new Date() }
      ],
      lastUpdated: new Date(),
      completedCourses: ["JS-101", "REACT-BASICS", "API-DESIGN"],
      performanceRatings: [
        { area: "Code Quality",    score: 4.2, date: new Date(), reviewer: "John Smith" },
        { area: "Problem Solving", score: 4.5, date: new Date(), reviewer: "Jane Doe" }
      ]
    },
    learningPath: {
      id: "lp-1",
      userId: "1",
      estimatedTime: 120,
      completionPercentage: 35,
      generatedAt: new Date(),
      reasoning:
        "Strong JS & React; path focuses on advanced React patterns plus Python to become full-stack.",
      modules: [
        {
          id: "m1",
          title: "Advanced React Patterns",
          description: "Master hooks, context & performance optimisation",
          estimatedTime: 40,
          status: "completed",
          skills: ["React", "JavaScript"],
          prerequisites: ["REACT-BASICS"],
          content: [
            { type: "video",    title: "Custom Hooks Deep Dive", duration: 25, completed: true },
            { type: "exercise", title: "Build a Custom Hook",   duration: 15, completed: true }
          ]
        },
        {
          id: "m2",
          title: "Python Fundamentals",
          description: "Syntax, data structures & OOP",
          estimatedTime: 50,
          status: "in_progress",
          skills: ["Python"],
          prerequisites: [],
          content: [
            { type: "article",  title: "Python Syntax Guide",     duration: 20, completed: true },
            { type: "exercise", title: "Data Structures Practice",duration: 30, completed: false }
          ]
        },
        {
          id: "m3",
          title: "API Development with FastAPI",
          description: "Build REST APIs in Python",
          estimatedTime: 30,
          status: "not_started",
          skills: ["Python", "API Design"],
          prerequisites: ["m2"],
          content: [
            { type: "video",    title: "FastAPI Introduction", duration: 15, completed: false },
            { type: "exercise", title: "Build Your First API", duration: 15, completed: false }
          ]
        }
      ]
    }
  },

  /* ────────────────────────────── New spotlight:  Data engineer ─── */
  {
    id: "2",
    name: "Aisha Singh",
    email: "aisha.singh@company.com",
    password: "123456",
    department: "Data Science",
    role: "learner",
    workflowStatus: {
      profileLoaded: true,
      assessmentPending: false,
      assessmentCompleted: false,
      recommendationsGenerated: false,
      learningInProgress: false,
      currentStep: 2,
      lastUpdated: new Date()
    },
    skillProfile: {
      userId: "2",
      skills: [
        { skill: "Python",      proficiency: 80, confidence: 75, lastAssessed: new Date() },
        { skill: "SQL",         proficiency: 88, confidence: 85, lastAssessed: new Date() },
        { skill: "Spark",       proficiency: 60, confidence: 55, lastAssessed: new Date() },
        { skill: "AWS Glue",    proficiency: 40, confidence: 45, lastAssessed: new Date() }
      ],
      lastUpdated: new Date(),
      completedCourses: ["PY-ADV", "SQL-PERF"],
      performanceRatings: [
        { area: "Data Modelling",  score: 4.1, date: new Date(), reviewer: "Emily Johnson" }
      ]
    }
  },

  /* ────────────────────────────── New spotlight:  Marketing lead ── */
  {
    id: "3",
    name: "Michael Rodriguez",
    email: "michael.rodriguez@company.com",
    password: "123456",
    department: "Marketing",
    role: "learner",
    workflowStatus: {
      profileLoaded: true,
      assessmentPending: true,
      assessmentCompleted: false,
      recommendationsGenerated: false,
      learningInProgress: false,
      currentStep: 2,
      lastUpdated: new Date()
    }
  },

  /* ───────────────────────────────────────────────────────── Emily ─*/
  {
    id: "4",
    name: "Emily Johnson",
    email: "emily.johnson@company.com",
    password: "123456",
    department: "HR",
    role: "admin",
    workflowStatus: {
      profileLoaded: true,
      assessmentPending: false,
      assessmentCompleted: false,
      recommendationsGenerated: false,
      learningInProgress: false,
      currentStep: 1,
      lastUpdated: new Date()
    }
  },

  /* ────────────────────────── Extra engineers / sales / finance ─── */
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@company.com",
    password: "123456",
    department: "Engineering",
    role: "learner",
    workflowStatus: {
      profileLoaded: true,
      assessmentPending: false,
      assessmentCompleted: true,
      recommendationsGenerated: true,
      learningInProgress: false,
      currentStep: 3,
      lastUpdated: new Date()
    }
  },
  {
    id: "6",
    name: "Olivia Garcia",
    email: "olivia.garcia@company.com",
    password: "123456",
    department: "Finance",
    role: "learner",
    workflowStatus: {
      profileLoaded: true,
      assessmentPending: false,
      assessmentCompleted: false,
      recommendationsGenerated: false,
      learningInProgress: false,
      currentStep: 1,
      lastUpdated: new Date()
    }
  },
  {
    id: "7",
    name: "Raj Patel",
    email: "raj.patel@company.com",
    password: "123456",
    department: "Sales",
    role: "learner",
    workflowStatus: {
      profileLoaded: true,
      assessmentPending: true,
      assessmentCompleted: false,
      recommendationsGenerated: false,
      learningInProgress: false,
      currentStep: 2,
      lastUpdated: new Date()
    }
  },
  {
    id: "8",
    name: "Laura Adams",
    email: "laura.adams@company.com",
    password: "123456",
    department: "Engineering",
    role: "learner",
    workflowStatus: {
      profileLoaded: false,
      assessmentPending: true,
      assessmentCompleted: false,
      recommendationsGenerated: false,
      learningInProgress: false,
      currentStep: 1,
      lastUpdated: new Date()
    }
  },
  {
    id: "9",
    name: "Chen Wei",
    email: "chen.wei@company.com",
    password: "123456",
    department: "Data Science",
    role: "learner",
    workflowStatus: {
      profileLoaded: true,
      assessmentPending: true,
      assessmentCompleted: false,
      recommendationsGenerated: false,
      learningInProgress: false,
      currentStep: 2,
      lastUpdated: new Date()
    }
  },
  {
    id: "10",
    name: "Grace Lee",
    email: "grace.lee@company.com",
    password: "123456",
    department: "Marketing",
    role: "admin",
    workflowStatus: {
      profileLoaded: true,
      assessmentPending: false,
      assessmentCompleted: false,
      recommendationsGenerated: false,
      learningInProgress: false,
      currentStep: 1,
      lastUpdated: new Date()
    }
  }
];

/* ------------------------------------------------------------------ */
/*  AGENT MONITOR                                                     */
/* ------------------------------------------------------------------ */

export const mockAgentStatuses: AgentStatus[] = [
  { name: "Profile Agent",     status: "active",     queueSize: 3, averageLatency: 250, errorRate: 0.02, lastActivity: new Date() },
  { name: "Assessment Agent",  status: "processing", queueSize: 7, averageLatency: 450, errorRate: 0.01, lastActivity: new Date() },
  { name: "Recommender Agent", status: "active",     queueSize: 2, averageLatency: 180, errorRate: 0.03, lastActivity: new Date() },
  { name: "Tracker Agent",     status: "idle",       queueSize: 0, averageLatency: 120, errorRate: 0.00, lastActivity: new Date() },
  { name: "Content Agent",     status: "active",     queueSize: 1, averageLatency: 90,  errorRate: 0.01, lastActivity: new Date() } // NEW
];

/* ------------------------------------------------------------------ */
/*  SYSTEM-LEVEL METRICS                                              */
/* ------------------------------------------------------------------ */

export const mockSystemMetrics: SystemMetrics = {
  totalUsers:           mockUsers.length,
  activeUsers:          112,
  completedAssessments: 518,
  generatedPaths:       372,
  averageCompletionRate: 0.71
};

/* ------------------------------------------------------------------ */
/*  DEPARTMENT ANALYTICS                                              */
/* ------------------------------------------------------------------ */

export const mockDepartmentAnalytics: DepartmentAnalytics[] = [
  {
    department: "Engineering",
    userCount: 48,
    averageSkillLevel: 74,
    completionRate: 0.79,
    topSkillGaps: ["Machine Learning", "Cloud Architecture", "DevOps"],
    recommendedTraining: ["AWS Certification", "Docker & Kubernetes", "ML Fundamentals"]
  },
  {
    department: "Marketing",
    userCount: 28,
    averageSkillLevel: 66,
    completionRate: 0.68,
    topSkillGaps: ["Data Analytics", "SEO", "Content Strategy"],
    recommendedTraining: ["Google Analytics", "SEO Mastery", "Content Marketing"]
  },
  {
    department: "Sales",
    userCount: 35,
    averageSkillLevel: 70,
    completionRate: 0.73,
    topSkillGaps: ["CRM Systems", "Negotiation", "Product Knowledge"],
    recommendedTraining: ["Salesforce Training", "Advanced Negotiation", "Product Deep Dive"]
  },
  {
    department: "Data Science",
    userCount: 18,
    averageSkillLevel: 69,
    completionRate: 0.65,
    topSkillGaps: ["Spark", "MLOps", "Data Governance"],
    recommendedTraining: ["Apache Spark Basics", "MLOps on AWS", "Data Governance 101"]
  },
  {
    department: "Finance",
    userCount: 12,
    averageSkillLevel: 63,
    completionRate: 0.61,
    topSkillGaps: ["Power BI", "Forecast Modelling", "SQL"],
    recommendedTraining: ["Power BI Dashboards", "Financial Forecasting", "SQL for Analysts"]
  }
];
