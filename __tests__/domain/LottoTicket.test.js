import LottoTicket from '../../src/domain/LottoTicket';

describe('로또 번호 생성 테스트', () => {
  test('6개의 수로 이루어진 로또 번호를 생성한다.', () => {
    const lottoTickets = new LottoTicket().tickets;

    expect(lottoTickets.length).toBe(6);
  });

  test('1 ~ 45 범위의 숫자로 이루어진 로또 번호를 생성한다.', () => {
    const lottoTickets = new LottoTicket().tickets;

    expect(lottoTickets.every((lottoNumber) => lottoNumber >= 1 && lottoNumber <= 45)).toBeTruthy();
  });

  test('중복 없이 6개의 로또 번호를 생성한다.', () => {
    const lottoTickets = new LottoTicket().tickets;

    expect(new Set(lottoTickets).size).toBe(6);
  });
});
