import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import Papa from 'papaparse';
import { Student, DashboardKPIs } from '@/types/student';
import { format } from 'date-fns';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportToPDF = async (
  students: Student[],
  kpis: DashboardKPIs,
  filters: any
) => {
  const pdf = new jsPDF();
  
  // Add title
  pdf.setFontSize(20);
  pdf.text('Student Progress Analytics Report', 20, 20);
  
  // Add generation date
  pdf.setFontSize(10);
  pdf.text(`Generated on: ${format(new Date(), 'PPP')}`, 20, 30);
  
  // Add filters info
  let yPosition = 40;
  pdf.setFontSize(12);
  pdf.text('Applied Filters:', 20, yPosition);
  yPosition += 10;
  
  pdf.setFontSize(10);
  if (filters.courseFilter !== 'all') {
    pdf.text(`Course: ${filters.courseFilter}`, 25, yPosition);
    yPosition += 8;
  }
  if (filters.performanceTier !== 'all') {
    pdf.text(`Performance: ${filters.performanceTier}`, 25, yPosition);
    yPosition += 8;
  }
  pdf.text(`Date Range: ${format(filters.dateRange.from, 'MMM dd, yyyy')} - ${format(filters.dateRange.to, 'MMM dd, yyyy')}`, 25, yPosition);
  yPosition += 15;
  
  // Add KPIs
  pdf.setFontSize(14);
  pdf.text('Key Performance Indicators', 20, yPosition);
  yPosition += 10;
  
  const kpiData = [
    ['Metric', 'Value'],
    ['Total Tasks Assigned', kpis.totalTasksAssigned.toString()],
    ['Tasks Completed', kpis.totalTasksCompleted.toString()],
    ['Total Questions Assigned', kpis.totalQuestionsAssigned.toString()],
    ['Questions Completed', kpis.totalQuestionsCompleted.toString()],
    ['Average Course Completion', `${kpis.avgCourseCompletion}%`],
    ['Average Time Spent', `${Math.floor(kpis.avgTimeSpent / 60)}h ${kpis.avgTimeSpent % 60}m`],
    ['Active Students (Last 7 Days)', kpis.lastActiveCount.toString()],
    ['Average Accuracy', `${kpis.avgAccuracy}%`]
  ];
  
  pdf.autoTable({
    head: [kpiData[0]],
    body: kpiData.slice(1),
    startY: yPosition,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246] },
    margin: { left: 20, right: 20 }
  });
  
  // Add student data table
  yPosition = (pdf as any).lastAutoTable.finalY + 20;
  
  pdf.setFontSize(14);
  pdf.text('Student Details', 20, yPosition);
  yPosition += 10;
  
  const studentData = students.map(student => [
    student.name,
    student.course,
    `${student.courseProgress}%`,
    format(student.lastActive, 'MMM dd, yyyy'),
    `${student.accuracy}%`,
    student.performanceTier,
    `${student.tasksCompleted}/${student.tasksAssigned}`,
    `${student.questionsCompleted}/${student.questionsAssigned}`
  ]);
  
  pdf.autoTable({
    head: [['Name', 'Course', 'Progress', 'Last Active', 'Accuracy', 'Performance', 'Tasks', 'Questions']],
    body: studentData,
    startY: yPosition,
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] },
    margin: { left: 20, right: 20 },
    styles: { fontSize: 8 }
  });
  
  // Save the PDF
  pdf.save(`student-analytics-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

export const exportToCSV = (students: Student[], kpis: DashboardKPIs) => {
  const csvData = students.map(student => ({
    Name: student.name,
    Email: student.email,
    Course: student.course,
    'Enrollment Date': format(student.enrollmentDate, 'yyyy-MM-dd'),
    'Course Progress (%)': student.courseProgress,
    'Last Active': format(student.lastActive, 'yyyy-MM-dd'),
    'Accuracy (%)': student.accuracy,
    'Performance Tier': student.performanceTier,
    'Tasks Assigned': student.tasksAssigned,
    'Tasks Completed': student.tasksCompleted,
    'Questions Assigned': student.questionsAssigned,
    'Questions Completed': student.questionsCompleted,
    'Time Spent (minutes)': student.timeSpent
  }));
  
  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `student-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};