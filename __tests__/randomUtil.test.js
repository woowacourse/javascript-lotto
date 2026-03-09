import MissionRandomUtil from "../src/step1/util/MissionRandomUtil.js";
import MockRandomUtil from "./utils/MockRandomUtil.js";

describe("랜덤 생성 유틸리티 테스트", () => {
  test("RandomUtil과 MockRandomUtil은 모두 pickUniqNumbers 인스턴스 메서드를 가진다.", () => {
    const randomUtil = new MissionRandomUtil();
    const mockRandomUtil = new MockRandomUtil();

    expect(typeof randomUtil.pickUniqNumbers).toBe("function");
    expect(typeof mockRandomUtil.pickUniqNumbers).toBe("function");
  });

  test("RandomUtil과 MockRandomUtil의 pickUniqNumbers 메서드는 모두 동일하게 호출되어 6개의 숫자를 배열로 반환한다.", async () => {
    const mockRandomUtil = new MockRandomUtil([[1, 2, 3, 4, 5, 6]]);
    const mockRandomUtilResult = await mockRandomUtil.pickUniqNumbers();
    expect(mockRandomUtilResult).toHaveLength(6)

    const randomUtil = new MissionRandomUtil();
    const randomUtilResult = await randomUtil.pickUniqNumbers();
    expect(randomUtilResult).toHaveLength(6)
  });
});
