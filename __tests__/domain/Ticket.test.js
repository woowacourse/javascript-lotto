import Ticket from "../../src/domain/Ticket";

test("정해진 개수만큼 로또를 생성한다.", () => {
  // given
  const lottoCount = 3;

  // when
  const lottos = Ticket.createLottos(lottoCount);

  // then
  expect(lottos.length).toBe(lottoCount);
});
