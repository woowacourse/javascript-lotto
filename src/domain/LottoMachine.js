import LOTTO_RULE from '../constants/rules/lottoRule';
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

  /**
   *
   * @param {Array [Lotto]} lotto 인스턴스의 배열
   * @returns {Object {lottoIndex : { matchCount : number, isBonus : boolean}} 전체 로또의 매칭 결과
   */
  // TODO: 이거 괜찮은 방법인가? 테스트를 위해서 기존 코드에서 바꿔주었다.
  judgeLottoGame(lottos = this.#lottos) {
    const totalMatchResult = new Map();
    lottos.forEach((lotto, idx) => {
      const [matchCount, isBonus] = this.#matchSingleLotto(lotto);
      const singleLottoMatchResult = new Map();

      totalMatchResult.set(`lotto${idx + 1}`, singleLottoMatchResult.set(`matchCount`, matchCount));
      totalMatchResult.set(`lotto${idx + 1}`, singleLottoMatchResult.set('isBonus', isBonus));
    });

    return totalMatchResult;
  }

  #matchSingleLotto(lotto) {
    const lottoValues = lotto.lottoNumbers;
    const winningLottoValues = this.#winningLotto.lottoNumbers;
    const bonusNumber = this.#bonusNumber.value;
    const mergeLottoAndWinningLotto = [...lottoValues, ...winningLottoValues, bonusNumber];

    const matchCount = mergeLottoAndWinningLotto.length - new Set(mergeLottoAndWinningLotto).size;
    const isBonus = lottoValues.includes(bonusNumber);

    return [matchCount, isBonus];
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
