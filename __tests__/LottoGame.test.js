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
  test.each([
    [
      "6개 번호가 일치하면 1등",
      [1, 2, 3, 4, 5, 6],
      7,
      [[1, 2, 3, 4, 5, 6]],
      { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 0: 0 },
    ],
    [
      "5개 번호와 보너스 번호가 일치하면 2등",
      [1, 2, 3, 4, 5, 6],
      7,
      [[1, 2, 3, 4, 5, 7]],
      { 1: 0, 2: 1, 3: 0, 4: 0, 5: 0, 0: 0 },
    ],
    [
      "5개 번호만 일치하면 3등",
      [1, 2, 3, 4, 5, 6],
      7,
      [[1, 2, 3, 4, 5, 8]],
      { 1: 0, 2: 0, 3: 1, 4: 0, 5: 0, 0: 0 },
    ],
    [
      "4개 번호가 일치하면 4등",
      [1, 2, 3, 4, 5, 6],
      7,
      [[1, 2, 3, 4, 8, 9]],
      { 1: 0, 2: 0, 3: 0, 4: 1, 5: 0, 0: 0 },
    ],
    [
      "3개 번호가 일치하면 5등",
      [1, 2, 3, 4, 5, 6],
      7,
      [[1, 2, 3, 8, 9, 10]],
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 1, 0: 0 },
    ],
    [
      "3개 번호 미만이 일치하면 낙첨",
      [1, 2, 3, 4, 5, 6],
      7,
      [[1, 2, 8, 9, 10, 11]],
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 0: 1 },
    ],
  ])("%s", (_, winningNumbers, bonusNumber, lottoNumbersList, expected) => {
    mockRandoms(lottoNumbersList);

    const lottoList = new LottoList(lottoNumbersList.length);
    const lottoGame = new LottoGame(winningNumbers, bonusNumber);

    expect(lottoGame.calculateStatistics(lottoList)).toEqual(expected);
  });
});
