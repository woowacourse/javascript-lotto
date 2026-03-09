import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

const LottoMachine = {
  issueLottos(purchasePriceStr) {
    const purchasePrice = validatePurchasePrice(purchasePriceStr);
    const ticketsCount = purchasePrice / 1000;

    return Array.from({ length: ticketsCount }, createLotto);
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

const createLotto = () => {
  const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(
    1,
    45,
    6,
  ).toSorted((a, b) => a - b);

  return new Lotto(lottoNumbers);
};

export default LottoMachine;
