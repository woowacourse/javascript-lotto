import Lotto from "./Lotto";

class WinningLotto {
  #lottoBoardTmp;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    this.#validateNumbers(numbers);
    this.#validateBonusNumber(bonusNumber);
    this.#validateUniqueNumbers([...numbers, bonusNumber]);

    this.#setLottoBoardTmp(numbers);
    this.#bonusNumber = bonusNumber;
  }

  getLottosRanks(lottos) {
    return lottos.map((lotto) => this.#getLottoRank(lotto));
  }

  #getLottoRank(lotto) {
    const matchCount = this.#getMatchCount(lotto);

    const hasBonusNumber = lotto.getNumbers().includes(this.#bonusNumber);

    return this.#getLottoRankByMatchCountAndHasBonusNumber(
      matchCount,
      hasBonusNumber
    );
  }

  #getLottoRankByMatchCountAndHasBonusNumber(matchCount, hasBonusNumber) {
    if (matchCount < 3) return -1;
    if (matchCount === 3) return 5;
    if (matchCount === 4) return 4;
    if (matchCount === 5 && !hasBonusNumber) return 3;
    if (matchCount === 5 && hasBonusNumber) return 2;
    if (matchCount === 6) return 1;
  }
  #getMatchCount(lotto) {
    return lotto
      .getNumbers()
      .reduce(
        (count, number) => count + (this.#lottoBoardTmp[number] ? 1 : 0),
        0
      );
  }

  #setLottoBoardTmp(numbers) {
    this.#lottoBoardTmp = new Array(Lotto.MAX_LOTTO_NUMBER + 1).fill(false);

    numbers.forEach((number) => (this.#lottoBoardTmp[number] = true));
  }

  #validateNumbers(numbers) {
    this.#validateNumbersLength(numbers);
    this.#validateIntegers(numbers);
    this.#validateNumbersInRange(numbers);
  }

  #validateBonusNumber(bonusNumber) {
    this.#validateInteger(bonusNumber);
    this.#validateNumberInRange(bonusNumber);
  }

  #validateNumbersInRange(numbers) {
    numbers.forEach((number) => this.#validateNumberInRange(number));
  }

  #validateNumberInRange(number) {
    if (number < Lotto.MIN_LOTTO_NUMBER || number > Lotto.MAX_LOTTO_NUMBER) {
      throw new Error("[ERROR] 유효한 범위 로또 숫자가 아닙니다.");
    }
  }

  #validateNumbersLength(numbers) {
    if (numbers.length !== Lotto.NUMBERS_LENGTH) {
      throw new Error("[ERROR] 유효한 개수의 로또 숫자가 아닙니다");
    }
  }

  #validateIntegers(numbers) {
    numbers.forEach((number) => this.#validateInteger(number));
  }

  #validateInteger(number) {
    if (!Number.isInteger(number)) {
      throw new Error("[ERROR] 정수가 아닌 값입니다.");
    }
  }

  #validateUniqueNumbers(numbers) {
    if (numbers.length !== new Set(numbers).size) {
      throw new Error("[ERROR] 중복된 숫자가 포합됩니다.");
    }
  }
}

export default WinningLotto;
