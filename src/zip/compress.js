import { createGzip } from "zlib";
import { pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";
// Use async promisified
import { promisify } from "util";
// Promisified pipeline
const pipe = promisify(pipeline);
// Make new async func
const compress = async () => {
  async function do_gzip(input, output) {
    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
  }
  // Execute new func
  do_gzip(
    "./src/zip/files/fileToCompress.txt",
    "./src/zip/files/archive.gz"
  ).catch((err) => {
    console.error("Error happened while zipping:", err);
    process.exitCode = 1;
  });
};
await compress();
