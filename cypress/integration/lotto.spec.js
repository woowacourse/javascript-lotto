import { MESSAGE } from '../../src/constants.js';

describe('기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501');
  });
  it('소비자는 자동 / 수동 구매를 선택할 수 있다.', () => {
    cy.get('#cost-input').type('3000');
    cy.get('#cost-submit-button').click();
    cy.get('#auto-purchase-button').click();
    cy.get('#manual-purchase-button').click();
  });

  it('소비자는 자동으로 구매한 로또 개수만큼의 복권을 받는다.', () => {
    cy.get('#cost-input').type('3000');
    cy.get('#cost-submit-button').click();
    cy.get('#auto-purchase-button').click();
    cy.get('#auto-count-input').type(2);
    cy.get('#auto-count-submit-button').click();
    cy.get('#lotto-count').should('have.text', '2');
    cy.get('.lotto-item').should('have.length', '2');
  });

  it('수동 구매를 선택한 경우 직접 로또 번호를 입력할 수 있다.', () => {
    cy.get('#cost-input').type('3000');
    cy.get('#cost-submit-button').click();
    cy.get('#manual-purchase-button').click();
    cy.get('.manual-lotto-number').eq(0).type(1);
    cy.get('.manual-lotto-number').eq(1).type(2);
    cy.get('.manual-lotto-number').eq(2).type(3);
    cy.get('.manual-lotto-number').eq(3).type(4);
    cy.get('.manual-lotto-number').eq(4).type(5);
    cy.get('.manual-lotto-number').eq(5).type(6);
    cy.get('#manual-lotto-submit-button').click();
    cy.get('#lotto-count').should('have.text', '1');
    cy.get('.lotto-item').should('have.length', '1');
  });

  it('입력한 금액 / 로또 가격이 0이 되면 결과 확인하기 버튼이 활성화된다.', () => {
    cy.get('#cost-input').type('3000');
    cy.get('#cost-submit-button').click();
    cy.get('#auto-purchase-button').click();
    cy.get('#auto-count-input').type(3);
    cy.get('#auto-count-submit-button').click();
    cy.get('#result-modal-open-button').should('be.visible');
  });

  it('소비자가 받은 각각의 복권에서 중복되는 숫자가 존재하면 안된다.', () => {
    cy.get('#cost-input').type('5000');
    cy.get('#cost-submit-button').click();
    cy.get('#lotto-numbers-toggle-button').click({ force: true });
    cy.get('.lotto-item').each((items) => {
      const [item] = items;
      const $lottoNumbers = item.querySelector('.lotto-numbers');
      const lottoNumberList = $lottoNumbers.innerText.split(', ');
      expect(lottoNumberList.length).to.equal(new Set(lottoNumberList).size);
    });
  });

  it('결과 확인 버튼을 누르면, 당첨 통계, 수익률을 보여준다.', () => {
    cy.get('#cost-input').type('3000');
    cy.get('#cost-submit-button').click();
    cy.get('.winning-number').eq(0).type(1);
    cy.get('.winning-number').eq(1).type(2);
    cy.get('.winning-number').eq(2).type(3);
    cy.get('.winning-number').eq(3).type(4);
    cy.get('.winning-number').eq(4).type(5);
    cy.get('.winning-number').eq(5).type(6);
    cy.get('.bonus-number').type(7);
    cy.get('#result-modal-open-button').click();
    cy.get('#modal').should('exist');
    cy.get('#modal').contains('당첨 통계');
    cy.get('#modal').contains('수익률');
  });

  it('다시 시작하기 버튼을 누르면, 로또게임이 초기화된다.', () => {
    cy.get('#cost-input').type('3000');
    cy.get('#cost-submit-button').click();
    cy.get('.winning-number').eq(0).type(1);
    cy.get('.winning-number').eq(1).type(2);
    cy.get('.winning-number').eq(2).type(3);
    cy.get('.winning-number').eq(3).type(4);
    cy.get('.winning-number').eq(4).type(5);
    cy.get('.winning-number').eq(5).type(6);
    cy.get('.bonus-number').type(7);
    cy.get('#result-modal-open-button').click();
    cy.get('#restart-button').click();
    cy.get('#cost-input').should('have.value', '');
    cy.get('#purchase-result').should('not.be.visible');
    cy.get('#correct-number-input-form').should('not.be.visible');
    cy.get('#modal').should('not.be.visible');
  });
});

