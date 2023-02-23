const { pickRandomNumberInRange } = require('../../utils');
const { MAGIC_NUMBER, RANK_INFORMATIONS } = require('../../constant');

class LottoMachine {
  #lottos;

  #machineInput;

  constructor() {
    this.#machineInput = {
      money: null,
      winning: null,
    };
  }

  getLottos() {
    return this.#lottos;
  }

  getMoney() {
    return this.#machineInput.money;
  }

  getWinning() {
    return this.#machineInput.winning;
  }

  setMoney(money) {
    this.#machineInput.money = money;
  }

  setWinning(winning) {
    this.#machineInput.winning = winning;
  }

  generateLottos() {
    const lottoCount = this.getLottoCount();

    this.#lottos = Array.from({ length: lottoCount }).map(() =>
      this.#getComposedLottoNumbers().sort((first, second) => first - second)
    );
  }

  getLottoCount() {
    return this.#machineInput.money.getAmount() / MAGIC_NUMBER.moneyUnit;
  }

  getCollectedRanks() {
    const RANK_TEMPLATE = [0, 0, 0, 0, 0];

    const ranks = this.#lottos.reduce((accumulator, lotto) => {
      return this.#getIncreasedRanks(lotto, accumulator);
    }, RANK_TEMPLATE);

    return ranks;
  }

  #getComposedLottoNumbers() {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < MAGIC_NUMBER.lottoNumberCount) {
      const randomNumber = pickRandomNumberInRange(
        MAGIC_NUMBER.lottoStart,
        MAGIC_NUMBER.lottoEnd
      );
      lottoNumbers.add(randomNumber);
    }

    return [...lottoNumbers];
  }

  #getIncreasedRanks(lotto, ranks) {
    const updatedRanks = ranks;
    const matchedCount = this.#getMatchedCount(lotto);
    const rankIndex = this.#getRankIndex(matchedCount, this.#isBonus(lotto));
    if (rankIndex !== MAGIC_NUMBER.losing) {
      updatedRanks[rankIndex] += 1;
    }
    return updatedRanks;
  }

  #getMatchedCount(lotto) {
    const winningNumbers = this.#machineInput.winning.getWinningNumbers();
    return lotto.filter((number) => winningNumbers.includes(number)).length;
  }

  #getRankIndex(matchedCount, isBonus) {
    const rankIndex = RANK_INFORMATIONS.findIndex(
      (rankInformation) =>
        rankInformation.isBonus === isBonus &&
        rankInformation.matchedCount === matchedCount
    );
    if (rankIndex === MAGIC_NUMBER.failFindIndex) return MAGIC_NUMBER.losing;

    return rankIndex;
  }

  #isBonus(lotto) {
    return lotto.includes(this.#machineInput.winning.getBonusNumber());
  }
}
module.exports = LottoMachine;
