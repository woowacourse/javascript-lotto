context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/');
  });

  it('구입 금액을 입력받아 티켓을 생성한다.', () => {
    cy.get('#payment-input').type('5000');
    cy.get('#payment-submit').click();
    cy.get('.ticket').should('have.length', 5);
  });

  it('공백은 입력할 수 없다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('#payment-submit').click();
    cy.get('@alert').should(
      'be.calledWith',
      '공백은 입력할 수 없습니다. 숫자를 입력해 주세요.'
    );
  });

  it('0과 음수는 입력할 수 없다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('#payment-input').type('0');
    cy.get('#payment-submit').click();
    cy.get('@alert').should(
      'be.calledWith',
      '0과 음수는 입력할 수 없습니다. 1 이상의 숫자를 입력해 주세요.'
    );
  });

  it('토글 버튼을 누르면 티켓의 번호를 보여준다.', () => {
    cy.get('#payment-input').type('5000');
    cy.get('#payment-submit').click();
    cy.get('.switch').click();
    cy.get('.lotto-numbers').should('have.length', 5);
  });

  it('각 티켓은 1-45 사이의 6개 랜덤 숫자를 가진다.', () => {
    cy.get('#payment-input').type('1000');
    cy.get('#payment-submit').click();
    cy.get('.switch').click();
    cy.get('.lotto-numbers').then(elements => {
      elements[0].innerText.split(', ').forEach(number => {
        number = Number(number);
        expect(number).to.at.least(1);
        expect(number).to.at.most(45);
      });
    });
  });
});
