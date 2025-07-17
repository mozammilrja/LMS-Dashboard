'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, RotateCcw } from 'lucide-react';
import { useStudentStore } from '@/hooks/useStudentStore';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const courses = [
  'JavaScript Fundamentals',
  'React Advanced',
  'Node.js Backend',
  'Python Data Science',
  'Machine Learning',
  'UI/UX Design',
  'Database Management',
  'Mobile Development',
];

const performanceTiers = [
  { value: 'high', label: 'High Performance' },
  { value: 'medium', label: 'Medium Performance' },
  { value: 'low', label: 'Low Performance' },
];

export function Filters() {
  const { filters, setFilters, resetFilters } = useStudentStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Course Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Course</label>
            <Select
              value={filters.courseFilter}
              onValueChange={(value) => setFilters({ courseFilter: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Performance Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Performance Tier</label>
            <Select
              value={filters.performanceTier}
              onValueChange={(value) => setFilters({ performanceTier: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance Levels</SelectItem>
                {performanceTiers.map((tier) => (
                  <SelectItem key={tier.value} value={tier.value}>
                    {tier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !filters.dateRange.from && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.from ? (
                    filters.dateRange.to
                      ? `${format(filters.dateRange.from, 'MMM dd')} - ${format(filters.dateRange.to, 'MMM dd')}`
                      : `${format(filters.dateRange.from, 'MMM dd')}`
                  ) : (
                    'Select date range'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={{
                    from: filters.dateRange.from!,
                    to: filters.dateRange.to!,
                  }}
                  onSelect={(range) => {
                    if (range?.from) {
                      setFilters({
                        dateRange: {
                          from: range.from,
                          to: range.to ?? range.from, // fallback if no 'to'
                        },
                      });
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={resetFilters} className="flex items-center space-x-2">
            <RotateCcw className="h-4 w-4" />
            <span>Reset Filters</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
