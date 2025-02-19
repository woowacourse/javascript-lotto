import { LOTTO_PRICE } from "../constants/systemConstants.js";
const PurchaseService = {
  getLottoCount(price) {
    return price / LOTTO_PRICE;
  },
};

export default PurchaseService;
