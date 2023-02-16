const LottoTicket = require('../src/domain/LottoTicket');

describe('각 LottoTicket의 당첨번호 개수를 확인한다.', () => {
  const lottoTicket = new LottoTicket([1, 2, 3, 4, 5, 6]);

  test('당첨번호가 존재하지 않을 경우 0을 반환한다.', () => {
    const winningNumbers = [7, 8, 9, 10, 11, 12];

    expect(lottoTicket.countMatchedNumbers(winningNumbers)).toEqual(0);
  });

  test('당첨번호가 존재할 경우 맞춘 개수를 반환한다.', () => {
    const winningNumbers = [1, 2, 3, 7, 8, 9];

    expect(lottoTicket.countMatchedNumbers(winningNumbers)).toEqual(3);
  });
});
