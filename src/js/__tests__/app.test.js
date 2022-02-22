// ### 1단계 기능목록

// - [x] 금액이 주어지면 발급할 로또 개수를 구할 수 있어야한다.
// - [ ] 입력된 금액이 공백으로 이루어져 있으면 에러를 throw한다.
// - [ ] 입력된 금액이 숫자가 아니면 에러를 throw한다.
// - [ ] 1000으로 나눠서 안떨어지는 금액이 입려되면 에러를 throw한다.
// - [ ] 입력된 금액이 1000부터 10000 사이가 아니면 에러를 throw한다.
// - [ ] 랜덤한 번호를 6개 생성할 수 있어야 한다.
// - [ ] 번호 6개를 가진 로또를 발급할 수 있다.
// - [ ] 계산된 로또개수만큼 로또를 자동 구매할 수 있어야 한다.

import LottoApp from '../LottoApp.js';
import validator from '../utils/validator.js';

describe('1단계 기능목록', () => {
  test('금액이 주어지면 발급할 로또 개수를 구할 수 있어야 한다.', () => {
    const chargeAmount = 2000;

    expect(LottoApp.getNumberOfLotto(chargeAmount)).toBe(2);
  });

  test('입력된 금액이 숫자가 아니면 에러를 throw한다.', () => {
    const chargeAmount = '만원';

    expect(() => {
      validator.checkChargeAmount(chargeAmount);
    }).toThrowError('입력된 금액이 숫자가 아닙니다. 1000 이상 10000 이하의 금액을 입력해주세요.');
  });

  test('1000으로 나눠서 안떨어지는 금액이 입력되면 에러를 throw한다.', () => {
    const chargeAmount = 1001;

    expect(() => {
      validator.checkChargeAmount(chargeAmount);
    }).toThrowError(
      '입력된 금액이 1000으로 나누어 떨어지지 않습니다. 1000으로 나누어 떨어지는 금액을 입력해주세요.'
    );
  });

  test('입력된 금액이 1000부터 10000 사이가 아니면 에러를 throw한다.', () => {
    const firstChargeAmount = 0;
    const secondChargeAmount = 11000;

    expect(() => {
      validator.checkChargeAmount(firstChargeAmount);
    }).toThrowError(
      '입력된 금액이 1000부터 10000 사이가 아닙니다. 1000 이상 10000 이하의 금액을 입력해주세요.'
    );

    expect(() => {
      validator.checkChargeAmount(secondChargeAmount);
    }).toThrowError(
      '입력된 금액이 1000부터 10000 사이가 아닙니다. 1000 이상 10000 이하의 금액을 입력해주세요.'
    );
  });
});
