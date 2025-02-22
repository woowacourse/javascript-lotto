import { divideByUnit } from "../../src/utils/count.js";
import Lotto from "../../src/domain/Lotto.js";

import { ERROR } from "../../src/constants/message.js";

describe("로또 클래스 테스트", () => {
  test("로또 번호를 가질 수 있다.", () => {
    // given
    const lottoNumbers = [1, 2, 3, 4, 5, 6];

    // when
    const lotto = new Lotto(lottoNumbers);

    // then
    expect(lotto.getLottoNumbers()).toEqual(lottoNumbers);
  });

  test("로또 번호중에 중복된 숫자가 있으면 로또 객체가 생성이 되지 않는다.", () => {
    //given
    const lottoNumber = [1, 2, 3, 3, 4, 5];
    //when //then
    expect(() => {
      new Lotto(lottoNumber);
    }).toThrow(ERROR.DUPLICATE);
  });

  test("로또 번호는 오름차순으로 정렬된다", () => {
    // given
    const lottoNumbers = [4, 5, 6, 3, 2, 1];

    // when
    const lotto = new Lotto(lottoNumbers);

    // then
    expect(lotto.getLottoNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
