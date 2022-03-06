import { winningNumber } from '../model/winningNumber';

describe('당첨 번호 테스트', () => {
  test('당첨 번호를 저장한다.', () => {
    winningNumber.setWinningNumber([8, 13, 18, 24, 27, 29, 17]);
    expect(winningNumber.getWinningNumber().join(',')).toBe('8,13,18,24,27,29');
    expect(winningNumber.getBonusNumber()).toBe(17);
  });

  test('당첨 번호 중 1등 당첨 번호를 가져온다.', () => {
    winningNumber.initializeWinningNumber();
    winningNumber.setWinningNumber([8, 13, 18, 24, 27, 29, 17]);
    expect(winningNumber.getWinningNumber().join(',')).toBe('8,13,18,24,27,29');
  });

  test('당첨 번호 중 보너스 번호를 가져온다.', () => {
    winningNumber.initializeWinningNumber();
    winningNumber.setWinningNumber([8, 13, 18, 24, 27, 29, 17]);
    expect(winningNumber.getBonusNumber()).toBe(17);
  });

  test('저장된 당첨 번호를 초기화한다.', () => {
    winningNumber.initializeWinningNumber();
    expect(winningNumber.numbers.length).toBe(0);
    expect(winningNumber.bonusNumber).toBe(0);
  });
});
