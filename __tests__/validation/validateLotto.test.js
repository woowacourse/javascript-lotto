import { ERROR } from "../../src/constants/message.js";
import validateLotto from "../../src/validation/validateLotto.js";
import { LOTTO_NUMBER } from "../../src/constants/lotto.js";

describe("로또 숫자 유효성 검사를 진행한다", () => {
  test("로또 번호중에 중복된 숫자가 있으면 오류를 발생시킨다.", () => {
    const lottoNumber = [1, 2, 3, 3, 4, 5];

    expect(() => validateLotto(lottoNumber)).toThrow(ERROR.DUPLICATE);
  });

  test(`로또 번호가 ${LOTTO_NUMBER.LENGTH}개 미만인 경우 오류를 발생시킨다.`, () => {
    const lottoNumber = Array.from(
      { length: LOTTO_NUMBER.LENGTH - 1 },
      (_, i) => i + 1
    );

    expect(() => validateLotto(lottoNumber)).toThrow(ERROR.LENGTH);
  });

  test(`로또 번호가 ${LOTTO_NUMBER.LENGTH}개를 초과할 경우 오류를 발생시킨다.`, () => {
    const lottoNumber = Array.from(
      { length: LOTTO_NUMBER.LENGTH + 1 },
      (_, i) => i + 1
    );

    expect(() => validateLotto(lottoNumber)).toThrow(ERROR.LENGTH);
  });
});
