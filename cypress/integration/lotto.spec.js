describe('lotto app test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('입력된 로또 구입 금액이 로또 한 장의 금액보다 적을 경우 alert을 띄우고 input창을 초기화한다.', () => {
    const lottoPrice = 1000;
    const errorMsg = `로또 한 장의 가격은 ${lottoPrice}원 입니다. ${lottoPrice}원 이상의 금액을 입력해주세요`;
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    cy.get('.purchase-amount-input').type(lottoPrice - 100);
    cy.get('.purchase-amount-button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0).to.be.calledWith(errorMsg));
        cy.get('.purchase-amount-input').should('have.text', '');
        cy.get('.purchase-amount-input').should('have.focus');
      });
  });
});
