const WinningNumbers = require('../src/domain/model/WinningNumbers');

describe('WinningNumbers 클래스 테스트', () => {
  test('입력된 당첨 번호 값을 필드로 가지는 WinningNumbers 인스턴스를 생성해야 한다.', () => {
    const input = '1,2,3,4,5,6';

    const winningNumbers = new WinningNumbers(input);

    expect(winningNumbers.getNumbers()).toEqual(input.split(',').map(Number));
  });
});
