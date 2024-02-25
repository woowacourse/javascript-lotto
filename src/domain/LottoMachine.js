import LOTTO_RULE from '../constants/rules/lottoRule';
import BonusNumber from './BonusNumber';
import Lotto from './Lotto';
import generateRandomNumberInRange from '../util/generateRandomNumberInRange';
import parseStringToNumber from '../util/parseStringToNumber';

class LottoMachine {
  #lottos;

  #winningLotto;

  #bonusNumber;

  constructor(count, customLottos = []) {
    this.#drawLottos(count, customLottos);
  }

  #drawLottos(count, customLottos) {
    const lottos = Array.from({ length: count }, () => []);
    if (customLottos.length) {
      this.#lottos = customLottos.map((ticket) => {
        const stringToNumberLotto = parseStringToNumber(ticket);
        const customLotto = this.#makeCustomLottoNumbers(stringToNumberLotto);
        const lotto = new Lotto(customLotto);
        return lotto.lottoNumbers;
      });
    } else {
      this.#lottos = lottos.map((ticket) => {
        const autoLotto = this.#drawAutoLottoNumbers(ticket);
        const lotto = new Lotto(autoLotto);
        return lotto.lottoNumbers;
      });
    }
  }

  #makeCustomLottoNumbers(lotto) {
    lotto.forEach((num) => {
      this.#pushNotRedundantNumber(lotto, Number(num));
    });
    return lotto;
  }

  #drawAutoLottoNumbers(lotto) {
    while (lotto.length !== 6) {
      const randomNumber = generateRandomNumberInRange();

      this.#pushNotRedundantNumber(lotto, randomNumber);
    }
    return lotto;
  }

  #pushNotRedundantNumber(lotto, number) {
    if (!lotto.includes(number)) {
      lotto.push(number);
    }
  }

  initRanks() {
    const lottoRanks = new Map();

    LOTTO_RULE.RANK.forEach((rank) => {
      lottoRanks.set(rank, 0);
    });

    return lottoRanks;
  }

  #increaseRankCount(ranks, string) {
    const lottoRanksValue = ranks.get(string);
    ranks.set(string, lottoRanksValue + 1);
  }

  countLottoRanks() {
    const lottoRanks = this.initRanks();

    this.#lottos.forEach((lotto) => {
      const lottoValues = lotto;
      const winningLottoValues = this.#winningLotto.lottoNumbers;
      const bonusNumber = this.#bonusNumber.value;
      const isBonus = lottoValues.includes(bonusNumber);

      const mergeLottoAndWinningLotto = [...lottoValues, ...winningLottoValues];
      const matchCount = mergeLottoAndWinningLotto.length - new Set(mergeLottoAndWinningLotto).size;

      this.#checkWinningLotto(lottoRanks, matchCount, isBonus);
      // TODO: lottoRanks를 리턴이 아닌 레퍼런스를 하고 있다.
    });

    const totalLottoRanks = Array.from(lottoRanks);

    return totalLottoRanks;
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

  set winningLotto(numbers) {
    const winningLotto = parseStringToNumber(numbers);
    this.#winningLotto = new Lotto(winningLotto);
  }

  set bonusNumber(number) {
    this.#bonusNumber = new BonusNumber(number, this.#winningLotto);
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoMachine;
