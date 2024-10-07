import { readdir } from "fs/promises";
const list = async () => {
  // Try to log what inside dir
  try {
    const files = await readdir(new URL("./files", import.meta.url));
    // Log files inside
    for (const file of files) console.log(file);
  } catch (error) {
    // If there are no access to dir
    throw new Error("FS operating failure");
  }
};
await list();
