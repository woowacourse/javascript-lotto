import LottoNumber from "../src/domain/LottoNumber.js";
import { generateWinningLotto } from "../src/domain/lottoGenerator.js";

describe("정답 로또 테스트", () => {
  test("보너스 번호가 중복이면 있으면 에러를 반환한다.", () => {
    const winningLotto = generateWinningLotto("1,2,3,4,5,6");
    const overlappedBonusNumber = 1;

    expect(() => winningLotto.setBonusNumber(overlappedBonusNumber)).toThrow();
  });

  test("보너스 번호를 세팅한다.", () => {
    const winningLotto = generateWinningLotto("1,2,3,4,5,6");
    const uniqueBonusNumber = 7;
    const bonusNumber = new LottoNumber(uniqueBonusNumber);

    winningLotto.setBonusNumber(bonusNumber);

    expect(winningLotto.getBonusNumber()).toBe(uniqueBonusNumber);
  });
});
