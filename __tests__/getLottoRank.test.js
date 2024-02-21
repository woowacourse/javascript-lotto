import Lotto from "../src/domain/Lotto.js";
import LottoNumber from "../src/domain/LottoNumber.js";
import getLottoRank from "../src/domain/getLottoRank.js";

describe("로또 랭크 기능 테스트", () => {
  const winningLotto = new Lotto("1,2,3,4,5,6");
  const bonusLottoNumber = new LottoNumber(7);

  test("번호가 6개 일치할 경우 1등이다.", () => {
    const randomLottos = [new Lotto("1,2,3,4,5,6")];
    const expectRanks = [0, 0, 0, 0, 1];

    expect(
      getLottoRank({ winningLotto, bonusLottoNumber, randomLottos })
    ).toEqual(expectRanks);
  });
  test("번호가 5개 일치하고 보너스 숫자를 포함할 경우 2등이다.", () => {
    const randomLottos = [new Lotto("1,2,3,4,5,7")];
    const expectRanks = [0, 0, 0, 1, 0];

    expect(
      getLottoRank({ winningLotto, bonusLottoNumber, randomLottos })
    ).toEqual(expectRanks);
  });
});
