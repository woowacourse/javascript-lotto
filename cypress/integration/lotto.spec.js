import { MESSAGE } from '../../src/constants.js';

describe('step 1', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501');
    cy.window()
      .then((win) => cy.stub(win, 'alert'))
      .as('alertStub');
  });
  it('소비자는 낸 금액에 맞는 개수만큼의 복권을 받는다.', () => {
    cy.get('#cost-input').type('5000');
    cy.get('#cost-submit-button').click();
    cy.get('#lotto-count').should('have.text', '5');
    cy.get('.lotto-item').should('have.length', '5');
  });
  it('소비자가 받은 각각의 복권에서 중복되는 숫자가 존재하면 안된다.', () => {
    cy.get('#cost-input').type('5000');
    cy.get('#cost-submit-button').click();
    cy.get('.lotto-numbers-toggle-button').click();
    cy.get('.lotto-item').each((item) => {
      const $lottoNumbers = item.querySelector('.lotto-numbers');
      const lottoNumberList = $lottoNumbers.innerText.split(', ');
      expect(lottoNumberList.length).to.equal(new Set(lottoNumberList).size);
    });
  });
  it('금액은 1000원 이상을 입력해야 한다. 그 이하로 입력시 안내메세지를 출력한다.', () => {
    cy.get('#cost-input').type('500');
    cy.get('#cost-submit-button').click();
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.SHOULD_EXCEED_MIN_COST
    );
    cy.get('#purchase-result').should('not.be.visible');
  });
  it('남는 금액이 있을 경우 남는 금액만큼을 빼도록 안내한다.', () => {
    cy.get('#cost-input').type('3500');
    cy.get('#cost-submit-button').click();
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.getShouldNotHaveChangeMessage(500)
    );
    cy.get('#purchase-result').should('not.be.visible');
  });
});
