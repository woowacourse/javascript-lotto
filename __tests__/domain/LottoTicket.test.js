import LottoTicket from '../../src/domain/LottoTicket';

describe('로또 티켓을 구성하는 랜덤 값을 뽑는 기능 테스트', () => {
  test('랜덤 값이 중복 없이 6개 뽑히는지 확인한다.', () => {
    const lottoTicket = new LottoTicket();
    const uniqueNumbers = new Set(lottoTicket.ticket);

    expect(uniqueNumbers.size).toBe(6);
  });

  test('1 ~ 45 범위의 숫자가 뽑히는 확인한다.', () => {
    const lottoTicket = new LottoTicket().ticket;

    expect(lottoTicket.every((lottoNumber) => lottoNumber >= 1 && lottoNumber <= 45)).toBeTruthy();
  });
});
