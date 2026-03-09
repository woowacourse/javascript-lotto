import MyLotto from "../src/domain/MyLottos";

describe("getProfit", () => {
  test("로또 당첨 수익률을 계산한다", () => {
    const result = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 1,
    };

    const randomLottos = [
      [1,2,3,4,5,6],
      [7,8,9,10,11,12],
      [13,14,15,16,17,18],
      [19,20,21,22,23,24],
      [25,26,27,28,29,30],
      [31,32,33,34,35,36],
      [37,38,39,40,41,42],
      [1,2,3,4,5,44],
    ]

    const money = 8000;
    const myLotto = new MyLotto(money, randomLottos);
    const profit = myLotto.getProfit(result);
    expect(profit).toBe("62.5");
  });
});
