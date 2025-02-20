import { LOTTO_PURCHASE_UNIT } from "../constants/constant.js";

const purchaseLottoCount = (money) => money / LOTTO_PURCHASE_UNIT;

export default purchaseLottoCount;
