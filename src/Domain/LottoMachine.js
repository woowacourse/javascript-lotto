import Lotto from "./Lotto.js";

const LottoMachine = {
  issueLottos(purchasePriceStr, generateRandomNumber) {
    const purchasePrice = validatePurchasePrice(purchasePriceStr);
    const ticketsCount = purchasePrice / 1000;

    return Array.from({ length: ticketsCount }, () => createLotto(generateRandomNumber));
  },
};

const validatePurchasePrice = (purchasePriceStr) => {
  const numPrice = Number(purchasePriceStr.trim());

  if (Number.isNaN(numPrice)) {
    throw new Error("[ERROR] 구입 금액이 숫자가 아닙니다!");
  }
  if (numPrice < 1000) {
    throw new Error("[ERROR] 구입 최소 금액은 1000원 입니다!");
  }

  return numPrice;
};

const createLotto = (generateRandomNumber) => {
  const lottoNumbers = generateRandomNumber().toSorted((a, b) => a - b);

  return new Lotto(lottoNumbers);
};

export default LottoMachine;
