import WinningNumbers from '../models/WinningNumbers';

describe('올바른 당첨 번호를 입력한다.', () => {
  it('입력한 당첨 번호가 숫자이다.', () => {
    const winningNumbers = new WinningNumbers();
    const invalidInput = 'a';
    const validInput = 45;

    winningNumbers.pushNumber(invalidInput);
    expect(winningNumbers.numbers.size).toBe(0);
    winningNumbers.pushNumber(validInput);
    expect(winningNumbers.numbers.size).toBe(1);
  });

  it('입력한 당첨 번호는 1 ~ 45 사이이다.', () => {
    const winningNumbers = new WinningNumbers();
    const overedRangeNumber = 46;
    winningNumbers.pushNumber(overedRangeNumber);

    expect(winningNumbers.numbers.size).toBe(0);
  });

  it('입력한 당첨 번호는 중복되지 않는다.', () => {
    const winningNumbers = new WinningNumbers();
    const duplicatedNumber = 1;
    winningNumbers.pushNumber(duplicatedNumber);
    winningNumbers.pushNumber(duplicatedNumber);

    expect(winningNumbers.numbers.size).toBe(1);
    expect(winningNumbers.numbers).toContain(1);
  });
});
