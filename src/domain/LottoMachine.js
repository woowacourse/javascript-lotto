import LOTTO_RULE from '../constants/rules/lottoRule';
import generateRandomNumberInRange from '../util/generateRandomNumberInRange';
import BonusNumber from './BonusNumber';
import Lotto from './Lotto';

class LottoMachine {
  #lottos;
  #winningLotto;
  #bonusNumber;

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
    while (lottoNumbers.length !== 6) {
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

    LOTTO_RULE.RANK.forEach(rank => {
      lottoRanks.set(rank, 0);
    });

    return lottoRanks;
  }

  #increaseRankCount(ranks, string) {
    const lottoRanksValue = ranks.get(string);
    ranks.set(string, lottoRanksValue + 1);
  }

  #checkWinningLotto(lottoRanks, matchCount, isBonus) {
    if (matchCount === 6) {
      this.#increaseRankCount(lottoRanks, LOTTO_RULE.RANK[0]);
    } else if (matchCount === 5 && isBonus) {
      this.#increaseRankCount(lottoRanks, LOTTO_RULE.RANK[1]);
    } else if (matchCount === 5) {
      this.#increaseRankCount(lottoRanks, LOTTO_RULE.RANK[2]);
    } else if (matchCount === 4) {
      this.#increaseRankCount(lottoRanks, LOTTO_RULE.RANK[3]);
    } else if (matchCount === 3) {
      this.#increaseRankCount(lottoRanks, LOTTO_RULE.RANK[4]);
    }
  }

  set winningLotto(lottoInputs) {
    this.#winningLotto = new Lotto(lottoInputs.split(',').map(input => Number(input.trim())));
  }

  set bonusNumber(number) {
    this.#bonusNumber = new BonusNumber(number, this.#winningLotto);
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoMachine;
