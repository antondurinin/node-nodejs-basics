import { cpus } from "os";
import { Worker } from "worker_threads";
const performCalculations = async () => {
  const workers = [];
  const numCPUs = cpus().length;
  // Initialize results array with undefined values
  const results = new Array(numCPUs).fill(undefined);
  // Function to handle messages from workers
  const handleMessage = (message, workerIndex) => {
    results[workerIndex] = message;
    // Terminate the worker after receiving the message
    workers[workerIndex].terminate();
    if (
      results.length === numCPUs &&
      results.every((result) => result !== undefined)
    ) {
      console.log(results);
    }
  };
  // Function to handle errors from workers
  const handleError = (error, workerIndex) => {
    results[workerIndex] = { status: "error", data: null };
    // Terminate the worker after an error
    workers[workerIndex].terminate();
    if (
      results.length === numCPUs &&
      results.every((result) => result !== undefined)
    ) {
      console.log(results);
    }
  };
  // Create and manage worker threads
  for (let index = 0; index < numCPUs; index++) {
    const worker = new Worker("./src/wt/worker.js");
    workers.push(worker);
    worker.on("message", (message) => handleMessage(message, index));
    worker.on("error", (error) => handleError(error, index));
    worker.postMessage(10 + index);
  }
};
await performCalculations();
