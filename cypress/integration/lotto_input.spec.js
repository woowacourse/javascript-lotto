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

  it('금액이 1000원 미만으로 입력된 경우, alert에 오류 메시지를 출력한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#lotto-perchase-input').type('100');
    cy.get('#lotto-perchase-btn')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(
          `1000원 이상의 금액만 입력할 수 있습니다.`,
        );
      });
  });

  it('금액이 소수로 입력된 경우, alert에 오류 메시지를 출력한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#lotto-perchase-input').type('100.2');
    cy.get('#lotto-perchase-btn')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(
          `소수를 입력하셨습니다. 입력 금액은 정수여야 합니다.`,
        );
      });
  });
});
