import Lotto from '../../src/domain/Lotto';

describe('lotto 테스트 - random number로 생성될 때', () => {
  test('구매한 로또는 6개의 중복되지 않은 숫자로 발행된다.', () => {
    const lotto = new Lotto();

    expect(new Set(lotto.lottoNumbers).size).toBe(6);
  });
});

describe('lotto 테스트 - winnigLotto를 유저가 입력할 때', () => {
  test('입력한 winnigLotto가 6개가 아닐 때, 예외가 발생한다.', () => {
    const inputNumber = [1, 2, 3, 4];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });

  test('입력한 winnigLotto가 중복이 존재할 때, 예외가 발생한다.', () => {
    const inputNumber = [1, 2, 3, 4, 10, 10];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });

  test('입력한 winnigLotto가 숫자가 아닌 값이 존재할 때, 예외가 발생한다.', () => {
    const inputNumber = [1, 2, 3, 'e', 5, 6];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });

  test('입력한 winnigLotto가 1~45 범위를 벗어날 때, 예외가 발생한다.', () => {
    const inputNumber = [1, 2, 3, 4, 5, 100];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });
});
