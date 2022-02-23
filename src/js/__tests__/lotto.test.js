import { ERROR_MESSAGE } from '../constants/errorMessage';
import Lotto from '../models/Lotto';

describe('로또 모델 테스트', () => {
  it('로또 모델에 숫자 배열을 인자로 넣어서 인스턴스를 생성할 수 있다.', () => {
    const lotto = Lotto.create([1, 2, 3, 4, 5, 6]);
    expect(lotto.lottoNumbers).toContain(1, 2, 3, 4, 5, 6);
  });

  it('로또 모델의 배열에 들어갈 값은 1이상 45이하의 숫자여야 한다.', () => {
    const invalidInput = [1, 2, 3, 4, 5, 46];
    try {
      Lotto.create(invalidInput);
    } catch ({ message }) {
      expect(message).toEqual(ERROR_MESSAGE.LOTTO_NUMBER_IS_INVALIDATE);
    }
  });
});
