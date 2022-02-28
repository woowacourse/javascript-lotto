import Lotto from "../model/Lotto.js";
import { ERROR_MESSAGES } from "../utils/constants.js";
import { validatePurchaseAmount } from "../utils/validation.js";
import { isValidMinimumAmount, isValidAmountUnit } from "../utils/general.js";

describe("로또 번호 생성 테스트", () => {
  test("로또 번호는 1부터 45 범위 안에 있어야 한다.", () => {
    const lotto = new Lotto();
    const numbers = lotto.generateLottoNumber();
    const isCorrectRange = (numbers) => {
      const isBelowThreshold = (number) => number >= 1 && number <= 45;

      return numbers.every(isBelowThreshold);
    };

    expect(isCorrectRange(numbers)).toBe(true);
  });

  test("로또 번호는 총 6개 가지고 있다.", () => {
    const lottoNumberLength = 6;
    const lotto = new Lotto();
    expect(lotto.generateLottoNumber()).toHaveLength(lottoNumberLength);
  });

  test("구입한 개수 만큼 로또가 구매된다.", () => {
    const lottoCount = 5;
    const lotto = new Lotto();
    lotto.generateLottoTicket(lottoCount);
    expect(lotto.getLottoList()).toHaveLength(lottoCount);
  });
});

describe("구입할 금액 유효성 테스트", () => {
  test("1000원 이상 이어야 한다.", () => {
    const amount = 1000;
    expect(!isValidMinimumAmount(amount)).toBeTruthy();
  });

  test("1000원 미만으로 입력할 수 없다.", () => {
    const amount = 999;
    expect(() => validatePurchaseAmount(amount).toThrow(ERROR_MESSAGES.MINIMUM_AMOUNT_IS_SMALL));
  });

  test("1000원 단위로 입력 가능하다.", () => {
    const amount = 2000;
    expect(!isValidAmountUnit(amount)).toBeTruthy();
  });

  test("1000원 단위가 아니면 입력할 수 없다.", () => {
    const amount = 2200;
    expect(() => validatePurchaseAmount(amount)).toThrow(ERROR_MESSAGES.NOT_DIVIDED_INTO_THOUSAND);
  });
});
