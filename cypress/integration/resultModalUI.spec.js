import { BOUNS_COUNT, LOTTO_PRICE } from '../../src/js/constants.js';
import LottoTicket from '../../src/js/model/LottoTicket.js';

describe('당첨 결과 모달 UI 검사', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  const winningNumber = {
    winningNumbers: [1, 2, 3, 4, 5, 6],
    bonusNumber: 7,
  };

  it('로또 구매 및 당첨번호 입력을 마치고 결과확인 버튼을 클릭하면 당첨 결과 모달이 표시된다.', () => {
    const { winningNumbers, bonusNumber } = winningNumber;

    cy.get('.purchase-amount-input').type(LOTTO_PRICE).type('{enter}');
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.modal').should('be.visible');
  });

  it('구매한 로또의 당첨번호 일치 개수를 반환한다.', () => {
    const lottoTicket1 = new LottoTicket([1, 2, 3, 4, 5, 6]);
    const lottoTicket2 = new LottoTicket([1, 2, 3, 4, 5, 7]);
    const lottoTicket3 = new LottoTicket([1, 2, 3, 4, 5, 8]);
    const lottoTicket4 = new LottoTicket([1, 2, 3, 4, 8, 7]);
    const lottoTicket5 = new LottoTicket([1, 2, 3, 9, 8, 7]);
    const lottoTicket6 = new LottoTicket([1, 2, 10, 9, 8, 7]);
    const lottoTicket7 = new LottoTicket([1, 11, 10, 9, 8, 7]);
    const lottoTicket8 = new LottoTicket([12, 11, 10, 9, 8, 7]);

    expect(lottoTicket1.getMatchCount(winningNumber)).to.equal(6);
    expect(lottoTicket2.getMatchCount(winningNumber)).to.equal(5 + BOUNS_COUNT);
    expect(lottoTicket3.getMatchCount(winningNumber)).to.equal(5);
    expect(lottoTicket4.getMatchCount(winningNumber)).to.equal(4);
    expect(lottoTicket5.getMatchCount(winningNumber)).to.equal(3);
    expect(lottoTicket6.getMatchCount(winningNumber)).to.equal(2);
    expect(lottoTicket7.getMatchCount(winningNumber)).to.equal(1);
    expect(lottoTicket8.getMatchCount(winningNumber)).to.equal(0);
  });

  it('구매금액이 5,000원이고 당첨금액이 0원이면, -100의 수익률(%)을 반환한다.', () => {
    const lottoTickets = [...Array(5)].map(() => new LottoTicket([7, 8, 9, 10, 11, 12]));
    const rateOfReturn = new ResultModal().getRateOfReturn(lottoTickets);

    expect(rateOfReturn).to.equal(-100);
  });

  it('구매금액이 5,000원이고 당첨금액이 5,000원이면, 0의 수익률(%)을 반환한다.', () => {
    const lottoTickets = [...Array(4)]
      .map(() => new LottoTicket([7, 8, 9, 10, 11, 12]))
      .concat(new LottoTicket([1, 2, 3, 7, 8, 9]));
    const rateOfReturn = new ResultModal().getRateOfReturn(lottoTickets);

    expect(rateOfReturn).to.equal(0);
  });

  it('구매금액이 5,000원이고 당첨금액이 2,000,000,000원이면, 39999900의 수익률(%)을 반환한다.', () => {
    const lottoTickets = [...Array(4)]
      .map(() => new LottoTicket([7, 8, 9, 10, 11, 12]))
      .concat(new LottoTicket([1, 2, 3, 4, 5, 6]));
    const rateOfReturn = new ResultModal().getRateOfReturn(lottoTickets);

    expect(rateOfReturn).to.equal(39999900);
  });

  it('다시 시작하기 버튼을 클릭하면, 모달이 사라지고 화면이 초기화된다.', () => {
    cy.get('.restart-button').click();
    cy.get('.modal').should('not.be.visible');
    cy.get('.purchased-lotto-section').should('not.be.visible');
    cy.get('.winning-number-form').should('not.be.visible');
    cy.get('.purchase-amount-input').should('have.text', '');
    cy.get('.lotto-numbers-toggle-button').should('not.be.checked');
    cy.get('.winning-number').each(($el) => {
      cy.wrap($el).should('have.text', '');
    });
  });
});
