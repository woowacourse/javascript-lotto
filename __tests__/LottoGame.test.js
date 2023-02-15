import LottoGame from '../src/domain/LottoGame';

describe('로또 번호에 보너스 번호가 포함되어 있는지 여부를 반환', () => {
  test('보너스 번호가 포함되어 있으면, true를 반환한다.', () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 3;

    const lottoGame = new LottoGame();
    const testResult = lottoGame.hasBonusNumber(lotto, bonusNumber);

    expect(testResult).toBe(true);
  });

  test('보너스 번호가 포함되어 있지 않으면, false를 반환한다.', () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 8;

    const lottoGame = new LottoGame();
    const testResult = lottoGame.hasBonusNumber(lotto, bonusNumber);

    expect(testResult).toBe(false);
  });
});

// fn(arr, bonusNumber)

// fn() {
//     asdasd(); 일치하는 일반 로또 개수 반환
//     zxc(); 보너스 로또와 일치하는지 반환
// }

// LottoGame
