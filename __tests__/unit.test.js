const LottoGame = require("../src/domain/LottoGame");
const Random = require("../src/utils/Random");

describe("구매 금액 입력 시 복권 생성", () => {
  test("구매 금액 입력 시 복권 생성되는 케이스", () => {
    const lottoGame = new LottoGame(8000);
    const lottoSize = lottoGame.lotteries.length;
    expect(lottoSize).toEqual(8);
  });

  test("구매 금액 입력 시 복권 생성되는 케이스", () => {
    const lottoGame = new LottoGame(1000);
    const lottoSize = lottoGame.lotteries.length;
    expect(lottoSize).toEqual(1);
  });
});

describe("로또에 넣을 랜덤숫자 생성되는지 확인", () => {
  const randomNumbers = Random.generateRandomNumbers();
  test("로또에 넣을 랜덤숫자가 여섯 개면 통과", () => {
    const randomNumberLength = randomNumbers.length;
    expect(randomNumberLength).toEqual(6);
  });

  test("로또에 넣을 랜덤숫자 내 중복이 없으면 통과", () => {
    const randomNumberSet = new Set(randomNumbers);
    expect(randomNumberSet.size).toEqual(6);
  });
});
