//need to change default rename, because it used
import { access, rename as renameFile } from "fs/promises";
const rename = async () => {
  //set url of files
  const oldFilename = new URL("./files/wrongFilename.txt", import.meta.url);
  const newFilename = new URL("./files/properFilename.md", import.meta.url);
  try {
    //searching of new file
    await access(newFilename);
    throw new Error("FS operating failed");
  } catch (error) {
    try {
      //try to rename
      await renameFile(oldFilename, newFilename);
    } catch (error) {
      //if no old file
      throw new Error("FS operating failed");
    }
  }
};
await rename();
