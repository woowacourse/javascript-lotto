const WinningNumbers = require('../src/domain/model/WinningNumbers');

describe('WinningNumbers 클래스 테스트', () => {
  test('입력된 당첨 번호를 갖는 인스턴스 생성 기능', () => {
    //given
    const input = '1,2,3,4,5,6';

    //when
    const winningNumbers = new WinningNumbers(input);

    //then
    expect(winningNumbers.getNumbers()).toEqual(input.split(',').map(Number));
  });
});
