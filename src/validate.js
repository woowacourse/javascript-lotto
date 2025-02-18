const validatePrice = (price) => {
  if (price % 1000 !== 0) {
    throw new Error("구입 금액은 1000원 단위로 입력해주세요.");
  }
};

export { validatePrice };
