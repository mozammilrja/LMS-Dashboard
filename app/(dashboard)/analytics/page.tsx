'use client';

import { ComingSoon } from '@/components/common/coming-soon';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <ComingSoon 
      title="Advanced Analytics"
      description="Deep dive analytics with custom reports, predictive insights, and advanced data visualization tools will be available here."
      icon={BarChart3}
    />
  );
}