"use client";

import { useEffect, useState } from "react";
import { KPICard } from "@/components/dashboard/kpi-card";
import { Filters } from "@/components/dashboard/filters";
import { ExportButtons } from "@/components/dashboard/export-buttons";
// import { StudentTable } from '@/components/dashboard/student-table';
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { StudentModal } from "@/components/dashboard/student-modal";
import { useStudentStore } from "@/hooks/useStudentStore";
import { Student } from "@/types/student";

import {
  BookOpen,
  CheckCircle,
  HelpCircle,
  Clock,
  TrendingUp,
  Users,
  Target,
  Zap,
} from "lucide-react";
import dynamic from "next/dynamic";

const StudentTable = dynamic(
  () =>
    import("@/components/dashboard/student-table").then(
      (mod) => mod.StudentTable
    ),
  { ssr: false }
);

export default function DashboardPage() {
  const { kpis, calculateKPIs } = useStudentStore();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    calculateKPIs();
  }, [calculateKPIs]);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back! Here's what's happening with your students.
        </div>
      </div>

      {/* Filters */}
      <Filters />

      {/* Export Buttons */}
      <ExportButtons />

      {/* KPI Cards */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Tasks Assigned"
          value={kpis.totalTasksAssigned}
          description="Total number of tasks assigned to all students"
          icon={BookOpen}
          trend={{ value: 12, isPositive: true }}
        />
        <KPICard
          title="Tasks Completed"
          value={kpis.totalTasksCompleted}
          subtitle={`${
            Math.round(
              (kpis.totalTasksCompleted / kpis.totalTasksAssigned) * 100
            ) || 0
          }% completion rate`}
          description="Number of tasks successfully completed by students"
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
        />
        <KPICard
          title="Total Questions"
          value={kpis.totalQuestionsAssigned}
          description="Total questions assigned across all courses"
          icon={HelpCircle}
          trend={{ value: 5, isPositive: true }}
        />
        <KPICard
          title="Questions Completed"
          value={kpis.totalQuestionsCompleted}
          subtitle={`${
            Math.round(
              (kpis.totalQuestionsCompleted / kpis.totalQuestionsAssigned) * 100
            ) || 0
          }% completion rate`}
          description="Questions answered by students"
          icon={Target}
          trend={{ value: 15, isPositive: true }}
        />
        <KPICard
          title="Course Completion"
          value={`${kpis.avgCourseCompletion}%`}
          subtitle="Average across all students"
          description="Average course completion percentage"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <KPICard
          title="Time Spent"
          value={`${Math.floor(kpis.avgTimeSpent / 60)}h ${
            kpis.avgTimeSpent % 60
          }m`}
          subtitle="Average per student"
          description="Average time spent learning per student"
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
        />
        <KPICard
          title="Active Students"
          value={kpis.lastActiveCount}
          subtitle="Active in last 7 days"
          description="Students who were active in the past week"
          icon={Users}
          trend={{ value: 3, isPositive: true }}
        />
        <KPICard
          title="Average Accuracy"
          value={`${kpis.avgAccuracy}%`}
          subtitle="Across all assessments"
          description="Average accuracy rate across all student assessments"
          icon={Zap}
          trend={{ value: 2, isPositive: true }}
        />
      </div> 

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <ProgressChart />
      </div>

      {/* Student Table */}
      <StudentTable onStudentClick={handleStudentClick} />

      {/* Student Modal */}
      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
