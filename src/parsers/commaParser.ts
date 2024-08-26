/**
 * Parses a cron pattern with comma-separated values.
 * 
 * @param pattern - The cron pattern string containing comma-separated values.
 * @param lower - The minimum allowed value for the range.
 * @param max - The maximum allowed value for the range.
 * @returns An object with methods to check if the pattern matches and to parse the pattern.
 */
function commaParser(pattern: string, lower: number, max: number) {

  /**
   * Checks if the pattern matches the comma-separated number format.
   * 
   * @returns `true` if the pattern matches the format, `false` otherwise.
   */
  function isMatched(): boolean {
    return /^[0-9]+(,[0-9]+)*$/.test(pattern);
  }

  /**
   * Parses the comma-separated pattern and returns a string of values.
   * 
   * @returns A string of values separated by spaces.
   * @throws An error if any value is out of the specified range.
   */
  function doParser(): string {
    return pattern
      .split(',')
      .map((part) => {
        const numPart = parseInt(part, 10);
        if (numPart < lower || numPart > max) {
          throw new Error(`Value ${numPart} in pattern "${pattern}" is out of the allowed range (${lower}-${max}).`);
        }
        return numPart.toString();
      })
      .join(' ');
  }

  return { isMatched, doParser };
}

export default commaParser;
