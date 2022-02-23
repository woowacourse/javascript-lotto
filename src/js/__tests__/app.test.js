import LottoMachine from '../LottoMachine';
import ValidationError from '../ValidationError';

describe("로또 게임 기능 단위 테스트", () => {
  it("1000원 미만의 금액을 입력했을 때 charge에 저장하지 못한다.", () => {
    const LackCharge = 500;
    const lottoMachine = new LottoMachine();
    expect(() =>
      lottoMachine.validateCharge(LackCharge)
    ).toThrow(ValidationError);
  });
});
