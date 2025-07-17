"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudentStore } from "@/hooks/useStudentStore";

type StudentProgress = {
  week: string;
  progress: number;
};

type Student = {
  id: string | number;
  name: string;
  weeklyProgress: StudentProgress[];
};

type ChartDataPoint = {
  week: string;
  [key: string]: string | number;
};

export function ProgressChart() {
  const { filteredStudents }: { filteredStudents: Student[] } =
    useStudentStore();

  const chartData: ChartDataPoint[] =
    filteredStudents.length > 0
      ? filteredStudents[0].weeklyProgress.map((week) => {
          const weekData: ChartDataPoint = { week: week.week };
          filteredStudents.slice(0, 5).forEach((student, i) => {
            const sw = student.weeklyProgress.find((w) => w.week === week.week);
            weekData[`student${i + 1}`] = sw?.progress ?? 0;
          });
          return weekData;
        })
      : [];

  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">📈 Weekly Progress Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
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
                    key={`student-${student.id}`}
                    type="monotone"
                    dataKey={`student${index + 1}` as keyof ChartDataPoint}
                    stroke={colors[index]}
                    strokeWidth={2}
                    name={student.name}
                    dot={{ fill: colors[index], strokeWidth: 2 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
