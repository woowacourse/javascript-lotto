import pushRandomNumbers from "./pushRandomNumbers.js";

const createSixRandomNumbers = () => {
  const initialRandomNumbers = [];
  const randomNumbers = pushRandomNumbers(initialRandomNumbers);
  if (new Set(randomNumbers).size !== randomNumbers.length) return createSixRandomNumbers();

  return randomNumbers;
};

export default createSixRandomNumbers;
