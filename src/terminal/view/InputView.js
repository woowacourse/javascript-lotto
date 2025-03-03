const isWebEnvironMent = typeof window !== "undefined";

const InputView = {
  async readUserInput(message, inputType, isMultiple = false) {
    if (isWebEnvironMent && isMultiple) {
      return this.readWebInputs(inputType);
    }
    if (isWebEnvironMent && !isMultiple) {
      return this.readWebInput(inputType);
    }
    const { readLineAsync } = await import("../../util/readLineAsync.js");
    return await readLineAsync(message);
  },
  readWebInput(name) {
    const inputElement = document.querySelector(`[name=${name}]`);
    return inputElement.value;
  },
  readWebInputs(name) {
    const inputs = document.querySelectorAll(`[name=${name}]`);
    return Array.from(inputs)
      .map((input) => input.value)
      .join(", ");
  },
};
export default InputView;
