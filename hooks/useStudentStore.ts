'use client';

import { create } from 'zustand';
import { Student, DashboardFilters, DashboardKPIs } from '@/types/student';
import { mockStudents } from '@/lib/fake-data';
import { isWithinInterval } from 'date-fns';

interface StudentStore {
  students: Student[];
  filteredStudents: Student[];
  filters: DashboardFilters;
  selectedStudent: Student | null;
  kpis: DashboardKPIs;

  // Actions
  setFilters: (filters: Partial<DashboardFilters>) => void;
  setSelectedStudent: (student: Student | null) => void;
  applyFilters: () => void;
  calculateKPIs: () => void;
  resetFilters: () => void;
}

const initialFilters: DashboardFilters = {
  courseFilter: 'all',
  dateRange: {
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // first of month
    to: new Date() // today
  },
  performanceTier: 'all'
};

export const useStudentStore = create<StudentStore>((set, get) => ({
  students: mockStudents,
  filteredStudents: mockStudents,
  filters: initialFilters,
  selectedStudent: null,
  kpis: {
    totalTasksAssigned: 0,
    totalTasksCompleted: 0,
    totalQuestionsAssigned: 0,
    totalQuestionsCompleted: 0,
    avgCourseCompletion: 0,
    avgTimeSpent: 0,
    lastActiveCount: 0,
    avgAccuracy: 0
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().applyFilters();
    get().calculateKPIs();
  },

  setSelectedStudent: (student) => {
    set({ selectedStudent: student });
  },

  applyFilters: () => {
    const { students, filters } = get();

    const filtered = students.filter((student) => {
      // Course filter
      if (filters.courseFilter !== 'all' && student.course !== filters.courseFilter) {
        return false;
      }

      // Performance tier filter
      if (filters.performanceTier !== 'all' && student.performanceTier !== filters.performanceTier) {
        return false;
      }

      // Date range filter (based on lastActive)
      if (filters.dateRange.from && filters.dateRange.to) {
        return isWithinInterval(student.lastActive, {
          start: filters.dateRange.from,
          end: filters.dateRange.to
        });
      }

      return true;
    });

    set({ filteredStudents: filtered });
  },

  calculateKPIs: () => {
    const { filteredStudents } = get();

    if (filteredStudents.length === 0) {
      set({
        kpis: {
          totalTasksAssigned: 0,
          totalTasksCompleted: 0,
          totalQuestionsAssigned: 0,
          totalQuestionsCompleted: 0,
          avgCourseCompletion: 0,
          avgTimeSpent: 0,
          lastActiveCount: 0,
          avgAccuracy: 0
        }
      });
      return;
    }

    const totalTasksAssigned = filteredStudents.reduce((sum, student) => sum + student.tasksAssigned, 0);
    const totalTasksCompleted = filteredStudents.reduce((sum, student) => sum + student.tasksCompleted, 0);
    const totalQuestionsAssigned = filteredStudents.reduce((sum, student) => sum + student.questionsAssigned, 0);
    const totalQuestionsCompleted = filteredStudents.reduce((sum, student) => sum + student.questionsCompleted, 0);
    const avgCourseCompletion = filteredStudents.reduce((sum, student) => sum + student.courseProgress, 0) / filteredStudents.length;
    const avgTimeSpent = filteredStudents.reduce((sum, student) => sum + student.timeSpent, 0) / filteredStudents.length;
    const avgAccuracy = filteredStudents.reduce((sum, student) => sum + student.accuracy, 0) / filteredStudents.length;

    // Active in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const lastActiveCount = filteredStudents.filter(student => student.lastActive >= sevenDaysAgo).length;

    set({
      kpis: {
        totalTasksAssigned,
        totalTasksCompleted,
        totalQuestionsAssigned,
        totalQuestionsCompleted,
        avgCourseCompletion: Math.round(avgCourseCompletion),
        avgTimeSpent: Math.round(avgTimeSpent),
        lastActiveCount,
        avgAccuracy: Math.round(avgAccuracy)
      }
    });
  },

  resetFilters: () => {
    set({ filters: initialFilters });
    get().applyFilters();
    get().calculateKPIs();
  }
}));

// Initialize immediately
useStudentStore.getState().applyFilters();
useStudentStore.getState().calculateKPIs();
