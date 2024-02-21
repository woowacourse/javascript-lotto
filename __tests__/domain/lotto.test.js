import Lotto from '../../src/domain/Lotto';
describe('lotto 테스트 - random number로 생성될 때', () => {
  test('구매한 로또가 6개의 중복되지 않은 숫자로 발행되는가', () => {
    const lotto = new Lotto();

    expect(new Set(lotto.lottoNumbers).size).toBe(6);
  });
});

describe('lotto 테스트 - winnigLotto를 유저가 입력할 때', () => {
  test('입력한 winnigLotto가 6개인가', () => {
    const inputNumber = [1, 2, 3, 4];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });

  test('입력한 winnigLotto가 중복되지 않은 6개의 수인가', () => {
    const inputNumber = [1, 2, 3, 4, 10, 10];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });

  test('입력한 winnigLotto가 모두 숫자인가', () => {
    const inputNumber = [1, 2, 3, 'e', 5, 6];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });

  test('입력한 winnigLotto가 모두 1부터 45 범위 안에 있는가', () => {
    const inputNumber = [1, 2, 3, 4, 5, 100];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });
});
