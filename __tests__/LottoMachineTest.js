import { makeLottos, pickUniqueNumbersInRange } from "../src/LottoMachine";

const mockRandoms = (numbers) => {
  pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, pickUniqueNumbersInRange);
};

describe("로또 발행 테스트", () => {
  test("생성된 로또 번호는 1-45 사이 중복되지 않는 6개 숫자여야 한다", () => {
    const lotto = pickUniqueNumbersInRange(1, 45, 6);
    expect(lotto).toHaveLength(6);

    lotto.forEach((num) => {
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(45);
    });

    const uniqueSize = new Set(lotto).size;
    expect(uniqueSize).toBe(6);
  });

  test("입력한 개수에 맞는 로또 개수 만큼 로또가 발행된다.", () => {
    const amount = 3;
    const lottos = makeLottos(amount);
    expect(lottos).toHaveLength(3);
  });
});
