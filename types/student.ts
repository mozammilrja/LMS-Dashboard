export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  course: string;
  enrollmentDate: Date;
  tasksAssigned: number;
  tasksCompleted: number;
  questionsAssigned: number;
  questionsCompleted: number;
  courseProgress: number;
  timeSpent: number; // in minutes
  lastActive: Date;
  accuracy: number;
  performanceTier: 'high' | 'medium' | 'low';
  weeklyProgress: Array<{
    week: string;
    progress: number;
    accuracy: number;
  }>;
  milestones: Array<{
    id: string;
    title: string;
    completed: boolean;
    completedDate?: Date;
  }>;
}

export interface DashboardFilters {
  courseFilter: string;
  dateRange: {
    from: Date;
    to: Date;
  };
  performanceTier: string;
}

export interface DashboardKPIs {
  totalTasksAssigned: number;
  totalTasksCompleted: number;
  totalQuestionsAssigned: number;
  totalQuestionsCompleted: number;
  avgCourseCompletion: number;
  avgTimeSpent: number;
  lastActiveCount: number;
  avgAccuracy: number;
}