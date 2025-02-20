import LottoValidator from "../src/validation/LottoValidator.js";

describe("로또 숫자 유효성 검사를 진행한다", () => {
  test("로또 번호중에 중복된 숫자가 있으면 오류를 발생시킨다.", () => {
    const lottoNumber = [1, 2, 3, 3, 4, 5];
    const lottoValidator = new LottoValidator();

    expect(() => lottoValidator.validateLotto(lottoNumber)).toThrow("[ERROR]");
  });

  test("로또 번호가 6개 미만인 경우 오류를 발생시킨다.", () => {
    const lottoNumber = [1, 2, 3, 4, 5];
    const lottoValidator = new LottoValidator();

    expect(() => lottoValidator.validateLotto(lottoNumber)).toThrow("[ERROR]");
  });

  test("로또 번호가 6개를 초과할 경우 오류를 발생시킨다.", () => {
    const lottoNumber = [1, 2, 3, 4, 5, 6, 7];
    const lottoValidator = new LottoValidator();

    expect(() => lottoValidator.validateLotto(lottoNumber)).toThrow("[ERROR]");
  });
});
