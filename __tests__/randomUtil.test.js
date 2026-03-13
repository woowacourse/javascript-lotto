import MissionRandomUtil from "../src/util/MissionRandomUtil.js";
import MockRandomUtil from "./mocks/MockRandomUtil.js";

describe("랜덤 생성 유틸리티 테스트", () => {
  test("RandomUtil과 MockRandomUtil은 pickUniqueNumbers 인스턴스 메서드를 가진다.", () => {
    const randomUtil = new MissionRandomUtil();
    const mockRandomUtil = new MockRandomUtil();

    expect(typeof randomUtil.pickUniqueNumbers).toBe("function");
    expect(typeof mockRandomUtil.pickUniqueNumbers).toBe("function");
  });

  test("RandomUtil과 MockRandomUtil의 pickUniqueNumbers 메서드는 동일하게 호출되어 6개의 숫자를 배열로 반환한다.", () => {
    const mockRandomUtil = new MockRandomUtil([[1, 2, 3, 4, 5, 6]]);
    const mockRandomUtilResult = mockRandomUtil.pickUniqueNumbers();
    expect(mockRandomUtilResult).toHaveLength(6)

    const randomUtil = new MissionRandomUtil();
    const randomUtilResult = randomUtil.pickUniqueNumbers();
    expect(randomUtilResult).toHaveLength(6)
  });
});
