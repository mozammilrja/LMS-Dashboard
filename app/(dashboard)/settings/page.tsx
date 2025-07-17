'use client';

import { ComingSoon } from '@/components/common/coming-soon';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <ComingSoon 
      title="Settings"
      description="Configuration options for user accounts, system preferences, and administrative tools will be available here."
      icon={Settings}
    />
  );
}
