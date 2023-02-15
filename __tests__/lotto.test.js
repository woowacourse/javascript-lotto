import { makeLottoTicket, makeLottoTickets } from "../src/step1-index";

test("1 ~ 45 사이의 난수를 중복되지 않게 6개 생성한다.", () => {
  const lottoTicket = makeLottoTicket();

  expect(new Set(lottoTicket).size).toBe(6);
});

test("로또 구입 금액 / 1000 만큼 로또를 발행한다.", () => {
  const numberOfTickets = 5;

  const lottoTickets = makeLottoTickets(numberOfTickets);

  expect(lottoTickets.length).toBe(numberOfTickets);
});
