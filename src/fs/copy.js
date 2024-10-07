import { cp } from "fs/promises";
const copy = async () => {
  //file URL to "files"
  const oldDirpath = new URL("./files", import.meta.url);
  const newDirpath = new URL("./files_copy", import.meta.url);
  try {
    await cp(oldDirpath, newDirpath, {
      //for dirs
      recursive: true,
      //for existed path
      errorOnExist: true,
      force: false,
    });
  } catch (error) {
    if (error.code === "ERR_FS_CP_EEXIST") {
      throw new Error("FS operation failes");
    } else {
      //throw other error
      throw error;
    }
  }
};
await copy();
