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
    // 6 1등, 5 2등, 5 3등, 4 4등, 3 5등, 2 1 0 0등
    const ranking = [0, 0, 0, 5, 4, 3, 1];

    if (ranking[correctCount] === 3 && isBonusCorrect) {
      return 2;
    }

    return ranking[correctCount];
  }

  getTotalProfitRate(rankings) {
    const lottoPrize = [0, 2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000];
    const lottoPrice = 1000;
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
}

export default LottoStore;
