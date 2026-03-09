import { LOTTO } from "../src/constants";
import { getRandomNumber } from "../src/Utils";

describe("유틸 함수 테스트", () => {
  test(`${LOTTO.LOWER}~${LOTTO.UPPER} 사이의 무작위 숫자 하나를 반환해야 한다`, () => {
    // given & when
    const randomNumber = getRandomNumber(LOTTO.LOWER, LOTTO.UPPER);

    // then 나중에 모킹 해놓기
    expect(randomNumber >= LOTTO.LOWER && randomNumber <= LOTTO.UPPER).toEqual(
      true,
    );
  });
});
