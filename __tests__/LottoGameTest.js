import LottoGame from "../src/Model/LottoGame.js";
import LottoList from "../src/Model/LottoList.js";
import random from "../src/utils/random.js";

const mockRandoms = (numbers) => {
  random.randomArray = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, random.randomArray);
};

describe("로또게임 테스트", () => {
  test("로또게임 객체는 당첨 로또를 가진다.", () => {
    const lottoGame = new LottoGame([1, 2, 3, 4, 5, 6], 7);

    expect(lottoGame.getWinningNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test("로또게임 객체는 보너스 번호를 가진다.", () => {
    const lottoGame = new LottoGame([1, 2, 3, 4, 5, 6], 7);

    expect(lottoGame.getBonusNumber()).toBe(7);
  });
  test("로또게임 객체는 등수를 계산할 수 있다.", () => {
    const amount = 2;
    const randoms = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ];

    mockRandoms(randoms);
    const lottoList = new LottoList(amount);

    const lottoGame = new LottoGame([1, 2, 3, 4, 5, 6], 7);

    expect(lottoGame.getStatistics(lottoList)).toEqual({
      1: 1,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      0: 1,
    });
  });
});
