import LOTTO_RULE from '../constants/rules/lottoRule';
import generateRandomNumberInRange from '../util/generateRandomNumberInRange';
import BonusNumber from './BonusNumber';
import Lotto from './Lotto';

class LottoMachine {
  #lottos;
  #winningLotto;
  #bonusNumber;

  /**
   *
   * @param {Object} money - Money
   */
  constructor(money) {
    this.#drawLottos(money.count);
  }

  #drawLottos(moneyCount) {
    this.#lottos = Array(moneyCount).fill([]);

    this.#lottos.forEach((_, idx) => {
      this.#lottos[idx] = new Lotto(this.#generateRandomLottoNumbers());
    });
  }

  #generateRandomLottoNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length !== LOTTO_RULE.LOTTO_LENGTH) {
      const randomNumber = generateRandomNumberInRange();

      this.#pushNotRedundantNumber(lottoNumbers, randomNumber);
    }
    return lottoNumbers;
  }

  #pushNotRedundantNumber(lottoNumbers, randomNumber) {
    if (!lottoNumbers.includes(randomNumber)) {
      lottoNumbers.push(randomNumber);
    }
  }

  countLottoRanks(lottos = this.#lottos) {
    const lottoRanks = this.initRanks();

    lottos.forEach(lotto => {
      const lottoValues = lotto.lottoNumbers;
      const winningLottoValues = this.#winningLotto.lottoNumbers;
      const bonusNumber = this.#bonusNumber.value;
      const isBonus = lottoValues.includes(bonusNumber);

      const mergeLottoAndWinningLotto = [...lottoValues, ...winningLottoValues];
      const matchCount = mergeLottoAndWinningLotto.length - new Set(mergeLottoAndWinningLotto).size;

      this.#checkWinningLotto(lottoRanks, matchCount, isBonus);
    });

    const totalLottoRanks = Array.from(lottoRanks);

    return totalLottoRanks;
  }

  initRanks() {
    const lottoRanks = new Map();
    const rankValues = Object.values(LOTTO_RULE.RANKS).map(rankName => rankName.RANK);

    rankValues.forEach(rank => {
      lottoRanks.set(rank, 0);
    });

    return lottoRanks;
  }

  #increaseRankCount(lottoRanks, rankName) {
    const lottoRanksValue = lottoRanks.get(rankName);
    lottoRanks.set(rankName, lottoRanksValue + 1);
  }

  #checkWinningLotto(lottoRanks, matchCount, isBonus) {
    if (matchCount === LOTTO_RULE.RANKS.FIRST.MATCH_COUNT) {
      this.#increaseRankCount(lottoRanks, LOTTO_RULE.RANKS.FIRST.RANK);
    } else if (matchCount === LOTTO_RULE.RANKS.SECOND.MATCH_COUNT && isBonus) {
      this.#increaseRankCount(lottoRanks, LOTTO_RULE.RANKS.SECOND.RANK);
    } else if (matchCount === LOTTO_RULE.RANKS.THIRD.MATCH_COUNT) {
      this.#increaseRankCount(lottoRanks, LOTTO_RULE.RANKS.THIRD.RANK);
    } else if (matchCount === LOTTO_RULE.RANKS.FOURTH.MATCH_COUNT) {
      this.#increaseRankCount(lottoRanks, LOTTO_RULE.RANKS.FOURTH.RANK);
    } else if (matchCount === LOTTO_RULE.RANKS.FIFTH.MATCH_COUNT) {
      this.#increaseRankCount(lottoRanks, LOTTO_RULE.RANKS.FIFTH.RANK);
    }
  }

  set winningLotto(lottoInputs) {
    this.#winningLotto = new Lotto(lottoInputs.split(LOTTO_RULE.NUMBER_DELIMITER).map(input => Number(input.trim())));
  }

  set bonusNumber(number) {
    this.#bonusNumber = new BonusNumber(number, this.#winningLotto);
  }

  get lottos() {
    return this.#lottos.slice();
  }
}

export default LottoMachine;
