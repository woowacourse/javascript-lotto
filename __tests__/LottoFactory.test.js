import LottoFactory from "../src/domain/LottoFactory.js";

describe("로또 팩토리에 대한 테스트?? 이름 미정", () => {
  test("정해진 개수만큼 로또를 생성한다.", () => {
    // given
    const lottoCount = 3;

    // when
    const lottos = LottoFactory.issueLottos(lottoCount);

    // then
    expect(lottos.length).toBe(lottoCount);
  });
});
