import OutputView from "../view/OutputView.js";

export default async function executeOrRetryAsync(asyncFn) {
  try {
    const result = await asyncFn();
    return result;
  } catch (error) {
    OutputView.printError(error.message);
    return executeOrRetryAsync(asyncFn);
  }
}
