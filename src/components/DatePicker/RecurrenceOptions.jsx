import { useDatePicker } from '@/contexts/DatePickerContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RecurrenceOptions() {
  const {
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
    specificDay,
    setSpecificDay,
  } = useDatePicker();

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const nthOptions = ['First', 'Second', 'Third', 'Fourth', 'Last'];
  const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleNthDayChange = (option) => {
    setNthDays(prev =>
      prev.includes(option.toLowerCase())
        ? prev.filter(day => day !== option.toLowerCase())
        : [...prev, option.toLowerCase()]
    );
  };

  const handleNthDayOfWeekChange = (day) => {
    setNthDaysOfWeek(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="space-y-4 w-80">
      <div>
        <Label htmlFor="recurrence-type">Recurrence</Label>
        <Select id="recurrence-type" value={recurrenceType} onValueChange={setRecurrenceType}>
          <SelectTrigger>
            <SelectValue placeholder="Select recurrence type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="none">No recurrence</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {recurrenceType !== 'none' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="recurrence-interval">Repeat every</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="recurrence-interval"
                type="number"
                min="1"
                value={recurrenceInterval}
                onChange={(e) => setRecurrenceInterval(parseInt(e.target.value) || 1)}
                className="w-16"
              />
              <span>{recurrenceType === 'daily' ? 'day(s)' : recurrenceType.slice(0, -2) + '(s)'}</span>
            </div>
          </div>

          {recurrenceType === 'weekly' && (
            <div>
              <Label>Repeat on</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day}
                    variant={selectedDays.includes(day) ? 'default' : 'outline'}
                    className={selectedDays.includes(day) ? 'bg-slate-700 text-white hover:bg-slate-800' : ''}
                    onClick={() => {
                      if (selectedDays.includes(day)) {
                        setSelectedDays(selectedDays.filter((d) => d !== day));
                      } else {
                        setSelectedDays([...selectedDays, day]);
                      }
                    }}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {(recurrenceType === 'monthly' || recurrenceType === 'yearly') && (
            <div className="space-y-4">
              {specificDay ? (
                <div>
                  <Label>Day of month</Label>
                  <Input
                    type="number"
                    min="1"
                    max="31"
                    value={nthDays[0] || ''}
                    onChange={(e) => setNthDays([e.target.value])}
                    className="w-16 mt-2"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <Label>Repeat on the</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {nthOptions.map((option) => (
                        <Button
                          key={option}
                          variant={nthDays.includes(option.toLowerCase()) ? 'default' : 'outline'}
                          className={nthDays.includes(option.toLowerCase()) ? 'bg-slate-700 text-white hover:bg-slate-800' : ''}
                          onClick={() => handleNthDayChange(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Day of the {recurrenceType === 'yearly' ? 'month' : 'week'}</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(recurrenceType === 'yearly' ? monthsOfYear : daysOfWeek).map((item) => (
                        <Button
                          key={item}
                          variant={nthDaysOfWeek.includes(item) ? 'default' : 'outline'}
                          className={nthDaysOfWeek.includes(item) ? 'bg-slate-700 text-white hover:bg-slate-800' : ''}
                          onClick={() => handleNthDayOfWeekChange(item)}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}