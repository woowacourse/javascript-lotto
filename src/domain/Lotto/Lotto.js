import { sortByAscending } from '../../utils/array.js';
import Random from '../../utils/random.js';

class Lotto {
  static LOTTO_RULE = {
    min: 1,
    max: 45,
    count: 6,
  };

  /**
   * 정적 팩토리 메서드(매개변수 1개)
   * @returns {Lotto} 로또 인스턴스
   */
  static from() {
    return new Lotto();
  }

  /**
   * @returns {import('../../types/jsDoc.js').LottoNumber} 1 ~ 45의 값들이 6개 담긴 숫자 배열
   */
  createNumber() {
    const lottoNumber = Random.pickUniqueNumbersInRange({
      start: Lotto.LOTTO_RULE.min,
      end: Lotto.LOTTO_RULE.max,
      count: Lotto.LOTTO_RULE.count,
    });

    return sortByAscending(lottoNumber);
  }
}

export default Lotto;
