import { createUnzip } from "zlib";
import { pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";
// Use async promisified
import { promisify } from "util";
// Promisified pipeline
const pipe = promisify(pipeline);
// Make new async func
const decompress = async () => {
  async function do_unzip(input, output) {
    const gzip = createUnzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
  }
  // Execute new func
  do_unzip(
    "./src/zip/files/archive.gz",
    "./src/zip/files/fileToCompress.txt"
  ).catch((err) => {
    console.error("Error happened while unzipping:", err);
    process.exitCode = 1;
  });
};
await decompress();
