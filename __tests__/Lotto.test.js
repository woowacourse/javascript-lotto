import Lotto from "../src/domain/Lotto";

describe("Lotto 객체 단위테스트", () => {
  test("로또 갯수만큼 로또 객체를 생성하는 테스트", () => {
    const lottoNumbers = [8, 21, 23, 41, 42, 43];
    const lotto = new Lotto(lottoNumbers);

    expect(lotto.lottoNumbers).toEqual([8, 21, 23, 41, 42, 43]);
  });

  test("로또 숫자를 오름차순 정렬하는 함수 테스트", () => {
    const lottoNumbers = [42, 41, 21, 43, 8, 23];
    const lotto = new Lotto(lottoNumbers);
    lotto.sortLottoNumbers();

    expect(lotto.lottoNumbers).toEqual([8, 21, 23, 41, 42, 43]);
  });

  test("당첨번호와 각 로또 객체 번호를 비교하는 함수 테스트", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    lotto.compareNumbers(winningNumbers);

    expect(lotto.score).toEqual(6);
  });

  test("각 로또의 점수를 올려주는 함수 테스트", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    lotto.addScore();
    expect(lotto.score).toEqual(1);
  });

  test("보너스 번호가 있는지 확인하는 함수 테스트", () => {
    const bonusNumber = 8;
    const lotto = new Lotto([8, 21, 23, 41, 42, 43]);
    lotto.checkBonusNumber(bonusNumber);

    expect(lotto.isContainBonusNumber).toBeTruthy();
  });
});
