import { rm } from "fs/promises";
const remove = async () => {
  // Set URL of file
  const filenameUrl = new URL("./files/fileToRemove.txt", import.meta.url);
  // Try to delete URL
  try {
    await rm(filenameUrl);
  } catch (error) {
    // If file is not accessible
    throw new Error("FS operatong failed");
  }
};
await remove();
