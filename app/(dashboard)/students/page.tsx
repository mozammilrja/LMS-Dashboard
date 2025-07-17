'use client';

import { ComingSoon } from '@/components/common/coming-soon';
import { Users } from 'lucide-react';

export default function StudentsPage() {
  return (
    <ComingSoon 
      title="Students Management"
      description="Advanced student management features including individual profiles, course assignments, and detailed performance tracking will be available here."
      icon={Users}
    />
  );
}