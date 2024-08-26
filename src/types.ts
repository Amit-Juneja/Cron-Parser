import commaParser from "./parsers/commaParser";
import incrementParser from "./parsers/incrementParser";
import rangeParser from "./parsers/rangeParser";
import starParser from "./parsers/starParser";

// Array of available parsers
const parsers = [
  starParser,
  rangeParser,
  commaParser,
  incrementParser,
];

// Interface defining the structure of a parser object
interface Parser {
  isMatched: () => boolean;
  doParser: () => string;
}

/**
 * Handles the parsing of a cron pattern based on available parsers.
 * 
 * @param pattern - The cron pattern string to be parsed.
 * @param lower - The minimum allowed value for the pattern.
 * @param max - The maximum allowed value for the pattern.
 * @returns The parsed result as a string, or `null` if no parser matches.
 */
function handleType(pattern: string, lower: number, max: number): string | null {
  for (const parser of parsers) {
    // Create a parser object
    const parserObj: Parser = parser(pattern, lower, max);
    
    // Check if the parser matches the pattern
    if (parserObj.isMatched()) {
      // Return the parsed result
      return parserObj.doParser();
    }
  }
  
  // Return null if no parser matches the pattern
  return null;
}

export default handleType;
