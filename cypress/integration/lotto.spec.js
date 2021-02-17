/// <reference types="cypress" />
import Lotto from "../../src/js/object/Lotto.js";
import { LOTTO_SETTINGS } from '../../src/js/constants.js';

context('로또 UI 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급한다.', () => {
    const money = 3000;
    cy.get('.money-input').type(money);
    cy.get('.money-input-button').click();
    cy.get('.lotto-ticket').should('have.length', Math.floor(money / LOTTO_SETTINGS.LOTTO_PRICE));
  });

  it('입력받는 구입 금액은 최소 1000원 이상이어야 한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('.money-input').type(500);
    cy.get('.money-input-button').click().then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith('최소 1000원 이상의 금액을 입력해야 합니다.');
    });
  });

  it('번호 보기 토글 버튼을 클릭하면, 복권 번호가 화면에 표시된다.', () => {
    const money = 3000;
    cy.get('.money-input').type(money);
    cy.get('.money-input-button').click();

    cy.get('.check-lotto-switch').click();
    cy.get('.lotto-ticket-number').should('have.length', Math.floor(money / LOTTO_SETTINGS.LOTTO_PRICE));
    cy.get('.check-lotto-switch').click();
    cy.get('.lotto-ticket-number').should('not.be.visible');
  });
});

context('로또 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  it('로또 자동 구매 시, 1 ~ 45 중 중복 없이 무작위 6개 숫자를 뽑아 저장한다.', () => {
    const money = 5000;
    const lotto = new Lotto();
    lotto.createNumbers();
    const amountTestSet = new Set(lotto.getNumbers());
    expect(amountTestSet.size === LOTTO_SETTINGS.LOTTO_NUMBER_SIZE).to.equal(true);

    for (let i = LOTTO_SETTINGS.MIN_LOTTO_NUMBER; i <= LOTTO_SETTINGS.MAX_LOTTO_NUMBER; i++) {
      const randomNumber = lotto.getRandomNumber(LOTTO_SETTINGS.MIN_LOTTO_NUMBER, i);
      expect(randomNumber >= LOTTO_SETTINGS.MIN_LOTTO_NUMBER && randomNumber <= i).to.equal(true);
    }
  });
});