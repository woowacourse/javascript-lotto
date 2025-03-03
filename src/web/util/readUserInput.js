export const readWebInput = (name) => {
  const inputElement = document.querySelector(`[name=${name}]`);
  return inputElement.value;
};

export const readWebInputs = (name) => {
  const inputs = document.querySelectorAll(`[name=${name}]`);
  return Array.from(inputs)
    .map((input) => input.value)
    .join(", ");
};
