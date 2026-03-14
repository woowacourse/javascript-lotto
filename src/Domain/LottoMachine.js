import Lotto from "./Lotto.js";
import { LOTTO_RULES } from "../Utils/Constants.js";

const LottoMachine = {
  issueLottos(purchasePriceStr, generateRandomNumber) {
    const purchasePrice = validatePurchasePrice(purchasePriceStr);
    const ticketsCount = purchasePrice / LOTTO_RULES.PRICE;

    return Array.from({ length: ticketsCount }, () => createLotto(generateRandomNumber));
  },
};

const validatePurchasePrice = (purchasePriceStr) => {
  const numPrice = Number(purchasePriceStr.trim());

  if (Number.isNaN(numPrice)) {
    throw new Error("[ERROR] 구입 금액이 숫자가 아닙니다!");
  }
  if (numPrice < LOTTO_RULES.PRICE) {
    throw new Error(`[ERROR] 구입 최소 금액은 ${LOTTO_RULES.PRICE}원 입니다!`);
  }

  return numPrice;
};

const createLotto = (generateRandomNumber) => {
  const lottoNumbers = generateRandomNumber().toSorted((a, b) => a - b);

  return new Lotto(lottoNumbers);
};

export default LottoMachine;
