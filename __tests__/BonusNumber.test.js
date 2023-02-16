const BonusNumber = require('../src/domain/model/BonusNumber');

/*eslint-disable*/
describe('BonusNumber 클래스 테스트', () => {
  test('입력된 당첨 번호를 갖는 인스턴스 생성 기능', () => {
    //given
    const input = '7';

    //when
    const bonusNumber = new BonusNumber(input);

    //then
    expect(bonusNumber.getNumber()).toBe(Number(input));
  });
});
