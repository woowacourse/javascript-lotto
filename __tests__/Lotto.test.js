import Lotto from "../src/domain/Lotto";

describe("로또 클래스 생성자 테스트", () => {
  test("6개의 번호를 필드로 갖는다", () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(lottoNumbers);

    expect(lotto.numbers.length).toBe(6);
  });

  test.each([
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4],
    [1, 2, 3],
    [1, 2],
    [1],
    [],
    [1, 2, 3, 4, 5, 6, 7],
  ])("6개 이외의 개수를 받으면 오류를 발생시킨다.", (...numbers) => {
    expect(() => {
      new Lotto(numbers);
    }).toThrow();
  });

  test.each([
    [1, 2, 3, 4, 5, "6"],
    [1, 2, 3, 4, 5, true],
    [1, 2, 3, 4, 5, {}],
    [1, 2, 3, 4, 5, []],
    [1, 2, 3, 4, 5, undefined],
    [1, 2, 3, 4, 5, null],
  ])("각 로또번호의 타입이 숫자가 아니면 오류를 발생시킨다.", (...numbers) => {
    expect(() => {
      new Lotto(numbers);
    }).toThrow();
  });

  test.each([
    [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
    [1, 2, 3, 4, 5, 6.1],
  ])("모든 로또 번호가 정수가 아니면, 오류를 발생시킨다.", (...numbers) => {
    expect(() => new Lotto(numbers)).toThrow();
  });

  test.each([
    [-1, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [1, 10, 20, 30, 40, 50],
    [1, 10, 20, 30, 40, 46],
  ])(
    "모든 로또 번호가 1 이상 45 이하의 자연수가 아니면, 오류를 발생시킨다.",
    (...numbers) => {
      expect(() => new Lotto(numbers)).toThrow();
    },
  );

  test.each([
    [1, 1, 1, 1, 1, 1],
    [1, 10, 20, 30, 40, 40],
  ])("로또 번호가 중복되는 경우 오류를 발생시킨다.", (...numbers) => {
    expect(() => new Lotto(numbers)).toThrow();
  });
});
