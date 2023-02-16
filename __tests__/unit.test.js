const LottoGame = require("../src/domain/LottoGame");
const Lotto = require("../src/domain/Lotto");
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

describe("복권이 당첨번호, 보너스번호와 일치하는지 테스트", () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  test("복권과 당첨번호(유저입력)이 일치하는 개수가 3개인 경우 9 반환", () => {
    expect(lotto.matchNumbers([1, 2, 3, 7, 8, 9])).toEqual(9);
  });

  test("복권과 당첨번호(유저입력)이 일치하는 개수가 없는 경우 12 반환", () => {
    expect(lotto.matchNumbers([7, 8, 9, 10, 11, 12])).toEqual(12);
  });

  test("복권과 당첨번호(유저입력)이 일치하는 개수가 6개인 경우 6 반환", () => {
    expect(lotto.matchNumbers([1, 2, 3, 4, 5, 6])).toEqual(6);
  });

  test("보너스번호가 복권에 있으면 true", () => {
    console.log(lotto.matchBonus(1));
    expect(lotto.matchBonus(1)).toBeTruthy();
  });

  test("보너스번호가 복권에 없으면 false", () => {
    expect(lotto.matchBonus(7)).toBeFalsy();
  });
});
