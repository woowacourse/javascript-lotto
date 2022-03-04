import { isInvalidMoneyInput } from '../validator/validator';
import { lottoTicket } from '../model/lottoTicket';

describe('로또 구입 금액 테스트', () => {
  it('입력된 금액은 1000원 이상 10000원 이하여야 한다.', () => {
    expect(isInvalidMoneyInput(999)).toBe(true);
    expect(isInvalidMoneyInput(1000)).toBe(false);
    expect(isInvalidMoneyInput(10000)).toBe(false);
    expect(isInvalidMoneyInput(10001)).toBe(true);
  });
});

describe('랜덤 숫자 테스트', () => {
  it('랜덤 숫자는 중복되지 않는 6개의 숫자이다', () => {
    const isNoDuplicate = (numbers) => new Set([...numbers]).size === 6;

    expect(isNoDuplicate(lottoTicket.generateLottoNumbers())).toBe(true);
  });
});
