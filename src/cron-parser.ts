/*
 * A Cron Expression Parser:
 * Parses a cron expression into its components:
 * (minute)(hour)(day of month)(month)(day of week)(command)
 * 
 * Supported formats:
 * * = all possible values
 * - = range of time units
 * , = comma-separated time units
 * / = increments (e.g., "15 means every 15 units)
 */

import handleType from './types';
import { aCron } from './utils';

// Defines the structure of the result object from parsing a cron expression
interface ParseResult {
  minuteResult: string;
  hourResult: string;
  dayOfMonthResult: string;
  monthResult: string;
  dayOfWeekResult: string;
  commandResult: string;
}

// Defines the structure of unit information used for parsing
interface UnitInfo {
  lower: number;
  max: number;
}

/**
 * Parses a single unit of time based on its type and value.
 * 
 * @param type - The type of time unit (e.g., 'minute', 'hour').
 * @param unit - The cron pattern for the time unit.
 * @returns A string representing the parsed values.
 */
function parseTime(type: keyof typeof aCron, unit: string): string {
  const { lower, max }: UnitInfo = aCron[type];
  return handleType(unit, lower, max);
}

/**
 * Provides functionality to parse and format a cron expression.
 */
const Parser = {
  /**
   * Parses a cron expression and returns its components.
   * 
   * @param args - An array where the first element is the cron expression.
   * @returns An object containing parsed results for each cron component.
   * @throws An error if the cron expression format is invalid.
   */
  parse(args: string[]): ParseResult {
    if (args.length !== 1) {
      throw new Error('Cron expression must be a single string.');
    }

    const cron = args[0].split(' ');

    if (cron.length !== 6) {
      throw new Error('Invalid cron format. Expected 6 components.');
    }

    const [minute, hour, dayOfMonth, month, dayOfWeek, command] = cron;

    return {
      minuteResult: parseTime('minute', minute),
      hourResult: parseTime('hour', hour),
      dayOfMonthResult: parseTime('dayOfMonth', dayOfMonth),
      monthResult: parseTime('month', month),
      dayOfWeekResult: parseTime('dayOfWeek', dayOfWeek),
      commandResult: command,
    };
  },

  /**
   * Formats the parsed cron components into a human-readable string.
   * 
   * @param obj - The parsed cron results.
   * @returns A formatted string displaying each component and its result.
   */
  formatOutput(obj: ParseResult): string {
    const COLUMN_WIDTH = 18;

    const components = [
      { label: 'Minute', value: 'minuteResult' },
      { label: 'Hour', value: 'hourResult' },
      { label: 'Day of Month', value: 'dayOfMonthResult' },
      { label: 'Month', value: 'monthResult' },
      { label: 'Day of Week', value: 'dayOfWeekResult' },
      { label: 'Command', value: 'commandResult' },
    ];

    return components
      .map(({ label, value }) => `${label.padEnd(COLUMN_WIDTH)} ${obj[value]}`)
      .join('\n');
  },
};

export default Parser;
