'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Eye, Info } from 'lucide-react';
import { useStudentStore } from '@/hooks/useStudentStore';
import { Student } from '@/types/student';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import React from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

interface StudentTableProps {
  onStudentClick: (student: Student) => void;
}

export function StudentTable({ onStudentClick }: StudentTableProps) {
  const { filteredStudents } = useStudentStore();

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

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

const Row = ({ index, style }: ListChildComponentProps) => {
  const student = filteredStudents[index];
  return (
    <div
      style={style}
      key={student.id}
      className="border-b hover:bg-gray-50 transition-colors cursor-pointer px-4 py-2 space-y-2"
    >
      {/* Student Data Row */}
      <div
        className="grid grid-cols-7 gap-2 items-start"
        role="button"
        tabIndex={0}
        onClick={() => onStudentClick(student)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onStudentClick(student);
          }
        }}
      >
        <div className="flex items-center space-x-3 overflow-hidden">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>
              {student.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-medium text-sm truncate">{student.name}</div>
            <div className="text-xs text-gray-500 truncate">{student.email}</div>
          </div>
        </div>
        <div className="text-sm truncate">{student.course}</div>
        <div className="flex items-center space-x-2">
          <Progress value={student.courseProgress} className="w-20" />
          <span className="text-sm font-medium">{student.courseProgress}%</span>
        </div>
        <div className="text-sm text-gray-600 truncate">
          {format(student.lastActive, 'MMM dd, yyyy')}
        </div>
        <div
          className={cn(
            'text-sm font-medium truncate',
            getAccuracyColor(student.accuracy)
          )}
        >
          {student.accuracy}%
        </div>
        <div>
          <Badge
            variant="secondary"
            className={getPerformanceBadgeColor(student.performanceTier)}
          >
            {student.performanceTier}
          </Badge>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onStudentClick(student);
            }}
            aria-label={`View details for ${student.name}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Milestones Row */}
      <div className="col-span-7 bg-gray-50/50 px-2 py-2 rounded-md">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-gray-500 mr-2">Milestones:</span>
          {student.milestones.filter((m) => m.completed).slice(0, 3).map((milestone) => (
            <Badge
              key={milestone.id}
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              {milestone.title}
            </Badge>
          ))}
          {student.milestones.filter((m) => m.completed).length > 3 && (
            <Badge
              variant="outline"
              className="bg-gray-50 text-gray-600 border-gray-200"
            >
              +{student.milestones.filter((m) => m.completed).length - 3} more
            </Badge>
          )}
          {student.milestones.filter((m) => m.completed).length === 0 && (
            <span className="text-gray-400">No milestones completed yet</span>
          )}
        </div>
      </div>
    </div>
  );
};


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Student Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-2 px-4 py-3 bg-gray-100 text-xs text-gray-600 font-medium border-b">
              <Tooltip>
                <TooltipTrigger className="flex items-center space-x-1">
                  <span>Student</span>
                  <Info className="h-3 w-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Student name and email address</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center space-x-1">
                  <span>Course</span>
                  <Info className="h-3 w-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Currently enrolled course</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center space-x-1">
                  <span>Progress</span>
                  <Info className="h-3 w-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Course completion percentage</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center space-x-1">
                  <span>Last Active</span>
                  <Info className="h-3 w-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Last login or activity date</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center space-x-1">
                  <span>Accuracy</span>
                  <Info className="h-3 w-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Average accuracy across all assessments</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center space-x-1">
                  <span>Performance</span>
                  <Info className="h-3 w-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Overall performance tier based on accuracy and progress
                  </p>
                </TooltipContent>
              </Tooltip>
              <span>Actions</span>
            </div>

            {/* Virtualized List */}
            <List
              height={600}
              itemCount={filteredStudents.length}
              itemSize={120}
              width="100%"
            >
              {Row}
            </List>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
