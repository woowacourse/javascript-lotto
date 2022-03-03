import Lotto from "../model/Lotto.js";
import { LOTTO_NUMBER } from "../utils/constants.js";
import { isValidNumberRange } from "../utils/general.js";

/* eslint-disable no-undef */
describe("로또 번호 생성 테스트", () => {
  test("로또 번호는 1부터 45 범위 안에 있어야 한다.", () => {
    const lotto = new Lotto();
    const lottoNumbers = lotto.generateLottoNumber();
    expect(
      lottoNumbers.some((number) =>
        isValidNumberRange(number, LOTTO_NUMBER.RANGE_MIN, LOTTO_NUMBER.RANGE_MAX),
      ),
    ).toBeFalsy();
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
