/**
 * Parses a cron pattern with increment values.
 * 
 * @param pattern - The cron pattern string containing the increment format.
 * @param lower - The minimum allowed value for the range.
 * @param max - The maximum allowed value for the range.
 * @returns An object with methods to check if the pattern matches and to parse the pattern.
 */
function incrementParser(pattern: string, lower: number, max: number) {

  /**
   * Checks if the pattern matches the increment format.
   * 
   * @returns `true` if the pattern matches the format, `false` otherwise.
   */
  function isMatched(): boolean {
    return /^\*|[0-9]+\/[0-9]+$/.test(pattern);
  }

  /**
   * Parses the increment pattern and returns a string of incremented values.
   * 
   * @returns A string of incremented values separated by spaces.
   * @throws An error if the start value is out of the allowed range or if the increment is invalid.
   */
  function doParser(): string {
    const [startPart, incrementPart] = pattern.split('/');
    const increment = parseInt(incrementPart, 10);
    
    // Default start to the lower bound if '*' is used
    const start = startPart === '*' ? lower : parseInt(startPart, 10);

    if (start < lower || start > max) {
      throw new Error(`Start value ${start} is out of bounds (${lower}-${max}) in pattern "${pattern}".`);
    }

    if (increment <= 0) {
      throw new Error(`Increment value ${increment} must be greater than 0.`);
    }

    // Generate the incremented values
    const values = [];
    for (let i = start; i < max; i += increment) {
      values.push(i);
    }

    return values.join(' ');
  }

  return { isMatched, doParser };
}

export default incrementParser;
