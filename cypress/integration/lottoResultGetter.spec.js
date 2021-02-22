import LottoTicket from '../../src/js/model/LottoTicket.js';
import ResultModal from '../../src/js/components/ResultModal.js';
import { BOUNS_COUNT } from '../../src/js/constants.js';

describe('당첨통계 계산 메서드 검사', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  const winningNumber = {
    winningNumbers: [1, 2, 3, 4, 5, 6],
    bonusNumber: 7,
  };

  it('구매한 로또의 당첨번호 일치 개수를 반환한다.', () => {
    const lottoTicket1 = new LottoTicket([1, 2, 3, 4, 5, 6]);
    const lottoTicket2 = new LottoTicket([1, 2, 3, 4, 5, 7]);
    const lottoTicket3 = new LottoTicket([1, 2, 3, 4, 5, 8]);
    const lottoTicket4 = new LottoTicket([1, 2, 3, 4, 8, 7]);
    const lottoTicket5 = new LottoTicket([1, 2, 3, 9, 8, 7]);
    const lottoTicket6 = new LottoTicket([1, 2, 10, 9, 8, 7]);
    const lottoTicket7 = new LottoTicket([1, 11, 10, 9, 8, 7]);
    const lottoTicket8 = new LottoTicket([12, 11, 10, 9, 8, 7]);

    expect(lottoTicket1.getTotalMatchCount(winningNumber)).to.equal(6);
    expect(lottoTicket2.getTotalMatchCount(winningNumber)).to.equal(5 + BOUNS_COUNT);
    expect(lottoTicket3.getTotalMatchCount(winningNumber)).to.equal(5);
    expect(lottoTicket4.getTotalMatchCount(winningNumber)).to.equal(4);
    expect(lottoTicket5.getTotalMatchCount(winningNumber)).to.equal(3);
    expect(lottoTicket6.getTotalMatchCount(winningNumber)).to.equal(2);
    expect(lottoTicket7.getTotalMatchCount(winningNumber)).to.equal(1);
    expect(lottoTicket8.getTotalMatchCount(winningNumber)).to.equal(0);
  });

  it('구매금액이 5,000원이고 당첨금액이 0원이면, -100의 수익률(%)을 반환한다.', () => {
    const lottoTickets = [...Array(5)].map(() => new LottoTicket([7, 8, 9, 10, 11, 12]));
    const rateOfReturn = new ResultModal({ lottoTickets, winningNumber }).getRateOfReturn();

    expect(rateOfReturn).to.equal(-100);
  });

  it('구매금액이 5,000원이고 당첨금액이 5,000원이면, 0의 수익률(%)을 반환한다.', () => {
    const lottoTickets = [...Array(4)]
      .map(() => new LottoTicket([7, 8, 9, 10, 11, 12]))
      .concat(new LottoTicket([1, 2, 3, 7, 8, 9]));
    const rateOfReturn = new ResultModal({ lottoTickets, winningNumber }).getRateOfReturn();

    expect(rateOfReturn).to.equal(0);
  });

  it('구매금액이 5,000원이고 당첨금액이 2,000,000,000원이면, 39999900의 수익률(%)을 반환한다.', () => {
    const lottoTickets = [...Array(4)]
      .map(() => new LottoTicket([7, 8, 9, 10, 11, 12]))
      .concat(new LottoTicket([1, 2, 3, 4, 5, 6]));
    const rateOfReturn = new ResultModal({ lottoTickets, winningNumber }).getRateOfReturn();

    expect(rateOfReturn).to.equal(39999900);
  });

  it('구매금액이 13,000원이고 당첨금액이 5,000원이면, -61.54의 수익률(%)을 반환한다.', () => {
    const lottoTickets = [...Array(12)]
      .map(() => new LottoTicket([7, 8, 9, 10, 11, 12]))
      .concat(new LottoTicket([1, 2, 3, 11, 12, 13]));
    const rateOfReturn = new ResultModal({ lottoTickets, winningNumber }).getRateOfReturn();

    expect(rateOfReturn).to.equal(-61.54);
  });
});
