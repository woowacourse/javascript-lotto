/* eslint-disable */

import Validator from '../src/js/domain/Validator.js';
import { GAME_VALUE, PROJECT_MODE, ERROR } from '../src/js/constants/index.js';

describe('구매 금액 검증 테스트 - 정상 데이터', () => {
  test.each([
    [PROJECT_MODE.CONSOLE, '1000'],
    [PROJECT_MODE.CONSOLE, '80000'],
    [PROJECT_MODE.CONSOLE, '1234000'],
    [PROJECT_MODE.WEB, '901286000'],
    [PROJECT_MODE.WEB, '10000'],
  ])(
    `%s 모드에서, 입력 금액이 【%s】으로 정상적인 데이터라면 오류가 발생하지 않아야 한다.`,
    (mode, budget) => {
      const validator = new Validator(mode);

      expect(() => validator.throwErrorIfInvalidBudget(budget)).not.toThrow();
    }
  );
});
describe('구매 금액 검증 테스트 - 배수 예외', () => {
  test.each([
    [PROJECT_MODE.CONSOLE, '2500'],
    [PROJECT_MODE.CONSOLE, '1'],
    [PROJECT_MODE.WEB, '100'],
    [PROJECT_MODE.WEB, '99999999'],
    [PROJECT_MODE.WEB, '680'],
  ])(
    `%s 모드에서, 입력 금액이 【%s】으로 ${GAME_VALUE.LOTTO_PRICE}의 배수가 아니라면 해당하는 오류를 발생시켜야 한다.`,
    (mode, budget) => {
      const validator = new Validator(mode);
      const expectedError = ERROR.BUDGET_NOT_DIVISIBLE[mode](GAME_VALUE.LOTTO_PRICE);

      expect(() => validator.throwErrorIfInvalidBudget(budget)).toThrow(expectedError);
    }
  );
});

describe('구매 금액 검증 테스트 - 자연수 예외', () => {
  test.each([
    [PROJECT_MODE.CONSOLE, '-3000'],
    [PROJECT_MODE.CONSOLE, '10e5'],
    [PROJECT_MODE.WEB, 'string'],
    [PROJECT_MODE.WEB, '100%'],
    [PROJECT_MODE.WEB, '0.5'],
    [PROJECT_MODE.WEB, '1.0'],
  ])(
    `%s 모드에서, 입력 금액이 【%s】으로 자연수가 아니라면 오류가 발생하여야 한다.`,
    (mode, budget) => {
      const validator = new Validator(mode);
      const expectedError = ERROR.NOT_DECIMAL[mode];

      expect(() => validator.throwErrorIfInvalidBudget(budget)).toThrow(expectedError);
    }
  );
});

describe('로또 번호 테스트 - 정상 데이터', () => {
  test.each([
    [PROJECT_MODE.CONSOLE, '1,2,3,4,5,6'],
    [PROJECT_MODE.CONSOLE, '45,44,43,42,41,40'],
    [PROJECT_MODE.WEB, '3,8,2,14,33,40'],
    [PROJECT_MODE.WEB, '43,10,23,39,16,28'],
    [PROJECT_MODE.WEB, '6,1,29,30,41,23'],
  ])(
    `%s 모드에서, 로또가 【%s】으로 정상적인 데이터라면 오류가 발생하지 않아야 한다.`,
    (mode, winningLotto) => {
      const validator = new Validator(mode);

      expect(() => validator.throwErrorIfInvalidWinningLotto(winningLotto)).not.toThrow();
    }
  );
});

describe('로또 번호 테스트 - 로또 개수 예외', () => {
  // 로또 개수 예외 테스트는 형식 테스트보다 먼저 실행됨에 유의한다.
  test.each([
    [PROJECT_MODE.CONSOLE, ',,2,3,4,5'],
    [PROJECT_MODE.CONSOLE, '10,45,33,,26,17'],
    [PROJECT_MODE.WEB, '18'],
    [PROJECT_MODE.WEB, '2BxZ28X10mJ7kEXo8'],
    [PROJECT_MODE.WEB, ''],
  ])(
    `%s 모드에서, 로또가 【%s】으로 ${GAME_VALUE.LOTTO_SIZE} 개보다 적다면 오류가 발생해야 한다.`,
    (mode, winningLotto) => {
      const validator = new Validator(mode);
      const expectedMessage = ERROR.INSUFFICIENT_LOTTO_NUMBER_COUNT[mode];

      expect(() => validator.throwErrorIfInvalidWinningLotto(winningLotto)).toThrow(
        expectedMessage
      );
    }
  );
});

