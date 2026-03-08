import RandomUtil from "../src/step1/util/RandomUtil.js";
import MockRandomUtil from "./utils/MockRandomUtil.js";

describe("랜덤 생성 유틸리티 테스트", () => {
  test("RandomUtil과 MockRandomUtil은 모두 pickUniqSixNumbers 인스턴스 메서드를 가진다.", () => {
    const randomUtil = new RandomUtil();
    const mockRandomUtil = new MockRandomUtil();

    expect(typeof randomUtil.pickUniqSixNumbers).toBe("function");
    expect(typeof mockRandomUtil.pickUniqSixNumbers).toBe("function");
  });

  test("RandomUtil과 MockRandomUtil의 pickUniqSixNumbers 메서드는 모두 동일하게 호출되어 6개의 숫자를 배열로 반환한다.", async () => {
    const mockRandomUtil = new MockRandomUtil([[1, 2, 3, 4, 5, 6]]);
    const mockRandomUtilResult = await mockRandomUtil.pickUniqSixNumbers();
    expect(mockRandomUtilResult).toHaveLength(6)

    const randomUtil = new RandomUtil();
    const randomUtilResult = await randomUtil.pickUniqSixNumbers();
    expect(randomUtilResult).toHaveLength(6)
  });
});
