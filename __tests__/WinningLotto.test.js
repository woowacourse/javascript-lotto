/* eslint-disable no-undef */
const WinningLotto = require('../src/domain/model/WinningLotto');

describe('WinningLotto 클래스 테스트', () => {
  test('당첨번호와 보너스 번호가 중복되면 에러를 발생시킨다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 6;

    expect(() => {
      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    }).toThrow();
  });
});
