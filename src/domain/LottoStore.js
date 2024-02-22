import LOTTO_SYSTEM from "../constants/lottoSystem";
import Validator from "../utils/Validator";
import Lotto from "./Lotto";
import WinningLotto from "./WinningLotto";

class LottoStore {
  #winningLotto;

  constructor() {}

  calculateLottoCount(purchaseAmount) {
    if (!Validator.checkPurchaseAmount(purchaseAmount)) throw new Error();

    const lottoPrice = 1000;

    return purchaseAmount / lottoPrice;
  }

  generateRandomNumbers(lottoCount) {
    if (!Validator.checkLottoCount(lottoCount)) throw new Error();

    // TODO: 정상동작 테스트
    return Array.from({ length: lottoCount }).map(() => [1, 2, 3, 4, 5, 6]);
  }

  checkRanking(correctCount, isBonusCorrect) {
    if (LOTTO_SYSTEM.ranking[correctCount] === 3 && isBonusCorrect) {
      return 2;
    }

    return LOTTO_SYSTEM.ranking[correctCount];
  }

  getTotalProfitRate(rankings) {
    const { lottoPrize, lottoPrice } = LOTTO_SYSTEM;
    const purchaseAmount = lottoPrice * rankings.length;

    const totalProfit = rankings.reduce((acc, ranking) => {
      acc += lottoPrize[ranking];
      return acc;
    }, 0);

    const totalProfitRate = (totalProfit / purchaseAmount) * 100;

    return Number(totalProfitRate.toFixed(1));
  }

  issueLottos(sixNumbersArray) {
    // 2차원 배열의 이름 리뷰어는 어떻게 생각하시나요 ??
    if (!Validator.checkSixNumbersArray(sixNumbersArray)) throw new Error();

    return sixNumbersArray.map((sixNumbers) => new Lotto(sixNumbers));
  }

  setWinningLotto(winningNumbers, bonusNumber) {
    this.#winningLotto = new WinningLotto(winningNumbers, bonusNumber);
  }

  get winningLotto() {
    return this.#winningLotto;
  }

  calculateWinningLottoCount(lottos) {
    return lottos.map((lotto) => ({
      correctCount: this.#winningLotto.compareWinningNumbersWithLotto(
        lotto.numbers,
      ),
      isBonusCorrect: this.#winningLotto.isBonusNumberMatch(lotto.numbers),
    }));
  }
}

export default LottoStore;
