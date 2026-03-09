import { ERROR_MESSAGE, LOTTO } from "../src/constants";
import LottoGenerator from "../src/LottoGenerator";
import Lotto from "../src/Model/Lotto";

describe("로또 발행 테스트", () => {
  test("[기능] 구매한 로또의 개수를 올바르게 계산해야 한다.", () => {
    // given
    const money = 10_000;

    // when & then
    expect(LottoGenerator.calculateBuyLottoCount(money)).toEqual(10);
  });

  test("[기능] 올바른 로또를 1개 생성한다.", () => {
    // given
    const lotto = new Lotto([6, 5, 4, 3, 2, 1]);

    // when & then
    expect(lotto).toBeInstanceOf(Lotto);
  });

  test("[예외] 0이 입력된 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [0, 1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow(ERROR_MESSAGE.PREFIX);
  });

  test("[예외] 음의 정수가 입력된 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [-1, 1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow(ERROR_MESSAGE.PREFIX);
  });

  test.each([
    [0, [0, 2, 3, 4, 5, 6]],
    [46, [1, 2, 3, 4, 5, 46]],
  ])(
    "[예외] 1~45 사이가 아닌 경계값(%s)이 포함된 경우 에러를 발생시킨다",
    (wrongTarget, wrongNumbers) => {
      // when & then
      expect(() => new Lotto(wrongNumbers)).toThrow(ERROR_MESSAGE.PREFIX);
    },
  );

  test("[예외] 번호가 중복되는 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [1, 1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow(ERROR_MESSAGE.PREFIX);
  });

  test("[예외] 로또 번호가 6개가 아닌 경우 에러를 발생시킨다", () => {
    // given
    const wrongNumbers = [1, 2, 3, 4, 5];
    // when & then
    expect(() => new Lotto(wrongNumbers)).toThrow(ERROR_MESSAGE.PREFIX);
  });

  test("[기능] 로또 생성 시 번호를 오름차순으로 올바르게 정렬해야 한다", () => {
    // given
    const unSortedNunmbers = [6, 5, 4, 3, 2, 1];

    // when
    const lotto = new Lotto(unSortedNunmbers);

    // then
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("[기능] 자신이 가지고 있는 로또 번호인지 확인할 수 있어야 한다.", () => {
    // given
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    // when & then
    expect(lotto.hasNumber(5)).toEqual(true);
    expect(lotto.hasNumber(7)).toEqual(false);
  });

  test("[기능] 구입 수량만큼 로또를 발행해야 한다", () => {
    // given
    const buyLottoCount = 10;

    // when
    const lottos = LottoGenerator.makeLottos(buyLottoCount);

    // then
    expect(lottos.length).toEqual(buyLottoCount);
  });

  test("[기능] 1~45 사이의 중복되지 않는 무작위 숫자 6개를 반환해야 한다", () => {
    // when
    const randomNumbers = LottoGenerator.getRandomLottoNumbers();

    // then
    expect(randomNumbers.length).toEqual(LOTTO.COUNT);
    expect(randomNumbers.length === new Set(randomNumbers).size).toEqual(true);
  });
});
