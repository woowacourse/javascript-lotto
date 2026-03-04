import { calPrize } from "../src/WinningRate";

describe("당첨 등수 계산 테스트", () => {
  test("당첨 번호 개수가 6개이면 1등", () => {
    const count = 6;
    const hasBonus = true;
    const prize = calPrize(count, hasBonus);

    expect(prize).toEqual(1);
  });

  test("당첨 번호 개수가 5개이고 보너스 번호가 있으면 2등", () => {
    const count = 5;
    const hasBonus = true;
    const prize = calPrize(count, hasBonus);

    expect(prize).toEqual(2);
  });

  test("당첨 번호 개수가 5개이고 보너스 번호가 없으면 3등", () => {
    const count = 5;
    const hasBonus = false;
    const prize = calPrize(count, hasBonus);

    expect(prize).toEqual(3);
  });

  test("당첨되지 않은 경우에는 당첨목록에서 제외된다. ", () => {
    const count = 2;
    const hasBonus = true;
    const prize = calPrize(count, hasBonus);

    expect(prize).toEqual(0);
  });
});
