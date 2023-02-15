import Lotto from "../src/domain/Lotto.js";
import WinningLotto from "../src/domain/WinningLotto.js";
import Validator from "../src/domain/Validator.js";
import parseToNumberTypeArray from "../src/utils/parseToNumberTypeArray.js";
import getRandomNumberArray from "../src/utils/getRandomNumberArray.js";
import getSameElementCount from "../src/utils/getSameElementCount.js";
import isExistData from "../src/utils/isExistData.js";
import getProfitRate from "../src/utils/getProfitRate.js";

test("로또 객체를 생성하면 로또 번호가 저장된다.", () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

  expect(lotto.getLottoNumber()).toEqual([1, 2, 3, 4, 5, 6]);
});

test("로또 번호는 6자리이다.", () => {
  expect(() => {
    Validator.validateLottoNumberLength([1, 2, 3, 4, 5, 6, 7]);
  }).toThrow("[ERROR]");
});

test("로또 번호는 서로 중복되지 않는다.", () => {
  expect(() => {
    Validator.validateLottoNumberDuplicated([1, 2, 3, 4, 5, 5]);
  }).toThrow("[ERROR]");
});

test("로또 번호는 1~45 사이의 숫자여야 한다.", () => {
  expect(() => {
    Validator.validateLottoNumberRange([100, 2, 3, 4, 5, 6]);
  }).toThrow("[ERROR]");
});

test("보너스 번호는 당첨번호와 중복되지 않는다.", () => {
  expect(() => {
    Validator.validateBonusNumberDuplicated([1, 2, 3, 4, 5, 6], 2);
  }).toThrow("[ERROR]");
});

test("보너스 번호가 1~45 사이의 숫자가 아니라면 예외 처리", () => {
  expect(() => {
    Validator.validateBonusNumberRange(50);
  }).toThrow("[ERROR]");
});

test("구매 금액은 숫자여야 한다.", () => {
  expect(() => {
    Validator.validateNumberType("a");
  }).toThrow("[ERROR]");
});

test("구매 금액은 1000 단위여야 한다.", () => {
  expect(() => {
    Validator.validateExactUnit(1000, 1200);
  }).toThrow("[ERROR]");
});

test("당첨 번호 문자열을 숫자 배열로 파싱한다", () => {
  const lottoNumbers = parseToNumberTypeArray("11 ,2 , 44,  29  ,3 ,6");
  expect(lottoNumbers).toEqual([11, 2, 44, 29, 3, 6]);
});

test("당첨 로또 객체를 생성하면 당첨 로또 번호와 보너스 번호가 저장된다.", () => {
  const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

  const winningLottoNumber = winningLotto.getLottoNumber();
  const bonusNumber = winningLotto.getBonusNumber();

  expect([winningLottoNumber, bonusNumber]).toEqual([[1, 2, 3, 4, 5, 6], 7]);
});

test("길이 값을 넣으면 중복되지 않은 숫자 배열을 반환한다.", () => {
  const randomNumberArray = getRandomNumberArray(6);

  const arrayLength = randomNumberArray.length;
  const isArrayValueDuplicated =
    randomNumberArray.length === [...new Set(randomNumberArray)].length;

  expect(arrayLength).toBe(6);
  expect(isArrayValueDuplicated).toBeTruthy();
});

test("두 배열의 숫자들을 비교하여 같은 숫자의 수를 반환한다.", () => {
  const sameNumberLength = getSameElementCount(
    [1, 2, 3, 4, 5, 6],
    [4, 5, 6, 7, 8, 9]
  );
  expect(sameNumberLength).toBe(3);
});

test("첫 인자로 들어온 수가 두 번쨰 인자 배열에 존재하는 값인지 확인한다", () => {
  const isInclude = isExistData(6, [1, 2, 3, 4, 5, 6]);
  expect(isInclude).toBeTruthy();
});

test("구매 금액과 상금을 비교해서 수익률을 계산한다.", () => {
  const purchaseMoney = 8000;
  const prizeMoney = 5000;

  const profitRate = getProfitRate(purchaseMoney, prizeMoney);

  expect(profitRate.toFixed(1)).toBe("62.5");
});
