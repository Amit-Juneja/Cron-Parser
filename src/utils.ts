/**
 * Defines the boundaries for each time unit in a cron expression.
 */
interface TimeUnit {
  lower: number; // Minimum allowed value for the time unit
  max: number;   // Maximum allowed value for the time unit
}

/**
 * Defines the time units used in a cron expression.
 */
interface Cron {
  minute: TimeUnit;
  hour: TimeUnit;
  dayOfMonth: TimeUnit;
  month: TimeUnit;
  dayOfWeek: TimeUnit;
}

// Configuration for cron time units
const aCron: Cron = {
  minute: {
    lower: 0,
    max: 59,
  },
  hour: {
    lower: 0,
    max: 23, // Corrected to 23 for 24-hour format
  },
  dayOfMonth: {
    lower: 1, // Corrected to 1 as day of month typically starts from 1
    max: 31,
  },
  month: {
    lower: 1, // Corrected to 1 for months (1-12)
    max: 12,
  },
  dayOfWeek: {
    lower: 0, // 0 or 1 depending on the system; 0 often represents Sunday
    max: 7,   // 7 is often used to represent Sunday in some systems
  },
};

/**
 * Creates a string representation of a range of values.
 * 
 * @param start - The starting value of the range.
 * @param end - The ending value of the range.
 * @returns A string containing the range of values separated by spaces.
 */
function createRange(start: number, end: number): string {
  if (start > end) {
    throw new Error('Start value cannot be greater than end value.');
  }

  // Generate a string of values in the range [start, end]
  const values = Array.from({ length: end - start + 1 }, (_, i) => start + i)
                       .join(' ');
  
  return values;
}

export { aCron, createRange };
