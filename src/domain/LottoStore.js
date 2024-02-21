import Lotto from "./Lotto";
import WinningLotto from "./WinningLotto";

class LottoStore {
  #winningLotto;

  constructor() {}

  calculateLottoCount(purchaseAmount) {
    this.#validatePurchaseAmount(purchaseAmount);
    const lottoPrice = 1000;

    return purchaseAmount / lottoPrice;
  }

  generateRandomNumbers(lottoCount) {
    this.#validateLottoCount(lottoCount);

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
    this.#validateSixNumbersArray(sixNumbersArray);

    return sixNumbersArray.map((sixNumbers) => new Lotto(sixNumbers));
  }

  setWinningLotto(winningNumbers, bonusNumber) {
    this.#winningLotto = new WinningLotto(winningNumbers, bonusNumber);
  }

  get winningLotto() {
    return this.#winningLotto;
  }

  #validateSixNumbersArray(sixNumbersArray) {
    if (!Array.isArray(sixNumbersArray)) {
      throw new Error();
    }

    if (sixNumbersArray.length === 0) {
      throw new Error();
    }

    if (sixNumbersArray.some((sixNumbers) => !Array.isArray(sixNumbers))) {
      throw new Error();
    }
  }

  #validatePurchaseAmount(purchaseAmount) {
    if (typeof purchaseAmount !== "number") {
      throw new Error();
    }

    if (purchaseAmount % 1000 !== 0) {
      throw new Error();
    }

    if (purchaseAmount < 1000 || purchaseAmount > 100000) {
      throw new Error();
    }
  }

  #validateLottoCount(lottoCount) {
    if (typeof lottoCount !== "number") {
      throw new Error();
    }

    if (!Number.isInteger(lottoCount)) {
      throw new Error();
    }

    if (lottoCount < 1 || lottoCount > 100) {
      throw new Error();
    }
  }
}

export default LottoStore;
