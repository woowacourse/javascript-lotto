import Lotto from '../models/Lotto';
import { isValidLottoNumbers } from '../utils/validator';

describe('로또 모델 테스트', () => {
  it('로또 모델에 숫자 배열을 인자로 넣어서 인스턴스를 생성할 수 있다.', () => {
    const lotto = new Lotto();
    expect(isValidLottoNumbers(lotto.lottoNumbers)).toBe(true);
  });
});
