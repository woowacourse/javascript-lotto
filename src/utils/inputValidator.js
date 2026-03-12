export const isNumber = (input) => {
  const number = Number(input);

  if (typeof input === "string" && input.trim() === "") {
    throw new Error("입력값이 비어있습니다.");
  }

  if (Number.isNaN(number)) {
    throw new Error("숫자만 입력 가능합니다.");
  }
  return number;
};

export const isNumberArray = (inputArray) => {
  if (!inputArray || inputArray.length === 0) {
    throw new Error("입력값이 비어있습니다.");
  }
  return inputArray.map((item) => isNumber(item));
};
