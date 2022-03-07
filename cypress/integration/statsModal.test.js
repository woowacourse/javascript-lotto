import { SELECTOR } from '../../src/js/constants';

describe('당첨 통계 모달 관련 테스트 케이스', () => {
  before(() => {
    cy.visit('./index.html');
    cy.get(SELECTOR.PAYMENT_INPUT).type(3000);
    cy.get(SELECTOR.PAYMENT_BUTTON).click();

    cy.get(SELECTOR.LAST_WEEK_NUMBER_INPUT).eq(0).type(1);
    cy.get(SELECTOR.LAST_WEEK_NUMBER_INPUT).eq(1).type(2);
    cy.get(SELECTOR.LAST_WEEK_NUMBER_INPUT).eq(2).type(3);
    cy.get(SELECTOR.LAST_WEEK_NUMBER_INPUT).eq(3).type(4);
    cy.get(SELECTOR.LAST_WEEK_NUMBER_INPUT).eq(4).type(5);
    cy.get(SELECTOR.LAST_WEEK_NUMBER_INPUT).eq(5).type(6);
    cy.get(SELECTOR.LAST_WEEK_BONUS_NUMBER_INPUT).type(7);

    cy.get(SELECTOR.RESULT_CHECKING_BUTTON).click();
  });

  it('결과 확인하기 버튼을 클릭하면 당첨 통계 모달을 확인할 수 있다.', () => {
    cy.get(SELECTOR.LOTTO_RESULT_SECTION).should('be.exist');
  });

  it('당첨 통계 모달에 있는 엑스표 버튼을 클릭하면 당첨 통계 모달이 닫힌다.', () => {
    cy.get(SELECTOR.EXIT_BUTTON).click();
    cy.get(SELECTOR.LOTTO_RESULT_SECTION).should('be.not.exist');
  });

  it('당첨 통계 모달에 있는 다시 시작하기 버튼을 클릭하면 행운의 로또가 초기화 된다.', () => {
    cy.get(SELECTOR.RESULT_CHECKING_BUTTON).click();
    cy.get(SELECTOR.RESTART_BUTTON).click();

    cy.get(SELECTOR.PAYMENT_INPUT).should('have.value', '');
    cy.get(SELECTOR.PAYMENT_INPUT).should('have.focus');
    cy.get(SELECTOR.PAYMENT_BUTTON).should('be.not.disabled');

    cy.get(SELECTOR.PURCHASED_LOTTO_LIST_SECTION).should('be.not.exist');
    cy.get(SELECTOR.LAST_WEEK_WINNING_NUMBER_SECTION).should('be.not.exist');
    cy.get(SELECTOR.RESULT_CHECKING_SECTION).should('be.not.exist');
    cy.get(SELECTOR.LOTTO_RESULT_SECTION).should('be.not.exist');
  });
});
