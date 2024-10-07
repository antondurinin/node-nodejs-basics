import { parentPort } from "worker_threads";
// Check if it executed from main thread
if (!parentPort) {
  throw new Error("Executed not from main thread");
}
// n will be received form main threat
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);
const sendResult = () => {
  // Recive message from main thread
  parentPort.on("message", (n) => {
    try {
      // Execute func with received n
      const result = nthFibonacci(n);
      // Send result of nthFibonacci computations to main thread
      parentPort.postMessage({ status: "resolved", data: result });
    } catch (error) {
      parentPort.postMessage({ status: "error", data: null });
    }
  });
};
sendResult();
