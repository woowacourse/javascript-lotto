const BonusNumber = require('../src/domain/model/BonusNumber');

describe('BonusNumber 클래스 테스트', () => {
  test('입력된 당첨 번호를 갖는 인스턴스 생성 기능', () => {
    //given
    const input = '7';
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    //when
    const bonusNumber = new BonusNumber(winningNumbers, input);

    //then
    expect(bonusNumber.getNumber()).toBe(Number(input));
  });
});
