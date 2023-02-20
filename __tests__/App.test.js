import Lottos from "../src/Lottos";
import Lotto from "../src/Lotto";
describe("로또 생성 테스트", () => {
  test("구입한 개수만큼 로또를 생성하는 기능 테스트", () => {
    const lottoAmount = 3;

    const lotto1 = new Lotto([8, 21, 23, 41, 42, 43]);
    const lotto2 = new Lotto([3, 5, 11, 16, 32, 38]);
    const lotto3 = new Lotto([7, 11, 16, 35, 36, 44]);

    const lottos = new Lottos([lotto1, lotto2, lotto3])

    expect(lottos.getLottos().length).toEqual(
      lottoAmount
    );
  });
});
