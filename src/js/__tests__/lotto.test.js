import Lotto from '../models/Lotto';
import { isValidLottoNumbers } from '../utils/validator';

describe('로또 모델 테스트', () => {
  it('로또 객체의 lottoNumbers는 6개의 로또 숫자가 포함된 배열형태의 멤버이다. 또한 배열에는 중복된 숫자가 존재하지 않는다. ', () => {
    const lotto = new Lotto();
    expect(isValidLottoNumbers(lotto.lottoNumbers)).toBe(true);
  });
});
