const isWebEnvironMent = typeof window !== "undefined";

const InputView = {
  async readUserInput(message, inputType, isMultiple = false) {
    if (isWebEnvironMent && isMultiple) {
      return this.readWebInputs(inputType);
    }
    if (isWebEnvironMent && !isMultiple) {
      return this.readWebInput(inputType);
    }
    const { readLineAsync } = await import("../util/readLineAsync.js");
    return await readLineAsync(message);
  },
  readWebInput(tagName) {
    return document.querySelector(`.${tagName}`).value;
  },
  readWebInputs(tagName) {
    const inputs = document.querySelectorAll(`${tagName}`);
    return Array.from(inputs).map((input) => input.value);
  },
};
export default InputView;
