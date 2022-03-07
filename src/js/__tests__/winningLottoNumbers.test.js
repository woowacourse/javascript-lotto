import { isDuplicateNumbers, isOutOfRange } from '../utils';

describe('당첨 번호, 보너스 번호가 중복된 숫자가 있는지 확인한다. (실패/성공 케이스)', () => {
  test('당첨 번호, 보너스 번호 중에 중복된 숫자가 있을 경우. 입력: [1, 2, 2, 3, 4, 5], 6 / 실패 케이스', () => {
    const winningNumberList = [1, 2, 2, 3, 4, 5];
    const bounsNumber = 7;

    expect(isDuplicateNumbers(winningNumberList, bounsNumber)).toBe(true);
  });

  test('당첨 번호, 보너스 번호 중에 중복된 숫자가 없을 경우. 입력: [1, 2, 3, 4, 5, 6], 6 / 성공 케이스', () => {
    const winningNumberList = [1, 2, 3, 4, 5, 6];
    const bounsNumber = 7;

    expect(isDuplicateNumbers(winningNumberList, bounsNumber)).toBe(false);
  });
});

describe('당첨 번호, 보너스 번호 중에 1 ~ 45 사이의 숫자가 아닌 값이 있는지 확인한다. (실패/성공 케이스)', () => {
  test('당첨 번호, 보너스 번호 중에 1 ~ 45 사이의 숫자가 아닌 경우', () => {
    const winningNumberList = [46, 2, 3, 4, 5, 6];
    const bounsNumber = 7;

    expect(isOutOfRange(winningNumberList, bounsNumber)).toBe(true);
  });

  test('당첨 번호, 보너스 번호 모두 1 ~ 45 사이의 숫자인 경우', () => {
    const winningNumberList = [1, 2, 3, 4, 5, 6];
    const bounsNumber = 7;

    expect(isOutOfRange(winningNumberList, bounsNumber)).toBe(false);
  });
});
