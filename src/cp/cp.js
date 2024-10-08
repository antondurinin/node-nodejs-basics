import { spawn } from "child_process";
const spawnChildProcess = async (args) => {
  // Spawn a child process from script.js with the provided arguments
  const child = spawn("node", ["./src/cp/files/script.js", ...args], {
    stdio: ["pipe", "pipe", "pipe", "ipc"],
  });

  // Pipe stdin of the master process to stdin of the child process
  process.stdin.pipe(child.stdin);
  // Pipe stdout of the child process to stdout of the master process
  child.stdout.pipe(process.stdout);
  // Handle any errors from the child process
  child.on("error", (error) => {
    console.error("Error in child process:", error);
  });

  // Handle exit event of the child process
  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });

  // Function to close the child process
  const closeChildProcess = () => {
    child.kill();
    console.log("Child process terminated");
  };

  // Example usage: Close the child process after 5 seconds
  setTimeout(closeChildProcess, 5000);
};
// Put your arguments in function call to test this functionality
spawnChildProcess(["someArgument1", "someArgument2"]);
