'use client';

import { ComingSoon } from '@/components/common/coming-soon';
import { TrendingUp } from 'lucide-react';

export default function PerformancePage() {
  return (
    <ComingSoon 
      title="Performance Insights"
      description="Detailed performance analysis, benchmarking tools, and improvement recommendations will be available here."
      icon={TrendingUp}
    />
  );
}