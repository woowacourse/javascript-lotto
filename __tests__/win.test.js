import Win from '../src/domain/Win';

test('입력 받은 번호를 Win 객체에 추가한다.', () => {
  // given
  const inputWinningNumber = [23, 7, 19, 1, 43, 28];

  // when
  const win = new Win(inputWinningNumber);

  // then
  expect(win.winningNumber).toEqual(inputWinningNumber);
});
