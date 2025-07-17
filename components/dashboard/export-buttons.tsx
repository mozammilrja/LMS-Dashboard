'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Table } from 'lucide-react';
import { useStudentStore } from '@/hooks/useStudentStore';
import { exportToPDF, exportToCSV } from '@/lib/export-utils';
import { useState } from 'react';

export function ExportButtons() {
  const { filteredStudents, kpis, filters } = useStudentStore();
  const [isExporting, setIsExporting] = useState(false);

  const handlePDFExport = async () => {
    setIsExporting(true);
    try {
      await exportToPDF(filteredStudents, kpis, filters);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCSVExport = () => {
    setIsExporting(true);
    try {
      exportToCSV(filteredStudents, kpis);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Download className="h-5 w-5 mr-2" />
          Export Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handlePDFExport}
            disabled={isExporting || filteredStudents.length === 0}
            className="flex items-center space-x-2"
            variant="outline"
          >
            <FileText className="h-4 w-4" />
            <span>Export PDF</span>
          </Button>
          
          <Button
            onClick={handleCSVExport}
            disabled={isExporting || filteredStudents.length === 0}
            className="flex items-center space-x-2"
            variant="outline"
          >
            <Table className="h-4 w-4" />
            <span>Export CSV</span>
          </Button>
        </div>
        
        {filteredStudents.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">
            No data available to export. Please adjust your filters.
          </p>
        )}
        
        {isExporting && (
          <p className="text-sm text-blue-600 mt-2">
            Preparing export...
          </p>
        )}
      </CardContent>
    </Card>
  );
}