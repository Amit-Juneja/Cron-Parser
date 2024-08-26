import cronParser from "../src/cron-parser";

// Tests for the cron expression parser
describe('Cron Expression Parser', () => {

  // Test cases for handling comma-separated values in the cron expression
  describe('Comma-separated Values Parsing', () => {

    test('should correctly parse and return all minute values separated by a comma', () => {
      const result = cronParser.parse(['1,2,3,4 * * * * /folder/file']);
      const { minuteResult } = result;
      expect(minuteResult).toMatch('1 2 3 4');
    });

    test('should throw an error when minute value exceeds the upper bound', () => {
      expect(() => {
        cronParser.parse(['101,2 * * * * /folder/file']);
      }).toThrow(Error);
    });
  });

  // Test cases for handling range values in the cron expression
  describe('Range Values Parsing', () => {

    test('should correctly parse and return a range of minute values', () => {
      const result = cronParser.parse(['1-5 * * * * /folder/file']);
      const { minuteResult } = result;
      expect(minuteResult).toMatch('1 2 3 4 5');
    });

    test('should throw an error when the start of the range is greater than the end', () => {
      expect(() => {
        cronParser.parse(['4-3 * * * * /folder/file']);
      }).toThrow(Error);
    });

    test('should throw an error when the end of the range is less than the start', () => {
      expect(() => {
        cronParser.parse(['6-5 * * * * /folder/file']);
      }).toThrow(Error);
    });
  });

  // Test cases for handling the star (*) operator in the cron expression
  describe('Star (*) Operator Parsing', () => {

    test('should correctly parse and return all available day of the week values', () => {
      const result = cronParser.parse(['* * * * * /folder/file']);
      const { dayOfWeekResult } = result;
      expect(dayOfWeekResult).toMatch('1 2 3 4 5 6 7');
    });
  });

  // Test cases for handling incremental values in the cron expression
  describe('Incremental Values Parsing', () => {

    test('should correctly parse and return minute values with the specified increment', () => {
      const result = cronParser.parse(['*/15 * * * * /folder/file']);
      const { minuteResult } = result;
      expect(minuteResult).toMatch('0 15 30 45');
    });

    test('should throw an error when the start of the increment range exceeds the maximum allowed value', () => {
      expect(() => {
        cronParser.parse(['60/15 * * * * /folder/file']);
      }).toThrow(Error);
    });
  });
});
