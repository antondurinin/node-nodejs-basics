/* If test in powershell and in current project
$env:RSS_NAME="Anton"
>> $env:RSS_AGE="38"
>> node cli/env.js  
*/
const parseEnv = () => {
  const envVar = Object.entries(process.env)
    .filter(([key]) => key.startsWith("RSS_")) // Search for RSS_
    .map(([key, value]) => `${key}=${value}`) // Move to array what we are got
    .join("; "); // Semicolon to see it in right way
  // Print it or print Not found
  console.log(envVar || "No RSS_ environment variables found");
};

parseEnv();
