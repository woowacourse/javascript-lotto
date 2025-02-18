import App from "../src/App.js";

describe("", () => {
  test("로또 등수를 반환한다.", () => {
    const app = new App();
    const purchasedLottos = [
      [1, 2, 3, 4, 5, 7],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
    ];
    const winNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    // 몇 개 당첨되었고, 보너스 번호가 맞았는지 틀렸는지를 인자로 전달 받고, 그 결과 값이 등수
    expect(app.getRank(5, false)).toBe("3");
  });
});
