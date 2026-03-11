import { getRandomNumber } from "../src/Utils";

describe("유틸 함수 테스트", () => {
  test("[기능] 특정 범위 내의 무작위 숫자 하나를 반환해야 한다 (1~10)", () => {
    // given & when
    const randomNumber = getRandomNumber(1, 10);

    // then 나중에 모킹 해놓기
    expect(randomNumber >= 1 && randomNumber <= 10).toEqual(true);
  });
});
