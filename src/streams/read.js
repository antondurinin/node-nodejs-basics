// Use read stream from fs
import { createReadStream } from "fs";
const read = async () => {
  // Set URL to file
  const fileUrl = new URL("./files/fileToRead.txt", import.meta.url);
  // Create stream for reading and we need file format to avoid buffer type
  const streamToRead = createReadStream(fileUrl, "utf8");
  // Execute data chunks from stream and write them
  streamToRead.on("data", (chunk) => {
    process.stdout.write(chunk);
    console.log(chunk);
  });
};
await read();
