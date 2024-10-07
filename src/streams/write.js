// Use wright strem from fs
import { createWriteStream } from "fs";
const write = async () => {
  // Set url to file
  const fileUrl = new URL("./files/fileToWrite.txt", import.meta.url);
  // Start writeble stream
  const streamToWrite = createWriteStream(fileUrl, "utf8");
  const writeStdin = () => {
    process.stdin.pipe(streamToWrite);
    // Close the writable stream when stdin ends
    process.stdin.on("end", () => {
      streamToWrite.end();
      console.log("Finished writing to file.");
    });
    // Handle errors for writable stream
    streamToWrite.on("error", (err) => {
      console.error("Error writing to file:", err);
      process.exit(1);
    });
    // Handle errors for stdin
    process.stdin.on("error", (err) => {
      console.error("Error reading from stdin:", err);
      process.exit(1);
    });
  };
  writeStdin();
};
// Call the function
await write();
// Simulate end of input after 5 seconds for testing
setTimeout(() => {
  process.stdin.emit("end");
}, 5000);
