import LottoTicket from '../../src/domain/LottoTicket';

describe('로또 티켓 생성 테스트', () => {
  const lottoTicket = new LottoTicket().publishTicket();
  test('로또 티켓은 중복 없이 6개이다.', () => {
    const uniqueNumbers = new Set(lottoTicket);

    expect(uniqueNumbers.size).toBe(6);
  });

  test('로또 티켓의 각 번호는 1 ~ 45 범위의 숫자이다.', () => {
    expect(lottoTicket.every((lottoNumber) => lottoNumber >= 1 && lottoNumber <= 45)).toBeTruthy();
  });

  test('로또 티켓은 오름차순으로 정렬되어야 한다.', () => {
    const sortedLottoTicket = lottoTicket.sort(
      (prevLottoNumber, nextLottoNumber) => prevLottoNumber - nextLottoNumber,
    );

    expect(lottoTicket).toEqual(sortedLottoTicket);
  });
});
