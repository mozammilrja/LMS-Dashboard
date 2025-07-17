'use client';

import { ComingSoon } from '@/components/common/coming-soon';
import { BookOpen } from 'lucide-react';

export default function CoursesPage() {
  return (
    <ComingSoon 
      title="Course Management"
      description="Comprehensive course management tools including curriculum design, assignment creation, and progress tracking will be available here."
      icon={BookOpen}
    />
  );
}