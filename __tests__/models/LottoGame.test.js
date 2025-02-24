import Lotto from "../../src/models/Lotto.js";
import LottoGame from "../../src/models/LottoGame.js";

describe("models/LottoGame", () => {
  describe("generateLottos()", () => {
    test.each([
      [1000, 1],
      [5000, 5],
      [10000, 10],
      [15000, 15],
      [20000, 20],
    ])(
      "받은 금액(%d원)에 맞는 수량(%d개)의 로또를 발행해야 한다. (%#)",
      (price, expectedCount) => {
        const lottoGame = new LottoGame();

        const lottos = lottoGame.generateLottos(price);
        expect(lottos.length).toBe(expectedCount);
        expect(lottos.every((lotto) => lotto instanceof Lotto)).toBe(true);
      }
    );
  });

  describe("generateLottoNumbers()", () => {
    test("랜덤 생성된 로또 번호는 항상 6개여야 한다.", () => {
      const lottoGame = new LottoGame();

      const generatedLottoNumbers = lottoGame.generateLottoNumbers(1, 45, 6);

      expect(generatedLottoNumbers).toHaveLength(6);
    });

    test("생성된 숫자가 중복이 없어야 한다.", () => {
      const lottoGame = new LottoGame();

      const generatedLottoNumbers = lottoGame.generateLottoNumbers(1, 45, 6);
      const generateLottoNumbersSet = new Set(generatedLottoNumbers);
      expect(generateLottoNumbersSet.size).toBe(generatedLottoNumbers.length);
    });

    test("생성된 숫자가 오름차순으로 정렬되어야 한다.", () => {
      const lottoGame = new LottoGame();

      const generatedLottoNumbers = lottoGame.generateLottoNumbers(1, 45, 6);
      expect(generatedLottoNumbers).toEqual(
        [...generatedLottoNumbers].sort((a, b) => a - b)
      );
    });

    test.each([
      [new LottoGame().generateLottoNumbers(1, 45, 6)],
      [new LottoGame().generateLottoNumbers(1, 45, 6)],
      [new LottoGame().generateLottoNumbers(1, 45, 6)],
    ])(
      "랜덤 생성된 숫자가 1~45 범위를 벗어나지 않아야 한다. (%#)",
      (numbers) => {
        numbers.forEach((num) => {
          expect(num).toBeGreaterThanOrEqual(1);
          expect(num).toBeLessThanOrEqual(45);
        });
      }
    );
  });

  describe("playLotto()", () => {
    test("당첨된 로또들에 맞춰 결과를 반환한다.", () => {
      //given
      const myLotto = [new Lotto([1, 2, 3, 4, 5, 6])];
      const result = { winningNumbers: [1, 2, 3, 4, 5, 7], bonusNumber: 6 };
      const lottoGame = new LottoGame();

      //when
      const gameResults = lottoGame.playLotto(myLotto, result);

      //then
      expect(gameResults).toEqual([
        {
          RANK: 2,
          WINNING_CRITERIA: 5,
          BONUS_MATCHED: true,
          REWARD: 30_000_000,
        },
      ]);
    });

    test("매치된 숫자와 보너스 매치 여부에 따라 등수를 반환한다.", () => {
      const matchCount = 5;
      const isBonusMatched = false;

      const lottoGame = new LottoGame();

      expect(lottoGame.checkRank(matchCount, isBonusMatched)).toEqual({
        RANK: 3,
        REWARD: 1500000,
        WINNING_CRITERIA: 5,
      });
    });

    test("게임 결과에 따라 알맞은 총 상금의 합을 반환한다.", () => {
      const gameResults = [
        {
          RANK: 3,
          REWARD: 1_500_000,
          WINNING_CRITERIA: 5,
        },
        {
          RANK: 3,
          REWARD: 1_500_000,
          WINNING_CRITERIA: 5,
        },
      ];

      const lottoGame = new LottoGame();

      expect(lottoGame.calcTotalReward(gameResults)).toBe(3_000_000);
    });

    test("게임 결과에 따라 알맞은 랭킹 수를 반환한다.", () => {
      const gameResults = [
        {
          RANK: 3,
          REWARD: 1_500_000,
          WINNING_CRITERIA: 5,
        },
        {
          RANK: 3,
          REWARD: 1_500_000,
          WINNING_CRITERIA: 5,
        },
      ];

      const lottoGame = new LottoGame();

      expect(lottoGame.getRankCount(gameResults)).toEqual({
        FIRST: 0,
        SECOND: 0,
        THIRD: 2,
        FOURTH: 0,
        FIFTH: 0,
      });
    });
  });
});
