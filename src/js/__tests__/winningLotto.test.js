import WinningLotto from '../models/WinningLotto';

describe('올바른 당첨 번호를 입력한다.', () => {
  it('입력한 당첨 번호가 숫자이다.', () => {
    const winningLotto = new WinningLotto();
    const invalidInput = 'a';
    const validInput = 45;

    winningLotto.pushNumber(invalidInput);
    expect(winningLotto.numbers.size).toBe(0);
    winningLotto.pushNumber(validInput);
    expect(winningLotto.numbers.size).toBe(1);
  });

  it('입력한 당첨 번호는 1 ~ 45 사이이다.', () => {
    const winningLotto = new WinningLotto();
    const overedRangeNumber = 46;
    winningLotto.pushNumber(overedRangeNumber);

    expect(winningLotto.numbers.size).toBe(0);
  });

  it('입력한 당첨 번호는 중복되지 않는다.', () => {
    const winningLotto = new WinningLotto();
    const duplicatedNumber = 1;
    winningLotto.pushNumber(duplicatedNumber);
    winningLotto.pushNumber(duplicatedNumber);

    expect(winningLotto.numbers.size).toBe(1);
    expect(winningLotto.numbers).toContain(1);
  });
});
