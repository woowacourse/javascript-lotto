import { lottoTicket } from '../model/lottoTicket';

describe('로또 구입 테스트', () => {
  test('구입한 로또의 숫자는 중복되지 않는 6개의 숫자이다', () => {
    const purchasedLottoLength = [...new Set(lottoTicket.generateLottoNumbers())].length;
    expect(purchasedLottoLength === 6).toBe(true);
  });

  test('입력된 금액을 1000으로 나눈 몫의 수만큼 로또를 발행한다.', () => {
    lottoTicket.store = [];
    lottoTicket.issueLottoTickets(10000);
    expect(lottoTicket.store.length).toBe(10);

    lottoTicket.store = [];
    lottoTicket.issueLottoTickets(1000);
    expect(lottoTicket.store.length).toBe(1);
  });

  test('구입한 로또의 목록을 가져온다', () => {
    lottoTicket.store = [];
    lottoTicket.issueLottoTickets(10000);
    expect(lottoTicket.getLottoTickets().length).toBe(10);

    lottoTicket.store = [];
    lottoTicket.issueLottoTickets(5000);
    expect(lottoTicket.getLottoTickets().length).toBe(5);

    lottoTicket.store = [];
    lottoTicket.issueLottoTickets(1000);
    expect(lottoTicket.getLottoTickets().length).toBe(1);
  });

  test('구입한 로또 목록을 초기화한다', () => {
    lottoTicket.store = [];
    lottoTicket.issueLottoTickets(10000);
    lottoTicket.initializeLottoTickets();
    expect(lottoTicket.store.length).toBe(0);
  });
});
