import { writeFile } from "fs/promises";
const create = async () => {
  //set URL to file
  const filePath = new URL("./files/fresh.txt", import.meta.url);
  try {
    //try to opent for appending, flag "ax" helping us to avoid recreating of file
    await writeFile(filePath, "I am fresh and young", { flag: "ax" });
  } catch (error) {
    //if we foud file lets throw error
    if (error.code === "EEXIST") {
      throw new Error("FS operation failed");
    } else {
      //throw other errors
      throw error;
    }
  }
};
await create();
