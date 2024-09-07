"use client"

import React, { useState } from 'react';
import { useDatePicker } from '@/contexts/DatePickerContext';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isAfter } from 'date-fns';

export default function DateRangePicker() {
  const { startDate, setStartDate, endDate, setEndDate } = useDatePicker();
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const handleStartDateSelect = (date) => {
    setStartDate(date);
    setIsStartOpen(false);
    if (endDate && isAfter(date, endDate)) {
      setEndDate(null);
    }
  };

  const handleEndDateSelect = (date) => {
    if (!startDate || isAfter(date, startDate)) {
      setEndDate(date);
      setIsEndOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="w-full sm:w-1/2">
          <label className="block mb-2 font-semibold text-lg">Start Date</label>
          <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-16 justify-start text-left font-normal text-lg">
                <span className="truncate">
                  {startDate ? format(startDate, 'PPP') : 'Pick a date'}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="bg-white border rounded-md shadow-lg p-2">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  className="rounded-md border-0"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
          <label className="block mb-2 font-semibold text-lg">End Date (Optional)</label>
          <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-16 justify-start text-left font-normal text-lg">
                <span className="truncate">
                  {endDate ? format(endDate, 'PPP') : 'Pick a date'}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="bg-white border rounded-md shadow-lg p-2">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateSelect}
                  disabled={(date) => !startDate || isAfter(startDate, date)}
                  initialFocus
                  className="rounded-md border-0"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}