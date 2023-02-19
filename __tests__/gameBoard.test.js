import GameBoard from '../src/domain/GameBoard';
import Lotto from '../src/domain/Lotto';

describe('GameBoard 객체 테스트', () => {
  test('입력 받은 로또 번호들과 GameBoard의 당첨 번호를 비교한다', () => {
    // given
    const inputWinningNumber = [23, 7, 19, 1, 43, 28];
    const bonusNumber = 3;

    const lottoNumber = [1, 7, 2, 10, 4, 39];

    // when
    const gameBoard = new GameBoard(inputWinningNumber, bonusNumber);
    const matchCount = gameBoard.getMatchCount(lottoNumber);

    // then
    expect(matchCount).toBe(2);
  });

  test('입력된 lotto 번호에 따라 결과를 출력한다.', () => {
    // given
    const lottos = [
      new Lotto([2, 3, 4, 10, 29, 31]),
      new Lotto([2, 3, 4, 10, 29, 31]),
      new Lotto([1, 2, 40, 41, 42, 43]),
      new Lotto([1, 2, 3, 4, 5, 7]),
      new Lotto([5, 6, 7, 8, 9, 10]),
    ];
    const inputWinningNumber = [1, 2, 3, 4, 5, 6];
    const inputBonusNumber = 7;
    const gameBoard = new GameBoard(inputWinningNumber, inputBonusNumber);

    // when
    const lottoResults = lottos.map((lotto) => gameBoard.getLotteResult(lotto));
    // then

    expect(lottoResults).toEqual([5, 5, 0, 2, 0]);
  });
});
