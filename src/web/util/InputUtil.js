export const InputUtil = {
  readInput(name) {
    const inputElement = document.querySelector(`[name=${name}]`);
    return inputElement.value;
  },
  readInputs(name) {
    const inputs = document.querySelectorAll(`[name=${name}]`);
    return Array.from(inputs)
      .map((input) => input.value)
      .join(", ");
  },
};
