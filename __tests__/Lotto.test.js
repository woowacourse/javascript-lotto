import Lotto from "../src/domain/Lotto";

describe("Lotto 객체 단위테스트", () => {

  test("로또 갯수만큼 로또 객체를 생성 & 오름차순 정렬하는 함수 테스트", () => {
    const lottoNumbers = [42, 41, 21, 43, 8, 23];
    const lotto = new Lotto(lottoNumbers);

    expect(lotto.lottoNumbers).toEqual([8, 21, 23, 41, 42, 43]);
  });

  test("각 로또의 점수를 올려주는 함수 테스트", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    lotto.addScore();
    expect(lotto.score).toEqual(1);
  });
});
