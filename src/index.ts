import cronParser from "./cron-parser";

/**
 * Main entry point for the script.
 * Parses a cron expression from command line arguments and prints the formatted results.
 */
function main() {
  // Get command line arguments (excluding the first two elements: node and script path)
  const args = process.argv.slice(2);

  // Check if a cron expression is provided
  if (args.length === 0) {
    console.error('Error: No cron expression provided.');
    process.exit(1);
  }

  // Extract the cron expression from arguments
  const cronExpression = args[0];

  try {
    // Parse the cron expression
    const results = cronParser.parse([cronExpression]);

    // Format the parsed results
    const formattedOutput = cronParser.formatOutput(results);

    // Print the formatted output
    console.log(formattedOutput);
  } catch (error) {
    // Handle any errors that occurred during parsing or formatting
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the main function
main();
