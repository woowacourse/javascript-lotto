import LottoGame from '../src/domain/LottoGame';
import Validator from '../src/domain/Validator';

describe('LottoGame 클래스 테스트', () => {
  test('구매 금액은 숫자여야 한다.', () => {
    expect(() => {
      Validator.validateNumberType('a');
    }).toThrow('[ERROR]');
  });

  test('구매 금액은 1000 단위여야 한다.', () => {
    expect(() => {
      Validator.validateExactUnit(1200, 1000);
    }).toThrow('[ERROR]');
  });

  test('입력한 명령어가 지정된 명령어 리스트에 포함되어있어야 한다.', () => {
    expect(() => {
      Validator.validateRetryCommand('d');
    }).toThrow('[ERROR]');
  });

  test('구매 금액 만큼의 로또를 생성한다.', () => {
    const lottoGame = new LottoGame();

    lottoGame.purchaseLottos(8000);
    const lottos = lottoGame.getLottos();

    expect(lottos.length).toBe(8);
  });
});
