'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useStudentStore } from '@/hooks/useStudentStore';

export function ProgressChart() {
  const { filteredStudents } = useStudentStore();

  // Aggregate weekly progress data
  const chartData = filteredStudents.length > 0 
    ? filteredStudents[0].weeklyProgress.map(week => {
        const weekData = { week: week.week };
        
        // Add progress data for each student (limit to first 5 for readability)
        filteredStudents.slice(0, 5).forEach((student, index) => {
          const studentWeek = student.weeklyProgress.find(w => w.week === week.week);
          weekData[`student${index + 1}`] = studentWeek?.progress || 0;
        });
        
        return weekData;
      })
    : [];

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Weekly Progress Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              {filteredStudents.slice(0, 5).map((student, index) => (
                <Line
                  key={student.id}
                  type="monotone"
                  dataKey={`student${index + 1}`}
                  stroke={colors[index]}
                  strokeWidth={2}
                  name={student.name}
                  dot={{ fill: colors[index], strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}