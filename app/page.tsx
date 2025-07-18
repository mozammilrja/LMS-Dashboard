'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  BarChart3,
  Users,
  TrendingUp,
  Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />,
    title: 'Analytics Dashboard',
    description: 'Track student performance with detailed KPIs and metrics',
  },
  {
    icon: <Users className="h-5 w-5 mr-2 text-green-600" />,
    title: 'Student Management',
    description: 'Monitor individual student progress and engagement',
  },
  {
    icon: <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />,
    title: 'Performance Insights',
    description: 'Visualize trends and identify areas for improvement',
  },
];

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAccessDashboard = () => {
    setLoading(true);
    setTimeout(() => router.push('/dashboard'), 800); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">
              LMS Admin Dashboard
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive student progress analytics and performance tracking
            for your learning management system.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleAccessDashboard}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting...
              </>
            ) : (
              'Access Dashboard'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
