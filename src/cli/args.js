/* To try this in project folder:
 node src\cli\args.js --name Anton --age 38
*/
const parseArgs = () => {
  // Arg "2" will show us arguments
  const args = process.argv.slice(2);
  const result = new Map();
  // Loop args
  args.forEach((arg, i) => {
    // Go into "--" in name
    if (arg.startsWith("--")) {
      // Erase "--" in name
      const argName = arg.replace("--", "");
      // We need value
      const argValue = args[i + 1];
      result.set(argName, argValue);
    }
  });
  //check for any provided args and print it
  if (result.size === 0) {
    console.log("No arguments were provided");
  } else {
    //in new loop we print "name is value"
    result.forEach((value, key) => {
      console.log(`${key} is ${value}`);
    });
  }
};
parseArgs();