describe('유저 입력 값 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501');
    cy.window()
      .then((win) => cy.stub(win, 'alert'))
      .as('alertStub');
  });

  it('금액은 1000원 이상을 입력해야 한다. 그 이하로 입력시 안내메세지를 출력한다.', () => {
    cy.get('#cost-input').type('500');
    cy.get('#cost-submit-button').click();
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.SHOULD_EXCEED_MIN_COST,
    );
    cy.get('#purchase-result').should('not.be.visible');
  });

  it('남는 금액이 있을 경우 남는 금액만큼을 빼도록 안내한다.', () => {
    cy.get('#cost-input').type('3500');
    cy.get('#cost-submit-button').click();
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.GET_SHOULD_NOT_HAVE_CHANGE_MESSAGE(3500),
    );
    cy.get('#purchase-result').should('not.be.visible');
  });

  it('입력된 로또번호 중 1 ~ 45 사이의 숫자가 아닌 숫자가 있다면 안내메시지를 출력한다.', () => {
    cy.get('#cost-input').type('3000');
    cy.get('#cost-submit-button').click();
    cy.get('#manual-purchase-button').click();
    cy.get('.manual-lotto-number').eq(0).type(1);
    cy.get('.manual-lotto-number').eq(1).type(2);
    cy.get('.manual-lotto-number').eq(2).type(46);
    cy.get('.manual-lotto-number').eq(3).click();
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.NUMBER_RANGE_EXCEEDED_MESSAGE,
    );
    cy.get('.manual-lotto-number').eq(2).should('have.text', '');
  });

  it('입력된 로또번호 중 중복된 번호가 있다면 안내메시지를 출력한다.', () => {
    cy.get('#cost-input').type('3000');
    cy.get('#cost-submit-button').click();
    cy.get('#manual-purchase-button').click();
    cy.get('.manual-lotto-number').eq(0).type(1);
    cy.get('.manual-lotto-number').eq(1).type(2);
    cy.get('.manual-lotto-number').eq(2).type(2);
    cy.get('.manual-lotto-number').eq(3).click();
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.DUPLICATED_NUMBER_EXIST_MESSAGE,
    );
    cy.get('.manual-lotto-number').eq(2).should('have.text', '');
  });

  it('로또번호가 모두 입력되지 않으면 안내메시지를 출력한다.', () => {
    cy.get('#cost-input').type('3000');
    cy.get('#cost-submit-button').click();
    cy.get('#manual-purchase-button').click();
    cy.get('.manual-lotto-number').eq(0).type(1);
    cy.get('.manual-lotto-number').eq(1).type(2);
    cy.get('.manual-lotto-number').eq(2).type(3);
    cy.get('.manual-lotto-number').eq(3).type(4);
    cy.get('.manual-lotto-number').eq(4).type(5);
    cy.get('#manual-lotto-submit-button').click();
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.SHOULD_INPUT_ALL_NUMBERS_MESSAGE,
    );
  });

  it('입력된 당첨번호들 중 중복된 번호가 있다면 안내메세지를 출력한다.', () => {
    cy.get('#cost-input').type('3000');
    cy.get('#cost-submit-button').click();
    cy.get('.winning-number').eq(0).type(1);
    cy.get('.winning-number').eq(1).type(2);
    cy.get('.winning-number').eq(2).type(3);
    cy.get('.winning-number').eq(3).type(5);
    cy.get('.winning-number').eq(4).type(5);
    cy.get('.winning-number').eq(5).click();
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.DUPLICATED_NUMBER_EXIST_MESSAGE,
    );
    cy.get('.winning-number').eq(5).should('have.text', '');
  });

  it('입력된 당첨번호들 중 1 ~ 45 사이의 숫자가 아닌 숫자가 있다면 안내메시지를 출력한다.', () => {
    cy.get('#cost-input').type('3000');
    cy.get('#cost-submit-button').click();
    cy.get('.winning-number').eq(0).type(1);
    cy.get('.winning-number').eq(1).type(2);
    cy.get('.winning-number').eq(2).type(3);
    cy.get('.winning-number').eq(3).type(4);
    cy.get('.winning-number').eq(4).type(55);
    cy.get('.winning-number').eq(5).click();
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.NUMBER_RANGE_EXCEEDED_MESSAGE,
    );
    cy.get('.winning-number').eq(4).should('have.text', '');
  });

  it('당첨번호가 모두 입력되지 않으면 결과를 확인할 수 없다.', () => {
    cy.get('#cost-input').type('3000');
    cy.get('#cost-submit-button').click();
    cy.get('.winning-number').eq(0).type(1);
    cy.get('.winning-number').eq(1).type(2);
    cy.get('.winning-number').eq(2).type(3);
    cy.get('.winning-number').eq(3).type(4);
    cy.get('.winning-number').eq(4).type(5);
    cy.get('.bonus-number').type(6);
    cy.get('#result-modal-open-button').click();
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.SHOULD_INPUT_ALL_NUMBERS_MESSAGE,
    );
    cy.get('#modal').should('not.be.visible');
  });
});
