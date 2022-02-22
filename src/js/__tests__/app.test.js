// ### 1단계 기능목록

// - [ ] 금액이 주어지면 발급할 로또 개수를 구할 수 있어야한다.
// - [ ] 1000으로 나눠서 안떨어지는 금액이 입려되면 에러를 throw한다.
// - [ ] 랜덤한 번호를 6개 생성할 수 있어야 한다.
// - [ ] 번호 6개를 가진 로또를 발급할 수 있다.
// - [ ] 계산된 로또개수만큼 로또를 자동 구매할 수 있어야 한다.

import LottoApp from '../LottoApp.js';

describe('1단계 기능목록', () => {
  test('금액이 주어지면 발급할 로또 개수를 구할 수 있어야 한다.', () => {
    const chargeAmount = 2000;

    expect(LottoApp.getNumberOfLotto(chargeAmount)).toBe(2);
  });
});
