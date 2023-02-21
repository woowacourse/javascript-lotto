const WinningNumbers = require('../src/domain/model/WinningNumbers');

describe('WinningNumbers 클래스 테스트', () => {
  test('주어진 당첨 번호와 보너스 번호를 필드로 가지는 WinningNumbers 인스턴스를 생성해야 한다.', () => {
    const winningNumbersArr = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winningNumbers = new WinningNumbers(winningNumbersArr, bonusNumber);

    expect(winningNumbers.getWinningNumbers()).toBe(winningNumbersArr);
    expect(winningNumbers.getBonusNumber()).toBe(bonusNumber);
  });
});
