import Lotto from "../src/domain/Lotto";
import WinningLotto from "../src/domain/WinningLotto";
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

    lottoStore.issueLottos(sixNumbersArray);

    expect(lottoStore.lottos.length).toBe(3);
  });
});

test("당첨 로또를 생성한다.", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const lottoStore = new LottoStore();

  lottoStore.setWinningLotto(winningNumbers, bonusNumber);
  const winningLotto = lottoStore.winningLotto;

  expect(winningLotto).toBeInstanceOf(WinningLotto);
});

test.each([
  { lottoNumber: [10, 11, 12, 13, 14, 15], expectedResult: [0] },
  { lottoNumber: [7, 11, 12, 13, 14, 15], expectedResult: [0] },
  { lottoNumber: [1, 11, 12, 13, 14, 15], expectedResult: [0] },
  { lottoNumber: [1, 7, 11, 12, 13, 14], expectedResult: [0] },
  { lottoNumber: [1, 2, 11, 12, 13, 14], expectedResult: [0] },
  { lottoNumber: [1, 2, 7, 11, 12, 13], expectedResult: [0] },
  { lottoNumber: [1, 2, 3, 11, 12, 13], expectedResult: [5] },
  { lottoNumber: [1, 2, 3, 7, 11, 12], expectedResult: [5] },
  { lottoNumber: [1, 2, 3, 4, 11, 12], expectedResult: [4] },
  { lottoNumber: [1, 2, 3, 4, 7, 8], expectedResult: [4] },
  { lottoNumber: [1, 2, 3, 4, 5, 8], expectedResult: [3] },
  { lottoNumber: [1, 2, 3, 4, 5, 7], expectedResult: [2] },
  { lottoNumber: [1, 2, 3, 4, 5, 6], expectedResult: [1] },
])(
  "인자로 받은 일치 갯수와 보너스 일치 여부를 통해 순위를 확인한다.",
  ({ lottoNumber, expectedResult }) => {
    const lottoStore = new LottoStore();

    // Act
    lottoStore.setWinningLotto([1, 2, 3, 4, 5, 6], 7);
    lottoStore.issueLottos([lottoNumber]);

    console.log(lottoStore.checkRanking(), expectedResult);
    expect(lottoStore.checkRanking()).toEqual(expectedResult);
  },
);

test.each([
  { rankings: [1, 2, 3, 4, 5], totalPorfitRate: 40_631_100 },
  { rankings: [1, 3, 5], totalPorfitRate: 66_716_833.3 },
  { rankings: [2, 4], totalPorfitRate: 1_502_500 },
])(
  "입력받은 순위 배열에 해당하는 총 수익률을 계산한다.",
  ({ rankings, totalPorfitRate }) => {
    const lottoStore = new LottoStore();

    expect(lottoStore.getTotalProfitRate(rankings)).toBe(totalPorfitRate);
  },
);
