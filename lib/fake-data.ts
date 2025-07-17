import { Student } from '@/types/student';
import { addDays, subDays, format } from 'date-fns';

const courses = [
  'JavaScript Fundamentals',
  'React Advanced',
  'Node.js Backend',
  'Python Data Science',
  'Machine Learning',
  'UI/UX Design',
  'Database Management',
  'Mobile Development'
];

const names = [
  'Alex Johnson', 'Sarah Chen', 'Michael Rodriguez', 'Emma Davis',
  'David Wilson', 'Jessica Thompson', 'Ryan Martinez', 'Ashley Brown',
  'Christopher Lee', 'Amanda Garcia', 'Justin Miller', 'Nicole Anderson',
  'Brandon Taylor', 'Stephanie White', 'Kevin Clark', 'Rachel Turner',
  'Tyler Scott', 'Melissa Adams', 'Andrew Phillips', 'Lauren Harris'
];

const milestoneTemplates = [
  { title: 'Completed First Module', weight: 10 },
  { title: 'Mastered Basic Concepts', weight: 25 },
  { title: 'First Assignment Submitted', weight: 40 },
  { title: 'Mid-term Project Completed', weight: 60 },
  { title: 'Advanced Topics Mastered', weight: 80 },
  { title: 'Final Exam Passed', weight: 95 },
  { title: 'Course Completion Certificate', weight: 100 }
];

function generateWeeklyProgress(): Array<{ week: string; progress: number; accuracy: number }> {
  const weeks = [];
  for (let i = 7; i >= 0; i--) {
    const date = subDays(new Date(), i * 7);
    weeks.push({
      week: format(date, 'MMM dd'),
      progress: Math.floor(Math.random() * 100),
      accuracy: Math.floor(Math.random() * 40) + 60 // 60-100%
    });
  }
  return weeks;
}

function generateMilestones(courseProgress: number) {
  return milestoneTemplates.map((template, index) => ({
    id: `milestone-${index}`,
    title: template.title,
    completed: courseProgress >= template.weight,
    completedDate: courseProgress >= template.weight ? 
      subDays(new Date(), Math.floor(Math.random() * 30)) : undefined
  }));
}

function getPerformanceTier(accuracy: number, courseProgress: number): 'high' | 'medium' | 'low' {
  if (accuracy >= 85 && courseProgress >= 80) return 'high';
  if (accuracy >= 70 && courseProgress >= 60) return 'medium';
  return 'low';
}

export function generateMockStudents(count: number = 50): Student[] {
  return Array.from({ length: count }, (_, index) => {
    const tasksAssigned = Math.floor(Math.random() * 20) + 10;
    const tasksCompleted = Math.floor(Math.random() * tasksAssigned);
    const questionsAssigned = Math.floor(Math.random() * 100) + 50;
    const questionsCompleted = Math.floor(Math.random() * questionsAssigned);
    const courseProgress = Math.floor(Math.random() * 100);
    const accuracy = Math.floor(Math.random() * 40) + 60;
    
    return {
      id: `student-${index + 1}`,
      name: names[index % names.length],
      email: `${names[index % names.length].toLowerCase().replace(' ', '.')}@example.com`,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + index}?w=64&h=64&fit=crop&crop=face`,
      course: courses[Math.floor(Math.random() * courses.length)],
      enrollmentDate: subDays(new Date(), Math.floor(Math.random() * 180)),
      tasksAssigned,
      tasksCompleted,
      questionsAssigned,
      questionsCompleted,
      courseProgress,
      timeSpent: Math.floor(Math.random() * 1000) + 100,
      lastActive: subDays(new Date(), Math.floor(Math.random() * 7)),
      accuracy,
      performanceTier: getPerformanceTier(accuracy, courseProgress),
      weeklyProgress: generateWeeklyProgress(),
      milestones: generateMilestones(courseProgress)
    };
  });
}

export const mockStudents = generateMockStudents();