/// <reference types="cypress" />

describe('LOTTO - 구매할 금액 입력 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('정상적인 금액을 입력하고 확인 버튼을 클릭한 경우, alert에 로또 구매 결과 안내 메시지를 출력한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#lotto-perchase-input').type('1500');
    cy.get('#lotto-perchase-btn')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(
          `로또 1개 구매 완료. 거스름돈 : 500원`,
        );
      });
  });
});
