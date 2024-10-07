import { readFile } from "fs/promises";
const read = async () => {
  // While trying to read and print do not forget to encode result
  try {
    const contents = await readFile(
      new URL("./files/fileToRead.txt", import.meta.url),
      { encoding: "utf8" }
    );
    console.log(contents);
  } catch (error) {
    // If there are no accessible file in this URL
    throw new Error("FS operating failure");
  }
};
await read();
