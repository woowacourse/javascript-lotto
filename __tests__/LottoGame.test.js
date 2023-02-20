import LottoGame from '../src/domain/feature/LottoGame';
import Validator from '../src/domain/Validator';

describe('LottoGame 클래스 테스트', () => {
  test('구매 금액은 1000원 단위의 숫자를 입력해야 한다.', () => {
    expect(() => {
      const lottoGame = new LottoGame();
      lottoGame.purchaseLottos(1000);
      return true;
    }).toBeTruthy();
  });

  test('로또 구매 금액이 숫자 타입이 아닐 경우 에러', () => {
    expect(() => {
      const lottoGame = new LottoGame();
      lottoGame.purchaseLottos('a');
    }).toThrow('[ERROR]');
  });

  test('로또 구매 금액이 1000원 단위가 아닐 경우 에러', () => {
    expect(() => {
      const lottoGame = new LottoGame();
      lottoGame.purchaseLottos(1200);
    }).toThrow('[ERROR]');
  });

  test('재시작 명령어 입력 값은 "y" 혹은 "n"이어야 한다.', () => {
    expect(() => {
      const lottoGame = new LottoGame();
      lottoGame.determineRetry('y');
      lottoGame.determineRetry('n');
      return true;
    }).toBeTruthy();
  });

  test('재시작 명령어 입력 값은 "y" 혹은 "n"이 아닌 다른 값일 경우 에러', () => {
    expect(() => {
      const lottoGame = new LottoGame();
      lottoGame.determineRetry('a');
    }).toThrow();
  });

  test('구매 금액 만큼의 로또를 생성한다.', () => {
    const lottoGame = new LottoGame();

    lottoGame.purchaseLottos(8000);
    const lottos = lottoGame.getLottos();

    expect(lottos.length).toBe(8);
  });
});
