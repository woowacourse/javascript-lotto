const BonusNumber = require('../src/domain/model/BonusNumber');

describe('BonusNumber 클래스 테스트', () => {
  test('주어진 당첨 번호로 보너스 번호 인스턴스가 생성되는 기능 테스트', () => {
    //given
    const input = '7';
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    //when
    const bonusNumber = new BonusNumber(winningNumbers, input);

    //then
    expect(bonusNumber.getNumber()).toBe(Number(input));
  });
});
