import LOTTO_RULE from '../constants/rules/lottoRule';
import BonusNumber from './BonusNumber';
import Lotto from './Lotto';
import generateRandomNumberInRange from '../util/generateRandomNumberInRange';

class LottoMachine {
  #lottos;

  #winningLotto;

  #bonusNumber;

  constructor(count, autoLottos = []) {
    this.#drawLottos(count, autoLottos);
  }

  #drawLottos(count, autoLottos) {
    if (autoLottos) {
      const lottos = Array.from({ length: count }, () => []);
      this.#lottos = lottos.map((ticket) => {
        const autoLotto = this.#drawAutoLottoNumbers(ticket);
        const lotto = new Lotto(autoLotto);
        return lotto.lottoNumbers;
      });
    } else {
      const lottos = autoLottos;
      this.#lottos = lottos.map((ticket) => {
        console.log('custom ticket: ', ticket);
        const customLotto = this.#makeCustomLottoNumbers(ticket);
        const lotto = new Lotto(customLotto);
        return lotto.lottoNumbers;
      });
    }
  }

  #makeCustomLottoNumbers(lotto) {
    const splitedLottoNumbers = lotto.split(',');
    splitedLottoNumbers.forEach((num) => {
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
      // return lotto;
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

  // TODO: 이거 괜찮은 방법인가? 테스트를 위해서 기존 코드에서 바꿔주었다.
  countLottoRanks(lottos = this.#lottos) {
    const lottoRanks = this.initRanks();

    lottos.forEach((lotto) => {
      const lottoValues = lotto.lottoNumbers;
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
    const typeNumberWinningLotto = numbers.split(',').map((num) => {
      return Number(num);
    });
    this.#winningLotto = new Lotto(typeNumberWinningLotto);
  }

  set bonusNumber(number) {
    this.#bonusNumber = new BonusNumber(number, this.#winningLotto);
  }

  get lottos() {
    return this.#lottos;
  }
}

export default LottoMachine;
