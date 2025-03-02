export const setNumberInput = (className, minNumber, maxNumber) => {
  return `<input
          type="number"
          class="${className}"
          min="${minNumber}"
          max="${maxNumber}"
          autocomplete="off"
        />`;
};
