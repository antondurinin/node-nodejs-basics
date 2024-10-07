// import is mandatory
import path from "path";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import "./files/c.js";
const random = Math.random();
let unknownJson;
// New dynemic import using atributes in Node.js in Experimental mode
if (random > 0.5) {
  unknownJson = await import("./files/a.json", { with: { type: "json" } });
} else {
  unknownJson = await import("./files/b.json", { with: { type: "json" } });
}
// Using param "default" for object print
const unknownObject = unknownJson.default;
console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${import.meta.url}`);
console.log(`Path to current directory is ${path.dirname(import.meta.url)}`);
const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});
const PORT = 3000;
console.log(unknownObject);
myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});
// Using just "export"
export { unknownObject, myServer };
