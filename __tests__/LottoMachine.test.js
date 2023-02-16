const LottoMachine = require('../src/domain/LottoMachine');

describe('LottoMachine 클래스 테스트', () => {
  test.each([[0], [8001], ['']])(
    '구입 금액이 1000으로 나누어 떨어지지 않는 경우 예외 처리한다.',
    (input) => {
      expect(() => {
        new LottoMachine(input);
      }).toThrow();
    }
  );

  test.each([
    [1000, 1],
    [8000, 8],
  ])(
    '구입 금액을 1000으로 나눈 개수만큼의 로또를 발행한다.',
    (input, expected) => {
      expect(new LottoMachine(input).lottos).toHaveLength(expected);
    }
  );
});
