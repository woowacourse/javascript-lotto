import LottoList from "../src/Model/LottoList.js";
import random from "../src/utils/random.js";

const mockRandoms = (numbers) => {
  jest.spyOn(random, "randomArray");
  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    random.randomArray
  );
};

describe("로또 리스트 검사 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("금액이 5000원이라면 로또 5장이 발행된다.", () => {
    mockRandoms([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
    ]);
    const amount = 5;
    const lottoList = new LottoList(amount);

    expect(lottoList.getLottoList().length).toBe(5);
  });
  test("각 로또 번호는 총 6개이다.", () => {
    const amount = 2;
    const lottoList = new LottoList(amount);

    const isLottoHasSixNumbers = lottoList
      .getLottoList()
      .every((lotto) => lotto.getNumbers().length === 6);

    expect(isLottoHasSixNumbers).toBe(true);
  });

  test("모든 로또 번호는 1~45 범위이다.", () => {
    mockRandoms([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
    ]);
    const amount = 5;
    const lottoList = new LottoList(amount);

    const isNumbersInRange = lottoList
      .getLottoList()
      .every((lotto) =>
        lotto.getNumbers().every((number) => number >= 1 && number <= 45)
      );

    expect(isNumbersInRange).toBe(true);
  });

  test("모든 로또에 대해 한 장 안에서 번호들은 중복되지 않는다.", () => {
    mockRandoms([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
    ]);
    const amount = 5;
    const lottoList = new LottoList(amount);

    const isAllLottoNumbersUnique = lottoList
      .getLottoList()
      .every(
        (lotto) =>
          new Set(lotto.getNumbers()).size === lotto.getNumbers().length
      );

    expect(isAllLottoNumbersUnique).toBe(true);
  });

  test("로또 한 장 번호들은 오름차순으로 정렬된다.", () => {
    mockRandoms([
      [1, 2, 3, 4, 5, 6],
      [4, 5, 6, 7, 8, 9],
    ]);
    const amount = 2;

    const lottoList = new LottoList(amount);

    const isAscending = lottoList.getLottoList().every((lotto) => {
      const numbers = lotto.getNumbers();
      return numbers.every(
        (number, index) => index === 0 || numbers[index - 1] <= number
      );
    });

    expect(isAscending).toBe(true);
  });
});
