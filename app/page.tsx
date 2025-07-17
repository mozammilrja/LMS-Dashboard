'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BarChart3, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">LMS Admin Dashboard</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive student progress analytics and performance tracking for your learning management system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Analytics Dashboard
              </CardTitle>
              <CardDescription>
                Track student performance with detailed KPIs and metrics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Student Management
              </CardTitle>
              <CardDescription>
                Monitor individual student progress and engagement
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Performance Insights
              </CardTitle>
              <CardDescription>
                Visualize trends and identify areas for improvement
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Access Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}