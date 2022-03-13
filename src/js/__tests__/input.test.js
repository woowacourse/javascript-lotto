import {
  isThousandMultiple,
  isValidMoneyRange,
  isDuplicatedLottos,
} from '../controller/validator';

describe("금액 테스트", () => {
  const MIN_MONEY = 1000;
  const MAX_MONEY = 10000;
  const VALID_MONEY = 9000;
  const INVALID_NOT_MULTIPLE_OF_THOUSAND = 1500;
  const INVALID_MORE_THAN_MAX = 10100;
  const INVALID_LESS_THAN_MIN = 900;

  it("입력된 금액은 1000원으로 나누어 떨어져야 한다.", () => {
    expect(isThousandMultiple(MIN_MONEY)).toBe(true);
    expect(isThousandMultiple(INVALID_NOT_MULTIPLE_OF_THOUSAND)).toBe(false);
  });

  it("입력된 금액은 1000원 이상 10000원 이하여야 한다.", () => {
    expect(isValidMoneyRange(MAX_MONEY)).toBe(true);
    expect(isValidMoneyRange(VALID_MONEY)).toBe(true);
    expect(isValidMoneyRange(INVALID_MORE_THAN_MAX)).toBe(false);
    expect(isValidMoneyRange(INVALID_LESS_THAN_MIN)).toBe(false);
  });
});

describe('당첨 번호 입력값 테스트', () => {
  it('당첨 번호 입력값은 값이 중복되어서는 안 된다', () => {
    const DUPLICATED_LOTTO = [3,13,16,36,25,41,41];
    const NOT_DUPLICATED_LOTTO = [1,2,3,4,5,6,7];

    expect(isDuplicatedLottos(DUPLICATED_LOTTO)).toBeTruthy();
    expect(isDuplicatedLottos(NOT_DUPLICATED_LOTTO)).toBeFalsy();
  });
});
