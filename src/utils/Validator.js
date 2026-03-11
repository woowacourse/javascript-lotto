export const Validator = {
  isNumber(value) {
    const number = Number(value);
    if (Number.isNaN(number)) {
      throw new Error("[ERROR] 숫자를 입력해야 합니다.");
    }
    return number;
  },
};
