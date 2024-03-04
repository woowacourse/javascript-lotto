import LOTTO_RULE from '../constants/rules/lottoRule';
import BonusNumber from './BonusNumber';
import Lotto from './Lotto';
import generateRandomNumberInRange from '../util/generateRandomNumberInRange';
import parseStringToNumber from '../util/parseStringToNumber';
import ERROR_MESSAGE from '../constants/messages/errorMessage';

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
      this.#customLotto(customLottos);
      return;
    }
    this.#autoLotto(lottos);
  }

  #customLotto(customLottos) {
    this.#lottos = customLottos.map((ticket) => {
      const stringToNumberLotto = parseStringToNumber(ticket);
      const customLotto = this.#makeCustomLottoNumbers(stringToNumberLotto);
      const lotto = new Lotto(customLotto);
      return lotto.lottoNumbers;
    });
  }

  #autoLotto(lottos) {
    this.#lottos = lottos.map((ticket) => {
      const autoLotto = this.#drawAutoLottoNumbers(ticket);
      const lotto = new Lotto(autoLotto);
      return lotto.lottoNumbers;
    });
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

  #initRanks() {
    const lottoRanks = new Map();

    LOTTO_RULE.RANK.forEach((rank) => {
      lottoRanks.set(rank, 0);
    });

    return lottoRanks;
  }

  #increaseRankCount(ranks, string) {
    const newRanks = new Map(ranks);
    const lottoRanksValue = newRanks.get(string);
    newRanks.set(string, lottoRanksValue + 1);
    return newRanks;
  }

  countLottoRanks() {
    const initialLottoRanks = this.#initRanks();
    const updatedRanks = this.#lottos.reduce((accumulator, lotto) => {
      const [isBonus, matchCount] = this.#calculateLottoMatch(lotto);
      return this.#checkWinningLotto(accumulator, matchCount, isBonus);
    }, initialLottoRanks);

    return Array.from(updatedRanks);
  }

  #calculateLottoMatch(lotto) {
    const winningLottoValues = this.#winningLotto.lottoNumbers;
    const isBonus = lotto.includes(this.#bonusNumber.value);

    const mergeLottoAndWinningLotto = [...lotto, ...winningLottoValues];
    const matchCount = mergeLottoAndWinningLotto.length - new Set(mergeLottoAndWinningLotto).size;

    return [isBonus, matchCount];
  }

  #checkWinningLotto(ranks, matchCount, isBonus) {
    if (matchCount === 6) {
      return this.#increaseRankCount(ranks, LOTTO_RULE.RANK[0]);
    }
    if (matchCount === 5 && isBonus) {
      return this.#increaseRankCount(ranks, LOTTO_RULE.RANK[1]);
    }
    if (matchCount === 5) {
      return this.#increaseRankCount(ranks, LOTTO_RULE.RANK[2]);
    }
    if (matchCount === 4) {
      return this.#increaseRankCount(ranks, LOTTO_RULE.RANK[3]);
    }
    if (matchCount === 3) {
      return this.#increaseRankCount(ranks, LOTTO_RULE.RANK[4]);
    }
    return ranks;
  }

  #validateHasRedundantNumber(winningLotto, number) {
    const winningLottoNumbers = winningLotto.lottoNumbers;

    if (winningLottoNumbers.includes(number)) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_ALREADY_CHOSEN);
    }
  }

  set winningLotto(numbers) {
    const winningLotto = parseStringToNumber(numbers);
    this.#winningLotto = new Lotto(winningLotto);
  }

  set bonusNumber(number) {
    this.#validateHasRedundantNumber(this.#winningLotto, Number(number));
    this.#bonusNumber = new BonusNumber(number);
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoMachine;
