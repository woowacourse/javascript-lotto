import Lotto from "../src/Lotto";


test("로또를 생성한다.", () => {
    // given
    const lotto = new Lotto([6,5,4,3,2,1]);

    // when & then
    expect(lotto).toBeInstanceOf(Lotto);
});