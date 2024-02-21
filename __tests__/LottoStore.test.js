import Lotto from "../src/domain/Lotto";
import LottoStore from "../src/domain/LottoStore";

describe("구매 가능한 로또 갯수를 반환한다.", () => {
  describe("로또 구입 금액 유효성검사 테스트", () => {
    test.each(["1000", true, {}, [], undefined, null])(
      "구입 금액이 Number 타입이 아니면 오류를 발생시킨다.",
      (purchaseAmount) => {
        const lottoStore = new LottoStore();

        expect(() => lottoStore.calculateLottoCount(purchaseAmount)).toThrow();
      },
    );

    test.each([950, 1500, 2001, 2024])(
      "구입 금액이 1000 단위가 아니면 오류를 발생시킨다.",
      (purchaseAmount) => {
        const lottoStore = new LottoStore();

        expect(() => lottoStore.calculateLottoCount(purchaseAmount)).toThrow();
      },
    );

    test.each([0, -1000, -5000, 101000])(
      "구입 금액이 1,000 ~ 100,000 사이가 아니면 오류를 발생시킨다.",
      (purchaseAmount) => {
        const lottoStore = new LottoStore();

        expect(() => lottoStore.calculateLottoCount(purchaseAmount)).toThrow();
      },
    );
  });

  test.each([
    [9000, 9],
    [3000, 3],
  ])(
    "구매 가능한 로또 갯수 반환 정상동작 테스트",
    (purchaseAmount, lottoCount) => {
      const lottoStore = new LottoStore();

      expect(lottoStore.calculateLottoCount(purchaseAmount)).toBe(lottoCount);
    },
  );
});

describe("입력받은 갯수만큼 랜덤값 배열을 생성한다.", () => {
  describe("입력받은 갯수 유효성검사 테스트", () => {
    test.each(["1", true, {}, [], undefined, null])(
      "입력받은 갯수가 Number 타입이 아니면 오류를 발생시킨다.",
      (lottoCount) => {
        const lottoStore = new LottoStore();
        expect(() => {
          lottoStore.generateRandomNumbers(lottoCount);
        }).toThrow();
      },
    );

    test.each([0.1, 10.9])(
      "입력받은 갯수가 정수가 아니면 오류를 발생시킨다.",
      (lottoCount) => {
        const lottoStore = new LottoStore();

        expect(() => {
          lottoStore.generateRandomNumbers(lottoCount);
        }).toThrow();
      },
    );

    test.each([-1, 0, 101])(
      "입력받은 갯수가 1 ~ 100 사이가 아니면 오류를 발생시킨다.",
      (lottoCount) => {
        const lottoStore = new LottoStore();

        expect(() => {
          lottoStore.generateRandomNumbers(lottoCount);
        }).toThrow();
      },
    );
  });
});

describe("입력받은 배열의 길이만큼 로또를 발행한다.", () => {
  describe("입력받은 배열 유효성검사 테스트", () => {
    test.each(["1,2,3,4,5,6", true, {}, undefined, null])(
      "입력받은 값이 배열이 아니면 오류를 발생시킨다.",
      (inputValue) => {
        const lottoStore = new LottoStore();

        expect(() => lottoStore.issueLottos(inputValue)).toThrow();
      },
    );

    test("배열의 길이가 0인 경우 오류를 발생시킨다.", () => {
      const inputValue = [];
      const lottoStore = new LottoStore();

      expect(() => lottoStore.issueLottos(inputValue)).toThrow();
    });

    test.each([
      new Array([1, 2, 3, 4, 5, 6]),
      new Array([true]),
      new Array(
        ["1, 2, 3"],
        new Array({ numbers: [1, 2, 3, 4, 5, 6] }),
        new Array("배열이에염"),
        new Array([undefined]),
        new Array([null]),
      ),
    ])(
      "입력받은 배열의 각 요소가 배열이 아니면 오류를 발생시킨다",
      (inputArray) => {
        const lottoStore = new LottoStore();

        expect(() => lottoStore.issueLottos(inputArray)).toThrow();
      },
    );
  });

  test("입력받은 배열의 길이만큼 로또 인스턴스를 생성한다.", () => {
    const sixNumbersArray = [
      [1, 5, 10, 15, 20, 25],
      [5, 10, 11, 14, 20, 40],
      [1, 10, 20, 30, 40, 45],
    ];
    const lottoStore = new LottoStore();

    const lottos = lottoStore.issueLottos(sixNumbersArray);

    lottos.forEach((lotto) => expect(lotto).toBeInstanceOf(Lotto));
  });
});
