/* eslint-disable */

import validator from '../src/domain/validator';
describe('입력받은 로또 구매 비용에 대한 유효성 검사 테스트', () => {
  test('정수가 아니라면 에러가 발생한다', () => {
    const number = '문자열';

    expect(() => validator.throwErrorIfNotDecimal(number)).toThrow();
  });

  test('1000원 단위가 아닐 경우 에러가 발생한다.', () => {
    const number = '970';
    const divisor = 1000;

    expect(() => validator.throwErrorIfNotDivisiable(number, divisor)).toThrow();
  });

  test('정상적인 입력의 경우 에러가 발생하지 말아야 한다.', () => {
    const number = '1000';
    const divisor = 1000;

    expect(() => validator.throwErrorIfNotDivisiable(number, divisor)).not.toThrow();
  });

  test('정상적인 입력의 경우 에러가 발생하지 말아야 한다.', () => {
    const number = '43608000';
    const divisor = 1000;

    expect(() => validator.throwErrorIfNotDivisiable(number, divisor)).not.toThrow();
  });
});

describe('당첨 번호에 대한 유효성 검사', () => {
  test('로또 번호가 6개의 1 이상 45 이하의 정수가 아닐 경우 에러가 발생한다.', () => {
    const winningLotto = '1,45,102,63,9,8';

    expect(() => validator.throwErrorIfInvalidWinningLotto(winningLotto)).toThrow();
  });

  test('로또 번호가 콤마(,) 외의 다른 문자로 구분되는 경우 에러가 발생한다.', () => {
    const winningLotto = '1/45/38/29/17/6';

    expect(() => validator.throwErrorIfInvalidWinningLotto(winningLotto)).toThrow();
  });

  test('중복되는 로또 번호가 있다면 에러가 발생한다.', () => {
    const winningLotto = '1,1,2,3,4,5';

    expect(() => validator.throwErrorIfIncludesDuplicate(winningLotto)).toThrow();
  });

  test('정상적인 로또 번호라면 에러가 발생하지 말아야 한다.', () => {
    const winningLotto = '45,1,20,9,30,16';

    expect(() => validator.throwErrorIfIncludesDuplicate(winningLotto)).not.toThrow();
  });
});

describe('보너스 번호 유효성 테스트', () => {
  test('보너스 번호가 정수가 아닌 문자열일 경우 에러가 발생한다', () => {
    const bonusNumber = 'IAmNotNumber';

    expect(() => validator.throwErrorIfInvalidBonusNumber(bonusNumber)).toThrow();
  });

  test('보너스 번호가 정수가 아닐 경우 에러가 발생한다', () => {
    const bonusNumber = '27.123';

    expect(() => validator.throwErrorIfInvalidBonusNumber(bonusNumber)).toThrow();
  });

  test('보너스 번호가 1에서 45이하의 정수가 아니라면 에러가 발생한다', () => {
    const bonusNumber = '100';

    expect(() => validator.throwErrorIfInvalidBonusNumber(bonusNumber)).toThrow();
  });

  test('보너스 번호가 올바를 경우 에러가 발생하지 말아야 한다.', () => {
    const bonusNumber = '45';

    expect(() => validator.throwErrorIfInvalidBonusNumber(bonusNumber)).not.toThrow();
  });
});

describe('재시작 커맨드 테스트', () => {
  test('유저의 재시작 커맨드가 y와 n 중 어느 것도 아닐 경우 에러가 발생한다.', () => {
    const userCommand = '#';

    expect(() => validator.throwErrorIfInvalidUserCommand(userCommand)).toThrow();
  });

  test('유저의 재시작 커맨드가 올바를 경우 에러가 발생해서는 안 된다.', () => {
    const userCommand = 'y';

    expect(() => validator.throwErrorIfInvalidUserCommand(userCommand)).not.toThrow();
  });
});
