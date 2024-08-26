import { createRange } from '../utils';

/**
 * Parses a cron pattern with the star (*) operator.
 * 
 * @param pattern - The cron pattern string containing the star (*) operator.
 * @param lower - The minimum allowed value for the range.
 * @param max - The maximum allowed value for the range.
 * @returns An object with methods to check if the pattern matches and to parse the pattern.
 */
function starParser(pattern: string, lower: number, max: number) {

  /**
   * Checks if the pattern is a star (*) operator.
   * 
   * @returns `true` if the pattern is "*", `false` otherwise.
   */
  function isMatched(): boolean {
    return pattern === '*';
  }

  /**
   * Parses the star pattern and returns a string of all possible values within the range.
   * 
   * @returns A string of values separated by spaces.
   */
  function doParser(): string {
    if (!isMatched()) {
      throw new Error(`Pattern "${pattern}" is not valid for the star parser.`);
    }
    return createRange(lower, max);
  }

  return { isMatched, doParser };
}

export default starParser;
