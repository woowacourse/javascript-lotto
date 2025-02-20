import pushRandomNumbers from "../utils/pushRandomNumbers.js";
const createSixRandomNumbers = () => {
  const initialRandomNumbers = [];
  const randomNumbers = pushRandomNumbers(initialRandomNumbers);
  if (new Set(randomNumbers).size !== randomNumbers.length) createSixRandomNumbers();

  return randomNumbers;
};

export default createSixRandomNumbers;
