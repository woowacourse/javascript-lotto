import Lotto from '../Lotto';
import { LOTTO } from '../constants';

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test(`구매한 각 로또 번호가 ${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER} 사이의 중복되지 않은 숫자인지 확인`, () => {
  const lotto = new Lotto();

  lotto.setLotto();
  const lottoList = lotto.getLotto();

  lottoList.forEach((lottoNumber) => {
    expect(lottoNumber).toBeWithinRange(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER);
  });
});
