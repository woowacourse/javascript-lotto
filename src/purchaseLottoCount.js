import ERROR_MESSAGE from "./constants/ERROR_MESSAGE.js";

const purchaseLottoCount = (money) => {
  if (money % 1000 !== 0) {
    throw new Error(ERROR_MESSAGE.INVALID_INPUT_PRICE);
  }

  return money / 1000;
};

export default purchaseLottoCount;
