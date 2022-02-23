it('구입할 금액을 조건에 맞게 입력 후 구입 버튼을 누르면, 구입한 로또 갯수를 확인할 수 있다.', () => {
  cy.visit('/index.html');
  const input = 3000;

  cy.get('#payment-input').type(input);
  cy.get('#payment-button')
    .click()
    .then(() => {
      cy.get('.purchased-total-count').should(
        'text',
        '총 3개를 구매하였습니다.'
      );
    });
});

it('구입할 금액을 조건에 맞게 입력 후 구입 버튼을 누르면, 지난주 당첨 번호 영역이 보여진다.', () => {
  cy.visit('/index.html');
  const input = 3000;

  cy.get('#payment-input').type(input);
  cy.get('#payment-button')
    .click()
    .then(() => {
      cy.get('#last-week-winning-number-section').should('be.visible');
    });
});

it('구입할 금액을 조건에 맞게 입력 후 구입 버튼을 누르면, 결과 확인하기 버튼이 보여진다', () => {
  cy.visit('/index.html');
  const input = 3000;

  cy.get('#payment-input').type(input);
  cy.get('#payment-button')
    .click()
    .then(() => {
      cy.get('#result-checking-button').should('be.visible');
    });
});

it('번호 보기 버튼을 누르면 사용자가 구매한 로또 번호를 확인할 수 있다.', () => {
  cy.visit('/index.html');
  const input = 3000;

  cy.get('#payment-input').type(input);
  cy.get('#payment-button').click();
  cy.get('#lotto-list-toggle-button')
    .click()
    .then(() => {
      cy.get('.lotto-number').should('be.visible');
    });
});

it('번호 보기 버튼을 비활성화시키면 로또 번호가 가려진다', () => {
  cy.visit('/index.html');
  const input = 3000;

  cy.get('#payment-input').type(input);
  cy.get('#payment-button').click();
  cy.get('#lotto-list-toggle-button').click();
  cy.get('#lotto-list-toggle-button')
    .click()
    .then(() => {
      cy.get('.lotto-number').should('be.not.visible');
    });
});

it('구입할 금액이 1000원 이상 10000원 이하가 아닌 경우 에러메시지를 보여준다.', () => {
  cy.visit('/index.html');
  const input = -1;
  const alertStub = cy.stub();
  cy.on('window:alert', alertStub);

  cy.get('#payment-input').type(input);
  cy.get('#payment-button')
    .click()
    .then(() => {
      expect(alertStub).to.be.calledWith(
        '구입할 금액은 1000원 이상 10000원 이하를 입력해주셔야 합니다.'
      );
      cy.get('#payment-input').should('have.value', '');
      cy.get('#payment-input').should('have.focus');
    });
});

it('구입할 금액을 1000원 단위로 입력하지 않았을 경우 에러메시지를 보여준다', () => {
  cy.visit('/index.html');
  const input = 1001;
  const alertStub = cy.stub();
  cy.on('window:alert', alertStub);

  cy.get('#payment-input').type(input);
  cy.get('#payment-button')
    .click()
    .then(() => {
      expect(alertStub).to.be.calledWith(
        '구입할 금액은 1000원 단위로 입력해주셔야 합니다'
      );
      cy.get('#payment-input').should('have.value', '');
      cy.get('#payment-input').should('have.focus');
    });
});

it('구입할 금액을 조건에 맞게 입력한 후 구입 버튼을 누르면, 구입 버튼이 비활성화 된다.', () => {
  cy.visit('/index.html');
  const input = 3000;

  cy.get('#payment-input').type(input);
  cy.get('#payment-button')
    .click()
    .then(() => {
      cy.get('#payment-button').should('be.disabled');
    });
});
