import { Transform as transformStream } from "stream";
const reverseTransform = new transformStream({
  transform(chunk, encoding, callback) {
    // Convert chunk to string, revers it
    const reversedChunk = chunk.toString().split("").reverse().join("");
    this.push(reversedChunk);
    callback();
  },
});
const transform = async () => {
  // Create a transform stream to reverse text
  // Pipe stdin to the reverseTransform stream and then to stdout
  process.stdin.pipe(reverseTransform).pipe(process.stdout);
  // Handle errors for stdin
  process.stdin.on("error", (err) => {
    console.error("Error reading from stdin:", err);
    process.exit(1);
  });
  // Handle errors for the transform stream
  reverseTransform.on("error", (err) => {
    console.error("Error in transform stream:", err);
    process.exit(1);
  });
  // Handle errors for stdout
  process.stdout.on("error", (err) => {
    console.error("Error writing to stdout:", err);
    process.exit(1);
  });
};
await transform();
// Simulate end of input after 5 seconds for testing
setTimeout(() => {
  process.stdin.emit("end");
}, 5000);
