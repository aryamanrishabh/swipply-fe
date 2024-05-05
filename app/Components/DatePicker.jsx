import { forwardRef, useState } from "react";
import dayjs from "dayjs";
import range from "lodash.range";
import ReactDatePicker from "react-datepicker";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "react-datepicker/dist/react-datepicker.css";

const months = Object.freeze([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const CalendarInput = forwardRef(({ date, onClick }, ref) => {
  const textClass = !date ? "text-gray-300" : "text-gray-600";
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`custom-input flex w-full border-[1px] rounded outline-none py-2 px-3 text-sm cursor-default ${textClass} bg-white border-gray-400`}
    >
      {date ? dayjs(date)?.format("MMMM DD, YYYY") : "Select Date"}
    </div>
  );
});

CalendarInput.displayName = "CalendarInput";

const CalendarHeader = (props) => {
  let maxYear = dayjs()?.year();
  if (props?.increaseMaxYear) maxYear += 10;

  const years = range(maxYear, 1939, -1);

  const {
    monthDate,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  } = props || {};
  const [showYears, setShowYears] = useState(false);
  const [showMonths, setShowMonths] = useState(false);

  const toggleShowYears = () => {
    setShowYears((prev) => !prev);
    setShowMonths(false);
  };

  const toggleShowMonths = () => {
    setShowMonths((prev) => !prev);
    setShowYears(false);
  };

  const handleChangeMonth = (index) => {
    changeMonth(index);
    setShowMonths(false);
  };

  const handleChangeYear = (year) => {
    changeYear(year);
    setShowYears(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex p-3">
        <FiChevronLeft
          size="1.5rem"
          cursor="pointer"
          onClick={decreaseMonth}
          opacity={prevMonthButtonDisabled ? 0 : 1}
          pointerEvents={prevMonthButtonDisabled ? "none" : "all"}
        />
      </div>

      <div className="flex items-center gap-x-2">
        <div className="flex relative w-20 justify-center">
          <span
            onClick={toggleShowMonths}
            className="font-semibold text-sm text-gray-700 cursor-pointer tracking-wide"
          >
            {dayjs(monthDate)?.format("MMMM")}
          </span>

          {showMonths && (
            <div className="flex flex-col w-full top-6 z-50 overflow-auto max-h-44 absolute bg-white border-[1px] border-gray-300">
              {months?.map((month, i) => (
                <div
                  key={month}
                  onClick={() => handleChangeMonth(i)}
                  className="flex w-full cursor-pointer py-2 px-0 text-xs font-medium text-gray-700 justify-center hover:bg-gray-200"
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex relative w-12 justify-center">
          <span
            onClick={toggleShowYears}
            className="font-semibold text-gray-700 cursor-pointer tracking-widest"
          >
            {dayjs(monthDate)?.format("YYYY")}
          </span>

          {showYears && (
            <div className="flex flex-col w-full top-6 z-50 overflow-auto max-h-44 absolute bg-white border-[1px] border-gray-300">
              {years?.map((year) => (
                <div
                  key={year}
                  onClick={() => handleChangeYear(year)}
                  className="flex w-full cursor-pointer py-2 px-0 text-xs font-medium text-gray-700 justify-center hover:bg-gray-200"
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex p-3">
        <FiChevronRight
          size="1.5rem"
          cursor="pointer"
          onClick={increaseMonth}
          opacity={nextMonthButtonDisabled ? 0 : 1}
          pointerEvents={nextMonthButtonDisabled ? "none" : "all"}
        />
      </div>
    </div>
  );
};

const CalendarContainer = ({ className, children, onApply, onCancel }) => (
  <div
    className={`flex flex-col bg-white border-[0.75px] border-gray-200 shadow-xl ${className}`}
  >
    {children}
    <div className="flex gap-x-5 items-center py-4 px-6 border-t-[1px] border-t-gray-200">
      <button
        onClick={onCancel}
        className="flex-1 cursor-pointer text-gray-700 font-medium text-sm tracking-widest rounded-lg py-3 px-4 border-[1px] bg-white border-gray-300"
      >
        CANCEL
      </button>
      <button
        onClick={onApply}
        className="flex-1 cursor-pointer text-white font-medium text-sm tracking-widest rounded-lg py-3 px-4 border-[1px] bg-cyan-600 border-cyan-600"
      >
        APPLY
      </button>
    </div>
  </div>
);

const DatePicker = ({
  min,
  max,
  open,
  date,
  setDate,
  increaseMaxYear = false,
  toggleCalendar = () => {},
}) => {
  const today = dayjs()?.toDate();
  const [internalSelectedDate, setInternalSelectedDate] = useState(
    date || today
  );

  const onCancel = () => {
    if (!date) setInternalSelectedDate(today);
    toggleCalendar();
  };

  const onApply = () => {
    setDate(internalSelectedDate);
    toggleCalendar();
  };

  return (
    <div id="wrapper" className="flex w-full">
      <ReactDatePicker
        show
        open={open}
        value={date}
        minDate={min}
        maxDate={max}
        showPopperArrow={false}
        onInputClick={toggleCalendar}
        selected={internalSelectedDate}
        onClickOutside={toggleCalendar}
        onChange={setInternalSelectedDate}
        customInput={<CalendarInput date={date} />}
        calendarContainer={({ className, children }) => (
          <CalendarContainer
            onApply={onApply}
            onCancel={onCancel}
            className={className}
          >
            {children}
          </CalendarContainer>
        )}
        renderCustomHeader={(props) => (
          <CalendarHeader increaseMaxYear={increaseMaxYear} {...props} />
        )}
      />
    </div>
  );
};

export default DatePicker;
