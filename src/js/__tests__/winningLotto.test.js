import WinningLotto from '../models/WinningLotto';

describe('올바른 당첨 번호를 입력한다.', () => {
  it('당첨 번호는 숫자가 아니면 입력할 수 없다.', () => {
    const nonNumberContainedList = [1, 2, 3, 4, 5, 'e'];
    const validBonusNumber = 6;
    expect(() => new WinningLotto().generate(nonNumberContainedList, validBonusNumber)).toThrow(
      'WRONG_WINNING_LOTTO'
    );
  });

  it('당첨 번호는 비어있을 수 없다.', () => {
    const invalidLengthList = [1, 2, 3, 4, 5];
    const validBonusNumber = 6;
    expect(() => new WinningLotto().generate(invalidLengthList, validBonusNumber)).toThrow(
      'WRONG_WINNING_LOTTO'
    );
  });

  it('보너스 번호는 1 ~ 45 사이의 숫자만 입력할 수 있다.', () => {
    const zeroContainedList = [1, 2, 3, 4, 5, 0];
    const validBonusNumber = 6;
    const overedNumberContainedList = [1, 2, 3, 4, 5, 46];

    expect(() => new WinningLotto().generate(zeroContainedList, validBonusNumber)).toThrow(
      'WRONG_WINNING_LOTTO'
    );

    expect(() => new WinningLotto().generate(overedNumberContainedList, validBonusNumber)).toThrow(
      'WRONG_WINNING_LOTTO'
    );
  });

  it('보너스 번호는 숫자가 아니면 입력할 수 없다.', () => {
    const validNumberList = [1, 2, 3, 4, 5, 6];
    const invalidBonusInput = 'e';

    expect(() => new WinningLotto().generate(validNumberList, invalidBonusInput)).toThrow(
      'WRONG_WINNING_LOTTO'
    );
  });

  it('보너스 번호는 비어있을 수 없다.', () => {
    const validNumberList = [1, 2, 3, 4, 5, 6];

    expect(() => new WinningLotto().generate(validNumberList)).toThrow('WRONG_WINNING_LOTTO');
  });

  it('보너스 번호는 1 ~ 45 사이의 숫자만 입력할 수 있다.', () => {
    const validNumberList = [1, 2, 3, 4, 5, 6];
    const overedNumber = 46;
    const zero = 0;

    expect(() => new WinningLotto().generate(validNumberList, overedNumber)).toThrow(
      'WRONG_WINNING_LOTTO'
    );

    expect(() => new WinningLotto().generate(validNumberList, zero)).toThrow('WRONG_WINNING_LOTTO');
  });

  it('당첨 번호는 중복될 수 없고, 보너스 번호와도 중복될 수 없다.', () => {
    const duplicatedNumberList = [1, 2, 3, 4, 5, 5];
    const validNumber = 6;
    const validNumberList = [1, 2, 3, 4, 5, 6];
    const duplicatedBonusNumber = 5;

    expect(() => new WinningLotto().generate(duplicatedNumberList, validNumber)).toThrow(
      'WRONG_WINNING_LOTTO'
    );

    expect(() => new WinningLotto().generate(validNumberList, duplicatedBonusNumber)).toThrow(
      'WRONG_WINNING_LOTTO'
    );
  });

  it('당첨 번호는 숫자를 입력할 수 있다.', () => {
    const validNumberList = [1, 2, 3, 4, 5, 6];
    const validBonusNumber = 7;
    const winningLotto = new WinningLotto().generate(validNumberList, validBonusNumber);

    expect(winningLotto._lottoNumbers).toEqual([...validNumberList]);
    expect(winningLotto.bonusNumber).toBe(validBonusNumber);
  });
});
