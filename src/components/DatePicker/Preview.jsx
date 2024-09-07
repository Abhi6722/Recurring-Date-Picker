import { useDatePicker } from '@/contexts/DatePickerContext';
import { Calendar } from '@/components/ui/calendar';
import { addDays, addWeeks, addMonths, addYears, isSameDay, getDay, startOfWeek, isWithinInterval } from 'date-fns';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Preview() {
  const {
    startDate,
    endDate,
    recurrenceType,
    recurrenceInterval,
    selectedDays,
    nthDays,
    nthDaysOfWeek,
  } = useDatePicker();

  const getRecurringDates = () => {
    if (recurrenceType === 'none') return [startDate];

    const dates = [];
    let currentDate = new Date(startDate);
    const maxDate = endDate || addYears(startDate, 1);

    const getNthDayOfMonth = (date, n, dayOfWeek) => {
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const firstDayOfWeekInMonth = addDays(firstDayOfMonth, (dayOfWeek - getDay(firstDayOfMonth) + 7) % 7);
      
      if (n === 'last') {
        let lastOccurrence = firstDayOfWeekInMonth;
        while (addWeeks(lastOccurrence, 1).getMonth() === date.getMonth()) {
          lastOccurrence = addWeeks(lastOccurrence, 1);
        }
        return lastOccurrence;
      }
      
      const weekMultiplier = ['first', 'second', 'third', 'fourth'].indexOf(n);
      return addWeeks(firstDayOfWeekInMonth, weekMultiplier);
    };

    const addDateIfWithinRange = (date) => {
      if (isWithinInterval(date, { start: startDate, end: maxDate })) {
        dates.push(new Date(date));
      }
    };

    while (currentDate <= maxDate) {
      switch (recurrenceType) {
        case 'daily':
          addDateIfWithinRange(currentDate);
          currentDate = addDays(currentDate, recurrenceInterval);
          break;
        case 'weekly':
          const weekStart = startOfWeek(currentDate);
          for (let i = 0; i < 7; i++) {
            const day = addDays(weekStart, i);
            const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'short' });
            if (selectedDays.includes(dayOfWeek)) {
              addDateIfWithinRange(day);
            }
          }
          currentDate = addWeeks(weekStart, recurrenceInterval);
          break;
        case 'monthly':
          for (const nthDay of nthDays) {
            for (const dayOfWeek of nthDaysOfWeek) {
              const nthDayDate = getNthDayOfMonth(currentDate, nthDay, daysOfWeek.indexOf(dayOfWeek));
              if (nthDayDate.getMonth() === currentDate.getMonth()) {
                addDateIfWithinRange(nthDayDate);
              }
            }
          }
          currentDate = addMonths(currentDate, recurrenceInterval);
          break;
          case 'yearly':
            for (const nthDay of nthDays) {
              for (const month of nthDaysOfWeek) {
                const monthIndex = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(month.toLowerCase());
                if (monthIndex !== -1) {
                  const nthDayDate = getNthDayOfMonth(new Date(currentDate.getFullYear(), monthIndex, 1), nthDay, currentDate.getDay());
                  if (nthDayDate.getFullYear() === currentDate.getFullYear()) {
                    addDateIfWithinRange(nthDayDate);
                  }
                }
              }
            }
            currentDate = addYears(currentDate, recurrenceInterval);
            break;
      }
    }

    return dates;
  };

  const recurringDates = getRecurringDates();

  return (
    <div className="bg-white rounded-lg">
      <h3 className="mb-4 text-xl font-semibold text-slate-800">Preview</h3>
      <Calendar
        mode="multiple"
        selected={recurringDates}
        className="rounded-md border border-slate-200"
        classNames={{
          day_selected: "bg-slate-600 text-slate-50 hover:bg-slate-500 focus:bg-slate-500",
          day_today: "bg-slate-100 text-slate-900",
        }}
        modifiers={{
          recurring: (date) => recurringDates.some((d) => isSameDay(d, date)),
        }}
        modifiersStyles={{
          recurring: { 
            backgroundColor: 'rgb(51, 65, 85)',
            color: 'white',
            fontWeight: 'bold'
          },
        }}
      />
    </div>
  );
}