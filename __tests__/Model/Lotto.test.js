import Lotto from "../../src/Model/Lotto.js";
import { ERROR_MESSAGE } from "../../src/constants/errorMessage.js";

describe("로또 검사 테스트", () => {
  test("로또 객체는 로또 번호를 가진다.", () => {
    const randomNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(randomNumbers);

    expect(lotto.getNumbers().length).toBe(6);
  });
  test("로또 객체는 중복되지 않은 번호들 오름차순으로 가진다.", () => {
    const randomNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(randomNumbers);

    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("로또가 가진 번호가 6개가 아닌 경우", () => {
    const randomNumbers = [1, 2, 3, 4, 5];
    const lotto = new Lotto(randomNumbers);

    expect(lotto.getNumbers().length).toThrow(
      ERROR_MESSAGE.INVALID_NUMBER_LENGTH,
    );
  });

  test("로또 숫자들의 범위가 1에서 45 범위를 초과한 경우", () => {
    const randomNumbers = [1, 2, 3, 4, 5, 50];
    const lotto = new Lotto(randomNumbers);

    expect(lotto.getNumbers().length).toThrow(
      ERROR_MESSAGE.INVALID_NUMBER_RANGE,
    );
  });

  test("로또 숫자들이 중복된 경우", () => {
    const randomNumbers = [1, 2, 3, 4, 5, 5];
    const lotto = new Lotto(randomNumbers);

    expect(lotto.getNumbers().length).toThrow(
      ERROR_MESSAGE.MUST_BE_NOT_DUPLICATE,
    );
  });
});
