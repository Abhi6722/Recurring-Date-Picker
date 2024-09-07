"use client"

import { DatePickerProvider } from '@/contexts/DatePickerContext';
import DateRangePicker from '@/components/DatePicker/DateRangePicker';
import RecurrenceOptions from '@/components/DatePicker/RecurrenceOptions';
import Preview from '@/components/DatePicker/Preview';

export default function DatePicker() {
  return (
    <DatePickerProvider>
      <div className="p-6 space-y-8">
        <h2 className="text-3xl font-bold text-center">Recurring Date Picker</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <DateRangePicker />
            <RecurrenceOptions />
          </div>
          <div className="flex justify-center items-center">
            <Preview />
          </div>
        </div>
      </div>
    </DatePickerProvider>
  );
}