import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

const LottoMachine = {
  issueLottos(purchasePrice) {
    const ticketsCount = purchasePrice / 1000;

    return Array.from({ length: ticketsCount }, createLotto);
  },
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
