import {
  isThousandMultiple,
  isValidMoneyRange,
  isDuplicatedLottos,
} from '../controller/validator';

describe("금액 테스트", () => {
  const MIN_MONEY = 1000;
  const MAX_MONEY = 10000;

  it("입력된 금액은 1000원으로 나누어 떨어져야 한다.", () => {
    expect(isThousandMultiple(1000)).toBeTruthy();
  });

  it("입력된 금액은 1000원 이상 10000원 이하여야 한다.", () => {
    expect(isValidMoneyRange(9000)).toBeTruthy();
  });
});

describe('당첨 번호 입력값 테스트', () => {
  it('당첨 번호 입력값은 값이 중복되어서는 안 된다', () => {
    const duplicatedLotto = [3,13,16,36,25,41,41];

    expect(isDuplicatedLottos(duplicatedLotto)).toBeTruthy();
  });
});
