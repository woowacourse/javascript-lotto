import {
  isThousandMultiple,
  isValidMoneyRange,
} from '../controller/validator';
import Lotto from '../model/Lotto';

describe("금액 테스트", () => {
  const MIN_MONEY = 1000;
  const MAX_MONEY = 10000;

  it("입력된 금액은 1000원으로 나누어 떨어져야 한다.", () => {
    expect(isThousandMultiple(1000)).toBe(true);
  });

  it("입력된 금액은 1000원 이상 10000원 이하여야 한다.", () => {
    expect(isValidMoneyRange(9000)).toBe(true);
  });
});

describe('랜덤 숫자 테스트', () => {
  it('랜덤 숫자는 중복되지 않는 6개의 숫자이다', () => {
    const lotto = new Lotto();

    const isNoDuplicate = numbers => new Set([...numbers]).size;

    expect(isNoDuplicate(lotto.lottoNumbers)).toBe(6);
  });
});
