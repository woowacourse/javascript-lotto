import WinningLotto from "../src/WinningLotto";

describe("구매한 lotto들을 관리하는 PurchasedLotto 테스트 코드", () => {
  test("주어진 로또 번호 배열의 개수만큼 Lotto 인스턴스를 내부에 생성", () => {
    const purchasedLotto = new PurchasedLotto([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
    ]);
    expect(purchasedLotto.getLottoCount()).toBe(3);
  });

  test("2차원 배열 형태가 아닌 값이 들어오면 에러", () => {
    expect(() => {
      new PurchasedLotto("1,2,3,4,5,6");
    }).toThrow("[ERROR]");
  });

  test("당첨 내역 계산", () => {
    const purchasedLotto = new PurchasedLotto([
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
      [1, 2, 3, 4, 5, 8],
      [1, 2, 3, 4, 7, 9],
      [1, 2, 3, 8, 9, 10],
      [1, 7, 8, 9, 10, 11],
    ]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
    expect(purchasedLotto.getPrizeList(winningLotto)).toEqual([
      0, 1, 1, 1, 1, 1,
    ]);
  });

  test("PurchasedLotto가 구입 금액 대비 수익률을 정확히 계산", () => {
    const purchasedLotto = new PurchasedLotto([
      [7, 8, 9, 10, 11, 12],
      [7, 8, 9, 10, 11, 12],
      [7, 8, 9, 10, 11, 12],
      [7, 8, 9, 10, 11, 12],
      [7, 8, 9, 10, 11, 12],
      [7, 8, 9, 10, 11, 12],
      [7, 8, 9, 10, 11, 12],
      [7, 8, 9, 10, 11, 12],
      [1, 2, 3, 8, 9, 10],
    ]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
    expect(purchasedLotto.calculateReturnRate(winningLotto, 8000)).toBe(62.5);
  });
});
