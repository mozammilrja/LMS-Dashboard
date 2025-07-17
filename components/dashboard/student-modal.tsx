'use client';

import React, { lazy, Suspense } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  User, 
  BookOpen, 
  Clock, 
  Target, 
  CheckCircle,
  Calendar,
  Mail,
  Award
} from 'lucide-react';
import { Student } from '@/types/student';
import { format } from 'date-fns';

const LazyBarChart = lazy(() => 
  import('recharts').then(module => ({
    default: ({ data }: { data: any[] }) => {
      const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = module;
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  }))
);

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentModal({ student, isOpen, onClose }: StudentModalProps) {
  if (!student) return null;

  const getPerformanceBadgeColor = (tier: string) => {
    switch (tier) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback>
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xl font-semibold">{student.name}</div>
              <div className="text-sm text-gray-500">{student.email}</div>
              <Badge 
                variant="secondary" 
                className={`mt-1 ${getPerformanceBadgeColor(student.performanceTier)}`}
              >
                {student.performanceTier} Performance
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{student.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{student.course}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">
                    Enrolled: {format(student.enrollmentDate, 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">
                    Last Active: {format(student.lastActive, 'MMM dd, yyyy')}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Course Progress</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={student.courseProgress} className="w-20" />
                    <span className="text-sm font-medium">{student.courseProgress}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Accuracy</span>
                  <span className={`text-sm font-medium ${
                    student.accuracy >= 90 ? 'text-green-600' : 
                    student.accuracy >= 80 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {student.accuracy}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Time Spent</span>
                  <span className="text-sm font-medium">{Math.floor(student.timeSpent / 60)}h {student.timeSpent % 60}m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Milestones Completed</span>
                  <span className="text-sm font-medium text-blue-600">
                    {student.milestones.filter(m => m.completed).length}/{student.milestones.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tasks & Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Assigned</span>
                    <span className="text-sm font-medium">{student.tasksAssigned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Completed</span>
                    <span className="text-sm font-medium text-green-600">{student.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Completion Rate</span>
                    <span className="text-sm font-medium">
                      {Math.round((student.tasksCompleted / student.tasksAssigned) * 100)}%
                    </span>
                  </div>
                  <div className="mt-3">
                    <Progress 
                      value={(student.tasksCompleted / student.tasksAssigned) * 100} 
                      className="w-full" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Assigned</span>
                    <span className="text-sm font-medium">{student.questionsAssigned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Completed</span>
                    <span className="text-sm font-medium text-green-600">{student.questionsCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Completion Rate</span>
                    <span className="text-sm font-medium">
                      {Math.round((student.questionsCompleted / student.questionsAssigned) * 100)}%
                    </span>
                  </div>
                  <div className="mt-3">
                    <Progress 
                      value={(student.questionsCompleted / student.questionsAssigned) * 100} 
                      className="w-full" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Suspense fallback={
                  <div className="h-full flex items-center justify-center">
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                }>
                  <LazyBarChart data={student.weeklyProgress} />
                </Suspense>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {student.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle 
                        className={`h-5 w-5 ${
                          milestone.completed ? 'text-green-500' : 'text-gray-300'
                        }`} 
                      />
                      <span className="text-sm font-medium">{milestone.title}</span>
                    </div>
                    {milestone.completed && milestone.completedDate && (
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-gray-500">
                          {format(milestone.completedDate, 'MMM dd, yyyy')}
                        </span>
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
