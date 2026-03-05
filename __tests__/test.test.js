import Lotto from "../src/Lotto";
import LottoGenerator from "../src/LottoGenerator";

describe("로또 발행 테스트", () => {
  test("구매한 로또의 개수를 올바르게 계산해야 한다.", () => {
    // given
    const money = 10_000;

    // when & then
    expect(LottoGenerator.calculateBuyLottoCount(money)).toEqual(10);
  });

  test("로또를 생성한다.", () => {
    // given
    const lotto = new Lotto([6, 5, 4, 3, 2, 1]);

    // when & then
    expect(lotto).toBeInstanceOf(Lotto);
  });

  test("0이 입력된 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [0, 1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow("[ERROR]");
  });

  test("음의 정수가 입력된 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [-1, 1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow("[ERROR]");
  });

  test("1~45 사이가 아닌 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [1, 2, 3, 4, 5, 100];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow("[ERROR]");
  });

  test("번호가 중복되는 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [1, 1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow("[ERROR]");
  });

  test("로또 번호가 6개가 아닌 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow("[ERROR]");
  });

  test("로또 생성 시 번호를 오름차순으로 올바르게 정렬해야 한다", () => {
    // given
    const unSortedNunmbers = [6, 5, 4, 3, 2, 1];

    // when
    const lotto = new Lotto(unSortedNunmbers);

    // then
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("구입 수량만큼 로또를 발행해야 한다", () => {
    // given
    const buyLottoCount = 10;

    // when
    const lottos = LottoGenerator.makeLottos(buyLottoCount);

    // then
    expect(lottos.length).toEqual(buyLottoCount);
  });
});
