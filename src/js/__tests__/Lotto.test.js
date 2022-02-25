import Lotto from '../models/Lotto';

describe('로또의 번호는 유효한 타입과 유효한 범위여야 한다.', () => {
  it('로또번호는 숫자로만 이루어져 있다.', () => {
    const lotto = new Lotto();
    const wrongTypeInputs = ['일', '이', '삼'];
    const validTypeInput = 10;
    wrongTypeInputs.forEach((input) => lotto.pushNumberIntoPickedNumbers(input));
    lotto.pushNumberIntoPickedNumbers(validTypeInput);
    lotto.pushNumberIntoPickedNumbers(validTypeInput);

    expect(lotto.pickedNumbers.length).toBe(1);
  });

  it('로또번호는 중복될 수 없다.', () => {
    const duplicatedNumber = 1;
    const lotto = new Lotto();

    lotto.pushNumberIntoPickedNumbers(duplicatedNumber);
    lotto.pushNumberIntoPickedNumbers(duplicatedNumber);

    expect(lotto.pickedNumbers.length).toBe(1);
  });

  it('로또 숫자는 1에서 45 사이여야 한다.', () => {
    const lotto = new Lotto();
    const invalidRangeNumbers = [-1, 0, 46, 100];

    invalidRangeNumbers.forEach((number) => lotto.pushNumberIntoPickedNumbers(number));
    expect(lotto.pickedNumbers.length).toBe(0);
  });

  it('로또번호는 6자리를 넘어갈 수 없다', () => {
    const testNumber = [1, 2, 3, 4, 5, 6, 7];
    const lotto = new Lotto();

    testNumber.forEach((number) => lotto.pushNumberIntoPickedNumbers(number));
    expect(lotto.pickedNumbers).toContain(1, 2, 3, 4, 5, 6);
  });

  it('로또번호는 6자리여야 한다.', () => {
    const lotto = new Lotto();
    lotto.generate();

    expect(lotto.pickedNumbers.length).toBe(6);
  });
});
