import ERROR_MESSAGE from "../../constants/ERROR_MESSAGE";

const Validation = {
  purchaseAmount(input) {
    const purchaseAmount = Number(input);

    if (!purchaseAmount) throw new Error(ERROR_MESSAGE.NOT_DIVISIBLE_BY_UNIT);
    if (purchaseAmount % 1000 !== 0) throw new Error(ERROR_MESSAGE.INVALID_INPUT_PRICE);

    return purchaseAmount;
  },
};

export default Validation;
