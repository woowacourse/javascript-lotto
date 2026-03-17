import pickUniqueNumbersInRange from "../../src/utils/Random";

describe("랜덤 숫자 함수 테스트 (pickUniqueNumbersInRange", () => {
  test("입력값이 정수가 아니면 에러를 출력한다.", () => {
    expect(() => pickUniqueNumbersInRange(1.5, 10, 3)).toThrow("숫자는 정수여야 합니다.");
    expect(() => pickUniqueNumbersInRange(1, 10.5, 3)).toThrow("숫자는 정수여야 합니다.");
    expect(() => pickUniqueNumbersInRange(1, 10, 3.5)).toThrow("숫자는 정수여야 합니다.");
  });

  test("시작값이 끝값보다 크면 에러를 출력한다.", () => {
    expect(() => pickUniqueNumbersInRange(10, 1, 3)).toThrow("시작값은 끝값보다 클 수 없습니다.");
  });

  test("count가 0보다 작으면 에러를 출력한다.", () => {
    expect(() => pickUniqueNumbersInRange(1, 10, -1)).toThrow("count는 0보다 작을 수 없습니다.");
  });

  test("추출 개수가 범위를 초과하면 에러를 출력한다.", () => {
    expect(() => pickUniqueNumbersInRange(1, 3, 4)).toThrow("추출 개수가 범위를 초과했습니다.");
  });
});
