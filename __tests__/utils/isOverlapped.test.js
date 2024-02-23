import isOverlapped from "../../src/utils/isOverlapped.js";

describe("배열 중복값 유뮤 확인 유틸 함수 테스트", () => {
  test("중복 값이 존재하면 참을 반환한다.", () => {
    const overlappedArray = [1, 2, 2, 2, 3, 4];
    expect(isOverlapped(overlappedArray)).toBe(true);
  });

  test("중복 값이 없으면 거짓을 반환한다.", () => {
    const uniqueArray = [1, 2, 3, 4, 5, 6];
    expect(isOverlapped(uniqueArray)).toBe(false);
  });
});