describe('로또 번호 테스트 - 로또 형식 예외', () => {
  test.each([
    [PROJECT_MODE.CONSOLE, '1/2/3/4/5/6'],
    [PROJECT_MODE.CONSOLE, '0,1,2,3,4,5'],
    [PROJECT_MODE.CONSOLE, '41,42,43,44,45,46'],
    [PROJECT_MODE.WEB, '1028,2938,5567,3840,1002,9384'],
    [PROJECT_MODE.WEB, '-4,1,-7,10,23,45'],
    [PROJECT_MODE.WEB, '1eSa2Vx3zM4PxC5Vj6OJ'],
  ])(
    `%s 모드에서, 로또가 【%s】으로 로또 개수는 맞는데 형식이 틀린 경우, 오류가 발생해야 한다.`,
    (mode, winningLotto) => {
      const validator = new Validator(mode);
      const expectedMessage = ERROR.INVALID_LOTTO_FORMAT[mode];

      expect(() => validator.throwErrorIfInvalidWinningLotto(winningLotto)).toThrow(
        expectedMessage
      );
    }
  );
});

describe('로또 번호 테스트 - 중복 예외', () => {
  test.each([
    [PROJECT_MODE.CONSOLE, '1,2,3,4,5,5'],
    [PROJECT_MODE.CONSOLE, '2,45,3,2,19,18'],
    [PROJECT_MODE.WEB, '42,42,42,42,42,42'],
    [PROJECT_MODE.WEB, '9,7,2,1,8,9'],
  ])(
    `%s 모드에서, 로또가 【%s】으로 로또 번호가 서로 중복될 경우, 오류가 발생해야 한다.`,
    (mode, winningLotto) => {
      const validator = new Validator(mode);
      const expectedMessage = ERROR.LOTTO_DUPLICATES[mode];

      expect(() => validator.throwErrorIfInvalidWinningLotto(winningLotto)).toThrow(
        expectedMessage
      );
    }
  );
});

describe('보너스 번호 테스트 - 정상 데이터', () => {
  test.each([
    [PROJECT_MODE.CONSOLE, '1,2,3,4,5,6', '7'],
    [PROJECT_MODE.CONSOLE, '7,10,45,38,22,30', '1'],
    [PROJECT_MODE.WEB, '6,9,11,34,20,15', '45'],
    [PROJECT_MODE.WEB, '10,9,7,33,20,12', '20'],
  ])(
    `%s 모드에서, 로또가 【%s】이고, 보너스 번호가【%s】인 경우, 오류가 발생하지 말아야 한다.`,
    (mode, winningLotto, bonusNumber) => {
      const validator = new Validator(mode);

      expect(() =>
        validator.throwErrorIfInvalidBonusNumber(winningLotto, bonusNumber)
      ).not.toThrow();
    }
  );
});

describe('보너스 번호 테스트 - 잘못된 형식 예외', () => {
  test.each([
    [PROJECT_MODE.CONSOLE, '1,2,3,4,5,6', 'asdf'],
    [PROJECT_MODE.CONSOLE, '7,10,45,38,22,30', 0],
    [PROJECT_MODE.CONSOLE, '7,10,45,38,22,30', 'Z'],
    [PROJECT_MODE.CONSOLE, '7,10,45,38,22,30', 1.7],
    [PROJECT_MODE.WEB, '6,9,11,34,20,15', 46],
    [PROJECT_MODE.WEB, '10,9,7,33,20,12', '-'],
    [PROJECT_MODE.WEB, '10,9,7,33,20,12', '1e5'],
    [PROJECT_MODE.WEB, '10,9,7,33,20,12', '1,2'],
  ])(
    `%s 모드에서, 로또가 【%s】이고, 보너스 번호가【%s】인 경우, 오류가 발생해야 한다.`,
    (mode, winningLotto, bonusNumber) => {
      const validator = new Validator(mode);
      const expectedMessage = ERROR.INVALID_BONUS_NUMBER_FORMAT[mode];

      expect(() => validator.throwErrorIfInvalidBonusNumber(winningLotto, bonusNumber)).toThrow(
        expectedMessage
      );
    }
  );
});

describe('보너스 번호 테스트 - 로또 번호와 중복 예외', () => {
  test.each([
    [PROJECT_MODE.CONSOLE, '1,2,3,43,44,45', 1],
    [PROJECT_MODE.CONSOLE, '1,2,3,43,44,45', 2],
    [PROJECT_MODE.CONSOLE, '1,2,3,43,44,45', 3],
    [PROJECT_MODE.CONSOLE, '1,2,3,43,44,45', 43],
    [PROJECT_MODE.CONSOLE, '1,2,3,43,44,45', 44],
    [PROJECT_MODE.CONSOLE, '1,2,3,43,44,45', 45],
    [PROJECT_MODE.WEB, '6,9,11,34,20,15', 11],
    [PROJECT_MODE.WEB, '10,9,7,33,20,12', 12],
    [PROJECT_MODE.WEB, '10,9,7,33,20,12', 33],
    [PROJECT_MODE.WEB, '10,9,7,33,20,12', 9],
  ])(
    `%s 모드에서, 로또가 【%s】이고, 보너스 번호가【%s】인 경우, 오류가 발생해야 한다.`,
    (mode, winningLotto, bonusNumber) => {
      const validator = new Validator(mode);
      const expectedMessage = ERROR.BONUS_NUMBER_DUPLICATES[mode];

      expect(() => validator.throwErrorIfInvalidBonusNumber(winningLotto, bonusNumber)).toThrow(
        expectedMessage
      );
    }
  );
});
