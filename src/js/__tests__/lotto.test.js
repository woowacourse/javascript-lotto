import Lotto from "../models/Lotto";

describe("로또 모델 테스트", () => {
  it("로또 모델에 숫자 배열을 인자로 넣어서 인스턴스를 생성할 수 있다.", () => {
    const lotto = Lotto.create([1, 2, 3, 4, 5, 6]);
    expect(lotto.lottoNumbers).toContain(1, 2, 3, 4, 5, 6);
  });

  it("로또 모델의 배열에 들어갈 값은 1이상 45이하의 숫자여야 한다.", () => {
    const invalidInput = [1, 2, 3, 4, 5, 46];

    try {
      const invalidLotto = Lotto.create(invalidInput);
    } catch ({ message }) {
      expect(message).toEqual("잘못된 입력 값");
    }
  });

  it("로또 모델에 들어갈 배열의 길이는 6이어야 한다.", () => {
    const invalidInput = [1, 2, 3, 4, 5, 6, 7];
    try {
      const invalidLotto = Lotto.create(invalidInput);
    } catch ({ message }) {
      expect(message).toEqual("잘못된 입력 값");
    }
  });

  // it("로또 모델의 번호와 당첨 번호를 비교하여 등수를 반환할 수 있어야 한다.", () => {
  //   const winNumber = [1, 2, 3, 4, 5, 6, 7];
  //   const validLotto = Lotto.create([1, 2, 3, 4, 5, 6]);
  //   expect(validLotto.lottoScore(winNumber)).toBe();
  // });
});
