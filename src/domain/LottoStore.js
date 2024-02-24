import LOTTO_SYSTEM from "../constants/lottoSystem";
import { ERROR_MESSAGE } from "../constants/message";
import Validator from "../utils/Validator";
import getRandomNumberInRange from "../utils/getRandomNumberInRange";
import Lotto from "./Lotto";
import WinningLotto from "./WinningLotto";

class LottoStore {
  #winningLotto;
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  calculateLottoCount(purchaseAmount) {
    if (!Validator.checkPurchaseAmount(purchaseAmount))
      throw new Error(ERROR_MESSAGE.invalidPurchaseAmount);

    return purchaseAmount / LOTTO_SYSTEM.lottoPrice;
  }

  #generateUniqueRandomLottoNumbersInRange() {
    const lottoNumbers = [];

    while (lottoNumbers.length < LOTTO_SYSTEM.lottoDigitCount) {
      const randomNumber = getRandomNumberInRange(
        LOTTO_SYSTEM.lottoRangeMinimum,
        LOTTO_SYSTEM.lottoRangeMaximum,
      );

      !lottoNumbers.includes(randomNumber) && lottoNumbers.push(randomNumber);
    }

    return lottoNumbers;
  }

  generateRandomNumbers(lottoCount) {
    if (!Validator.checkLottoCount(lottoCount))
      throw new Error(ERROR_MESSAGE.invalidLottoCount);

    return Array.from({ length: lottoCount }).map(() =>
      this.#generateUniqueRandomLottoNumbersInRange(),
    );
  }

  checkRanking(correctCount, isBonusCorrect) {
    const secondPlace = 2;
    const thirdPlace = 3;

    if (LOTTO_SYSTEM.ranking[correctCount] === thirdPlace && isBonusCorrect) {
      return secondPlace;
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
    if (!Validator.checkSixNumbersArray(sixNumbersArray))
      throw new Error(ERROR_MESSAGE.invalidSixNumbersArray);

    this.#lottos = sixNumbersArray.map((sixNumbers) => new Lotto(sixNumbers));
  }

  setWinningLotto(winningNumbers, bonusNumber) {
    this.#winningLotto = new WinningLotto(winningNumbers, bonusNumber);
  }

  get winningLotto() {
    return this.#winningLotto;
  }

  calculateWinningLottoCount() {
    return this.#lottos.map((lotto) => ({
      correctCount: this.#winningLotto.compareWinningNumbersWithLotto(
        lotto.numbers,
      ),
      isBonusCorrect: this.#winningLotto.isBonusNumberMatch(lotto.numbers),
    }));
  }

  get lottos() {
    return [...this.#lottos];
  }
}

export default LottoStore;
