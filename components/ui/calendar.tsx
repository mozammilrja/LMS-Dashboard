'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, DayPickerProps } from 'react-day-picker';
import { cn } from '@/lib/utils';

// Extend props with optional Tailwind class overrides
export type CalendarProps = DayPickerProps & {
  className?: string;
  classNames?: Partial<DayPickerProps['classNames']>;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      weekStartsOn={0}
      className={cn(
        'w-[360px] rounded-md bg-white shadow-md p-4 text-center',
        className
      )}
      classNames={{
        months: 'flex flex-col',
        month: '',
        caption: 'flex items-center justify-between mb-2 relative',
        caption_label: 'text-lg font-bold text-gray-900 mx-auto',
        nav: 'flex items-center gap-2',
        nav_button:
          'h-6 w-6 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-100',
        nav_button_previous: 'absolute left-0',
        nav_button_next: 'absolute right-0',
        table: 'w-full border-collapse',
        head_row: 'flex justify-between',
        head_cell:
          'text-[13px] text-gray-600 font-semibold w-9 h-9 flex items-center justify-center',
        row: 'flex justify-between',
        cell: 'w-9 h-9 flex items-center justify-center',
        day: 'text-sm text-gray-900 w-9 h-9 rounded-full hover:bg-gray-200',
        day_selected: 'bg-blue-600 text-white font-semibold hover:bg-blue-700',
        day_today: 'text-black font-medium',
        day_outside: 'text-gray-300',
        ...classNames,
      }}
      // components={{
      //   IconLeft: () => <ChevronLeft className="w-4 h-4" />,
      //   IconRight: () => <ChevronRight className="w-4 h-4" />,
      // }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
