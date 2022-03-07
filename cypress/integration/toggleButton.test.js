import { SELECTOR } from '../../src/js/constants';

describe('번호 보기 버튼을 활성화/비활성화 한 경우', () => {
  const input = 3000;

  before(() => {
    cy.visit('./index.html');
    cy.get(SELECTOR.PAYMENT_INPUT).type(input);
    cy.get(SELECTOR.PAYMENT_BUTTON).click();
  });

  it('번호 보기 버튼을 활성화하면 사용자가 구매한 로또 번호를 확인할 수 있다.', () => {
    cy.get(SELECTOR.LOTTO_LIST_TOGGLE_BUTTON).click();
    cy.get(SELECTOR.LOTTO_NUMBER).should('be.visible');
  });

  it('번호 보기 버튼을 비활성화하면 사용자가 구매한 로또 번호가 가려진다.', () => {
    cy.get(SELECTOR.LOTTO_LIST_TOGGLE_BUTTON).click();
    cy.get(SELECTOR.LOTTO_NUMBER).should('be.not.visible');
  });
});
