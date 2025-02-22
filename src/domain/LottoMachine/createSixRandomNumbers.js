import Validator from "../../utils/Validator.js";
import pushRandomNumbers from "./pushRandomNumbers.js";

const createSixRandomNumbers = () => {
  const initialRandomNumbers = [];
  const randomNumbers = pushRandomNumbers(initialRandomNumbers);
  if (Validator.isDuplicate(randomNumbers)) return createSixRandomNumbers();

  return randomNumbers;
};

export default createSixRandomNumbers;
