import { createReadStream } from "fs";
import { createHash } from "crypto";
const calculateHash = async () => {
  const hash = createHash("sha256");
  const fileUrl = new URL(
    "./files/fileToCalculateHashFor.txt",
    import.meta.url
  );
  const input = createReadStream(fileUrl);
  input.on("readable", () => {
    const data = input.read();
    if (data) {
      hash.update(data);
    } else {
      console.log(`${hash.digest("hex")} ${fileUrl}`);
    }
  });
  input.on("error", (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
};
await calculateHash();
