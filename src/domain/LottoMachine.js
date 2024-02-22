import LOTTO_RULE from '../constants/rules/lottoRule';
import returnOnInvestment from '../util/returnOnInvestment';
import BonusNumber from './BonusNumber';
import Lotto from './Lotto';

class LottoMachine {
  #lottos;
  #count; //TODO: count 분리
  #winningLotto;
  #bonusNumber;

  constructor(money) {
    //TODO: money.amount 리팩토링?
    this.#count = money.amount / LOTTO_RULE.LOTTO_MONEY_UNIT;
    this.#drawLottos();
  }

  #drawLottos() {
    this.#lottos = Array(this.#count).fill([]);
    this.#lottos.forEach((_, idx) => {
      this.#lottos[idx] = new Lotto();
    });
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

  // TODO: 이거 괜찮은 방법인가? 테스트를 위해서 기존 코드에서 바꿔주었다.
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
      // TODO: lottoRanks를 리턴이 아닌 레퍼런스를 하고 있다.
    });

    return lottoRanks;
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
    this.#winningLotto = new Lotto(numbers);
  }

  set bonusNumber(number) {
    this.#bonusNumber = new BonusNumber(number, this.#winningLotto);
  }

  get lottos() {
    return this.#lottos;
  }

  get count() {
    return this.#count;
  }
}

export default LottoMachine;
