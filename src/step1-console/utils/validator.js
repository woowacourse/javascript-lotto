import CustomError from "./CustomError.js";

export const validateTypeInteger = (value) => {
  if (!Number.isInteger(value)) {
    throw new CustomError("정수가 아닌 값입니다.");
  }
};

export const validateUniqueElements = (array) => {
  if (array.length !== new Set(array).size) {
    throw new CustomError("중복된 요소가 포함됩니다.");
  }
};

export const validateLengthEqual = (length, comparedLength) => {
  if (length !== comparedLength) {
    throw new CustomError("유효한 개수의 로또 숫자가 아닙니다");
  }
};
