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
    const inputElement = document.querySelector(`.${tagName}`);
    // inputElement.value = "";
    return inputElement.value;
  },
  readWebInputs(tagName) {
    const inputs = document.querySelectorAll(`.${tagName}`);
    return Array.from(inputs)
      .map((input) => input.value)
      .join(", ");
  },
};
export default InputView;
