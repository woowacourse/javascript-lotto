import {
  hasEmptyString,
  hasOutRangeNumber,
  isDiffArrayLength,
  hasDuplicateItem,
} from '../utils/validator';

import { ERROR_MESSAGE } from '../constants/string';
import { checkValidWinningNumberList } from '../utils/Lotto/validator';

describe('로또 당첨 번호 유효성 테스트', () => {
  it('당첨 번호는 빈 칸이 있으면 안된다.', () => {
    const userInput = ['1', '2', '3', '', '5', '6', '7'];
    expect(hasEmptyString(userInput)).toBe(true);
  });

  it('당첨 번호는 1에서 45 사이의 숫자만 입력하여야 한다', () => {
    const userInput = ['1', '2', '3', '77', '5', '6', '7'];
    expect(hasOutRangeNumber(userInput, 1, 45)).toBe(true);
  });

  it('당첨 번호는 6자리 + 보너스 번호 1자리로, 총 7자리여야 한다.', () => {
    const userInput = ['1', '2', '3', '4', '5', '6'];
    expect(isDiffArrayLength(userInput, 7)).toBe(true);
  });

  it('당첨 번호는 중복된 숫자들을 가질 수 없다.', () => {
    const userInput = ['1', '1', '3', '4'];
    expect(hasDuplicateItem(userInput)).toBe(true);
  });
});

describe('로또 당첨 번호 오류 메시지 테스트', () => {
  it('당첨 번호에 빈 칸이 있을 시 해당 오류 메시지가 반환되어야 한다.', () => {
    const userInput = ['1', '2', '3', '', '5', '6', '7'];
    expect(() => {
      checkValidWinningNumberList(userInput);
    }).toThrow(ERROR_MESSAGE.WINNING_NUMBER_EMPTY_INPUT);
  });

  it('당첨 번호에 1에서 45 사이의 숫자가 있을 시 오류 메시지가 반환되어야 한다.', () => {
    const userInput = ['1', '2', '3', '77', '5', '6', '7'];
    expect(() => {
      checkValidWinningNumberList(userInput);
    }).toThrow(ERROR_MESSAGE.WINNING_NUMBER_NUMBER_RANGE);
  });

  it('당첨 번호에 6자리 + 보너스 번호 1자리로, 총 7자리가 아닐 시 오류 메시지가 반환되어야 한다.', () => {
    const userInput = ['1', '2', '3', '4', '5', '6'];
    expect(() => {
      checkValidWinningNumberList(userInput);
    }).toThrow(ERROR_MESSAGE.WINNING_NUMBER_DIFF_LENGTH);
  });

  it('당첨 번호에 중복된 숫자들이 있을 시 오류 메시지가 반환되어야 한다.', () => {
    const userInput = [1, 1, 3, 4, 5, 6, 7];
    expect(() => {
      checkValidWinningNumberList(userInput);
    }).toThrow(ERROR_MESSAGE.WINNING_NUMBER_DUPLICATE_NUMBER);
  });
});
