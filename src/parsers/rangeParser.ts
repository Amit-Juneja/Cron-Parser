import { createRange } from '../utils';

/**
 * Parses a cron pattern with range values.
 * 
 * @param pattern - The cron pattern string containing the range format.
 * @param lower - The minimum allowed value for the range.
 * @param max - The maximum allowed value for the range.
 * @returns An object with methods to check if the pattern matches and to parse the pattern.
 */
function rangeParser(pattern: string, lower: number, max: number) {

  /**
   * Checks if the pattern matches the range format.
   * 
   * @returns `true` if the pattern matches the format, `false` otherwise.
   */
  function isMatched(): boolean {
    return /^[0-9]+-[0-9]+$/.test(pattern);
  }

  /**
   * Parses the range pattern and returns a string of values within the range.
   * 
   * @returns A string of values separated by spaces.
   * @throws An error if the range format is invalid or out of bounds.
   */
  function doParser(): string {
    const [startPart, endPart] = pattern.split('-');
    const start = parseInt(startPart, 10);
    const end = parseInt(endPart, 10);

    // Validate range values
    if (isNaN(start) || isNaN(end)) {
      throw new Error(`Invalid range format: "${pattern}". Both start and end must be valid numbers.`);
    }

    if (start > end) {
      throw new Error(`Invalid range: "${pattern}". The start value (${start}) cannot be greater than the end value (${end}).`);
    }

    if (start < lower || end > max) {
      throw new Error(`Range out of bounds: "${pattern}". Start (${start}) and end (${end}) must be between ${lower} and ${max}.`);
    }

    return createRange(start, end);
  }

  return { isMatched, doParser };
}

export default rangeParser;
