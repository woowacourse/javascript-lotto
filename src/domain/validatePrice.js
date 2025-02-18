export const isNumber = (input) => {
  const regex = /^[0-9]*$/;

  if (!regex.test(input)) {
    throw new Error("숫자를 입력해주세요.");
  }
};
