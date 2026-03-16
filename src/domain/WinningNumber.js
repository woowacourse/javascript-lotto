import Lotto from "./Lotto.js";

export default class WinningNumber {
  static ERROR = {
    DUPLICATE: "보너스번호가 중복됐습니다",
    INVALID_RANGE: `로또번호가 ${Lotto.POLICY.MIN_RANGE}~${Lotto.POLICY.MAX_RANGE} 범위를 벗어났습니다`,
  };

  #lotto;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    WinningNumber.validate(numbers, bonusNumber);
    this.#lotto = new Lotto([...numbers]);
    this.#bonusNumber = bonusNumber;
  }

  static validate(numbers, bonusNumber) {
    const { MIN_RANGE, MAX_RANGE } = Lotto.POLICY;
    if (bonusNumber < MIN_RANGE || MAX_RANGE < bonusNumber)
      throw new Error(WinningNumber.ERROR.INVALID_RANGE);

    if (numbers.includes(bonusNumber))
      throw new Error(WinningNumber.ERROR.DUPLICATE);
  }

  getMatchCount(lotto) {
    if (!(lotto instanceof Lotto))
      throw new Error("매개변수로 Lotto객체를 받아야합니다");

    const winningNumbers = this.#lotto.getNumbers();
    const matchWinning = winningNumbers.filter((n) =>
      lotto.hasNumber(n),
    ).length;
    const matchBonus = lotto.hasNumber(this.#bonusNumber);
    return { matchWinning, matchBonus };
  }

  get lotto() {
    return this.#lotto;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}
