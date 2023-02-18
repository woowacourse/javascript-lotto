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
});

describe('당첨 번호에 대한 유효성 검사', () => {
  test('로또 번호가 ,로 구분되는 6개의 1 이상 45 이하의 정수가 아닐 경우 에러가 발생한다.', () => {
    const winningLotto = '1,45,102,63,9,8';

    expect(() => validator.throwErrorIfInvalidWinningLotto(winningLotto)).toThrow();
  });

  test('중복되는 로또 번호가 있다면 에러가 발생한다.', () => {
    const winningLotto = '1,1,2,3,4,5';

    expect(() => validator.throwErrorIfHaveDuplicates(winningLotto)).toThrow();
  });
});

test('보너스 번호가 1에서 45이하의 정수가 아니라면 에러가 발생한다', () => {
  const bonusNumber = '100';

  expect(() => validator.throwErrorIfInvalidBonusNumber(bonusNumber)).toThrow();
});

test('유저의 재시작 커맨드가 y와 n 중 어느 것도 아닐 경우 에러가 발생한다.', () => {
  const userCommand = '#';

  expect(() => validator.throwErrorIfInvalidUserCommand(userCommand)).toThrow();
});
