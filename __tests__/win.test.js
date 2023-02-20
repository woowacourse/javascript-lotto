import Win from '../src/domain/Win';
describe('Win 객체 테스트', () => {
  test('입력 받은 번호를 Win 객체에 추가한다.', () => {
    // given
    const inputWinningNumber = [23, 7, 19, 1, 43, 28];

    // when
    const win = new Win(inputWinningNumber);

    // then
    expect(win.winningNumber).toEqual(inputWinningNumber);
  });

  test('입력 받은 보너스 번호 Win 객체에 추가한다.', () => {
    // given
    const inputWinningNumber = [23, 7, 19, 1, 43, 28];
    const inputBonusNumber = 1;
    const win = new Win(inputWinningNumber);

    // when
    win.bonusNumber = inputBonusNumber;

    // then
    expect(win.bonusNumber).toBe(inputBonusNumber);
  });
});
