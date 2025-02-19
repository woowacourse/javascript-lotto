import OutputView from "../view/OutputView.js";

async function loopWhileValid(fn, ...args) {
  while (true) {
    try {
      return await fn(...args);
    } catch (error) {
      OutputView.printMessage(error.message);
      OutputView.printBlank();
    }
  }
}
export default loopWhileValid;
