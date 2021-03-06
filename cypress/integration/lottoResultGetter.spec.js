import LottoTicket from '../../src/js/model/LottoTicket.js';
import { BONUS_COUNT, LOTTO_PRICE, RATE_OF_RETURN_MESSAGE } from '../../src/js/constants.js';

describe('당첨통계 계산 메서드 검사', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  const winningNumber = {
    winningNumbers: [1, 2, 3, 4, 5, 6],
    bonusNumber: 7,
  };

  it('구매한 로또의 당첨번호 일치 개수를 반환한다.', () => {
    const lottoTicket1 = new LottoTicket([1, 2, 3, 4, 5, 6]);
    lottoTicket1.setTotalMatchCount(winningNumber);
    const lottoTicket2 = new LottoTicket([1, 2, 3, 4, 5, 7]);
    lottoTicket2.setTotalMatchCount(winningNumber);
    const lottoTicket3 = new LottoTicket([1, 2, 3, 4, 5, 8]);
    lottoTicket3.setTotalMatchCount(winningNumber);
    const lottoTicket4 = new LottoTicket([1, 2, 3, 4, 8, 7]);
    lottoTicket4.setTotalMatchCount(winningNumber);
    const lottoTicket5 = new LottoTicket([1, 2, 3, 9, 8, 7]);
    lottoTicket5.setTotalMatchCount(winningNumber);
    const lottoTicket6 = new LottoTicket([1, 2, 10, 9, 8, 7]);
    lottoTicket6.setTotalMatchCount(winningNumber);
    const lottoTicket7 = new LottoTicket([1, 11, 10, 9, 8, 7]);
    lottoTicket7.setTotalMatchCount(winningNumber);
    const lottoTicket8 = new LottoTicket([12, 11, 10, 9, 8, 7]);
    lottoTicket8.setTotalMatchCount(winningNumber);

    expect(lottoTicket1.totalMatchCount).to.equal(6);
    expect(lottoTicket2.totalMatchCount).to.equal(5 + BONUS_COUNT);
    expect(lottoTicket3.totalMatchCount).to.equal(5);
    expect(lottoTicket4.totalMatchCount).to.equal(4);
    expect(lottoTicket5.totalMatchCount).to.equal(3);
    expect(lottoTicket6.totalMatchCount).to.equal(2);
    expect(lottoTicket7.totalMatchCount).to.equal(1);
    expect(lottoTicket8.totalMatchCount).to.equal(0);
  });

  const purchaseManualLottoTickets = (lottoTicketNumbers) => {
    lottoTicketNumbers.forEach((numbers) => {
      cy.get('.manual-lotto-number > input[type=number]').each(($el, index) => {
        cy.wrap($el).type(numbers[index]);
      });
      cy.get('.add-manual-lotto-button').click();
    });
    cy.get('.lotto-purchase-button').click();
  };

  const typeWinningNumbers = () => {
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumber.winningNumbers[index]);
    });
    cy.get('.bonus-number').type(winningNumber.bonusNumber);
    cy.get('.open-result-modal-button').click();
  };

  it('구매금액이 5,000원이고 당첨금액이 0원이면, -100의 수익률(%)을 반환한다.', () => {
    cy.get('.purchase-amount-input')
      .type(LOTTO_PRICE * 5)
      .type('{enter}');

    const lottoTicketNumbers = [...Array(5)].map(() => [7, 8, 9, 10, 11, 12]);
    purchaseManualLottoTickets(lottoTicketNumbers);
    typeWinningNumbers();

    cy.get('.rate-of-return').should('have.text', RATE_OF_RETURN_MESSAGE(-100));
  });

  it('구매금액이 5,000원이고 당첨금액이 5,000원이면, 0의 수익률(%)을 반환한다.', () => {
    cy.get('.purchase-amount-input')
      .type(LOTTO_PRICE * 5)
      .type('{enter}');

    const lottoTicketNumbers = [...Array(4)].map(() => [7, 8, 9, 10, 11, 12]);
    lottoTicketNumbers.push([1, 2, 3, 7, 8, 9]);
    purchaseManualLottoTickets(lottoTicketNumbers);
    typeWinningNumbers();

    cy.get('.rate-of-return').should('have.text', RATE_OF_RETURN_MESSAGE(0));
  });

  it('구매금액이 5,000원이고 당첨금액이 2,000,000,000원이면, 39999900의 수익률(%)을 반환한다.', () => {
    cy.get('.purchase-amount-input')
      .type(LOTTO_PRICE * 5)
      .type('{enter}');

    const lottoTicketNumbers = [...Array(4)].map(() => [7, 8, 9, 10, 11, 12]);
    lottoTicketNumbers.push([1, 2, 3, 4, 5, 6]);
    purchaseManualLottoTickets(lottoTicketNumbers);
    typeWinningNumbers();

    cy.get('.rate-of-return').should('have.text', RATE_OF_RETURN_MESSAGE(39999900));
  });

  it('구매금액이 13,000원이고 당첨금액이 5,000원이면, -61.54의 수익률(%)을 반환한다.', () => {
    cy.get('.purchase-amount-input')
      .type(LOTTO_PRICE * 13)
      .type('{enter}');

    const lottoTicketNumbers = [...Array(12)].map(() => [7, 8, 9, 10, 11, 12]);
    lottoTicketNumbers.push([1, 2, 3, 11, 12, 13]);
    purchaseManualLottoTickets(lottoTicketNumbers);
    typeWinningNumbers();

    cy.get('.rate-of-return').should('have.text', RATE_OF_RETURN_MESSAGE(-61.54));
  });
});
