"use client"

import React, { createContext, useContext, useState } from 'react';

const DatePickerContext = createContext();

export function DatePickerProvider({ children }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [recurrenceType, setRecurrenceType] = useState('none');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [nthDays, setNthDays] = useState([]);
  const [nthDaysOfWeek, setNthDaysOfWeek] = useState([]);

  const value = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    recurrenceType,
    setRecurrenceType,
    recurrenceInterval,
    setRecurrenceInterval,
    selectedDays,
    setSelectedDays,
    nthDays,
    setNthDays,
    nthDaysOfWeek,
    setNthDaysOfWeek,
  };

  return (
    <DatePickerContext.Provider value={value}>
      {children}
    </DatePickerContext.Provider>
  );
}

export function useDatePicker() {
  return useContext(DatePickerContext);
}