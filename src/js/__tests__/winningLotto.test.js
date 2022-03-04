import WinningLotto from '../models/WinningLotto';

describe('올바른 당첨 번호를 입력한다.', () => {
  it('당첨 번호는 숫자가 아니면 입력할 수 없다.', () => {
    const winningLotto = new WinningLotto().generate([1, 2, 3, 4, 5, 'e'], 6);

    expect(winningLotto).toBe('WRONG_WINNING_LOTTO');
  });

  it('당첨 번호는 비어있을 수 없다.', () => {
    const winningLotto = new WinningLotto().generate([1, 2, 3, 4, 5], 6);

    expect(winningLotto).toBe('WRONG_WINNING_LOTTO');
  });

  it('보너스 번호는 1 ~ 45 사이의 숫자만 입력할 수 있다.', () => {
    const winningLotto1 = new WinningLotto().generate([1, 2, 3, 4, 5, 0], 7);

    expect(winningLotto1).toBe('WRONG_WINNING_LOTTO');

    const winningLotto2 = new WinningLotto().generate([1, 2, 3, 4, 5, 46], 7);

    expect(winningLotto2).toBe('WRONG_WINNING_LOTTO');
  });

  it('보너스 번호는 숫자가 아니면 입력할 수 없다.', () => {
    const winningLotto = new WinningLotto().generate([1, 2, 3, 4, 5, 6], 'e');

    expect(winningLotto).toBe('WRONG_WINNING_LOTTO');
  });

  it('보너스 번호는 비어있을 수 없다.', () => {
    const winningLotto = new WinningLotto().generate([1, 2, 3, 4, 5, 6]);

    expect(winningLotto).toBe('WRONG_WINNING_LOTTO');
  });

  it('보너스 번호는 1 ~ 45 사이의 숫자만 입력할 수 있다.', () => {
    const winningLotto1 = new WinningLotto().generate([1, 2, 3, 4, 5, 6], 46);

    expect(winningLotto1).toBe('WRONG_WINNING_LOTTO');

    const winningLotto2 = new WinningLotto().generate([1, 2, 3, 4, 5, 6], 0);

    expect(winningLotto2).toBe('WRONG_WINNING_LOTTO');
  });

  it('당첨 번호는 중복될 수 없고, 보너스 번호와도 중복될 수 없다.', () => {
    const winningLotto1 = new WinningLotto().generate([1, 2, 3, 4, 5, 5], 6);

    expect(winningLotto1).toBe('WRONG_WINNING_LOTTO');

    const winningLotto2 = new WinningLotto().generate([1, 2, 3, 4, 5, 6], 6);

    expect(winningLotto2).toBe('WRONG_WINNING_LOTTO');
  });

  it('당첨 번호는 숫자를 입력할 수 있다.', () => {
    const winningLotto = new WinningLotto().generate([1, 2, 3, 4, 5, 6], 7);

    expect(winningLotto.winningNumbers).toContain(1, 2, 3, 4, 5, 6);
  });
});
