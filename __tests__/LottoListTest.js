import LottoList from "../src/Model/LottoList.js";
import Random from "../src/utils/Random.js";

const mockRandoms = (numbers) => {
  Random.randomArray = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, Random.randomArray);
};

describe("로또 리스트 검사 테스트", () => {
  test("로또 리스트 객체는 로또 개수를 받아 그 개수만큼 로또 배열을 가진다.", () => {
    const amount = 5;
    const lottoList = new LottoList(amount);

    expect(lottoList.getLottoList().length).toBe(5);
  });
  test("로또 객체는 중복되지 않은 번호들 오름차순으로 가진다.", () => {
    const amount = 2;
    const randoms = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ];

    mockRandoms(randoms);
    const lottoList = new LottoList(amount);

    expect(lottoList.getLottoList()[0].getNumbers()).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
  });
});
