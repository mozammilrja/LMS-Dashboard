// 'use client';

// import * as React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { DayPicker } from 'react-day-picker';

// import { cn } from '@/lib/utils';

// export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: CalendarProps) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       weekStartsOn={0} // Sunday
//       className={cn(
//         'rounded-md w-fit bg-white shadow-md px-4 py-3',
//         className
//       )}
//       classNames={{
//         months: 'flex flex-col space-y-4',
//         month: 'space-y-4',
//         caption:
//           'relative flex items-center justify-center font-semibold text-lg',
//         caption_label: 'text-center text-lg font-bold',
//         nav: 'flex items-center absolute top-1/2 -translate-y-1/2 w-full justify-between px-2',
//         nav_button: 'rounded-full text-blue-600 hover:bg-blue-100 p-1',
//         nav_button_previous: '',
//         nav_button_next: '',
//         table: 'w-full border-collapse',
//         head_row: 'flex justify-between text-sm text-gray-600 px-1',
//         head_cell: 'w-9 h-9 text-center font-medium text-gray-500',
//         row: 'flex justify-between px-1',
//         cell: 'w-9 h-9 text-center relative',
//         day: 'w-9 h-9 rounded-md hover:bg-blue-100 text-black text-sm',
//         day_selected: 'bg-blue-600 text-white font-semibold',
//         day_today: 'border border-blue-500',
//         day_outside: 'text-gray-300',
//         ...classNames,
//       }}
//       components={{
//         IconLeft: () => <ChevronLeft className="h-4 w-4 text-blue-600" />,
//         IconRight: () => <ChevronRight className="h-4 w-4 text-blue-600" />,
//       }}
//       {...props}
//     />
//   );
// }

// Calendar.displayName = 'Calendar';

// export { Calendar };


'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      weekStartsOn={0} // Start from Sunday
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
        day_selected:
          'bg-blue-600 text-white font-semibold hover:bg-blue-700',
        day_today: 'text-black font-medium',
        day_outside: 'text-gray-300',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="w-4 h-4" />,
        IconRight: () => <ChevronRight className="w-4 h-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
