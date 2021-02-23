/// <reference types="cypress" />
import Lotto from "../../src/js/objects/Lotto.js";
import { ALERT_MESSAGES, LOTTO_SETTINGS, DOM_CLASSES } from '../../src/js/utils/constants.js';

context('로또 UI 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급한다.', () => {
    const money = 3000;
    cy.get(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).type(money);
    cy.get(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).click();
    cy.get(`.${DOM_CLASSES.LOTTO_TICKET}`).should('have.length', Math.floor(money / LOTTO_SETTINGS.LOTTO_PRICE));
  });

  it('입력받는 구입 금액은 최소 1000원 이상이어야 한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).type(500);
    cy.get(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).click().then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.UNDER_MIN_PRICE);
    });
  });

  it('입력받는 구입 금액은 정수여야한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).type(5000.5);
    cy.get(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).click().then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.NOT_INTEGER_PRICE);
    });
  });

  it('로또 구입 금액을 입력받으면, 구입 버튼이 비활성화된다.', () => {
    cy.get(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).type(5000);
    cy.get(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).click();
    cy.get(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).should('be.disabled');
  });

  it('번호 보기 토글 버튼을 클릭하면, 복권 번호가 화면에 표시된다.', () => {
    const money = 3000;
    cy.get(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).type(money);
    cy.get(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).click();

    cy.get(`.${DOM_CLASSES.LOTTO_SWITCH}`).click();
    cy.get(`.${DOM_CLASSES.LOTTO_TICKET_NUMBER}`).should('have.length', Math.floor(money / LOTTO_SETTINGS.LOTTO_PRICE));
    cy.get(`.${DOM_CLASSES.LOTTO_TICKET_NUMBER}`).should('be.visible');
    cy.get(`.${DOM_CLASSES.LOTTO_SWITCH}`).click();
    cy.get(`.${DOM_CLASSES.LOTTO_TICKET_NUMBER}`).should('not.be.visible');
  });

  it('로또 구입 금액을 입력 받으면 결과 확인 UI를 띄운다.', () => {
    const money = 3000;
    cy.get(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).type(money);
    cy.get(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).click();
    cy.get(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`).should('be.visible');
  });

  it('결과 확인하기 버튼을 누르면 당첨 통계 모달창을 띄운다.', () => {
    const money = 3000;
    cy.get(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).type(money);
    cy.get(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).click();
    cy.get(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`).then(numbers => {
      [...numbers].forEach((number, idx) => {
        cy.get(number).type(idx);
      })
    });
    cy.get(`.${DOM_CLASSES.RESULT_BONUS_NUMBER}`).type(7);
    cy.get(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`).click();
    cy.get(`.${DOM_CLASSES.MODAL}`).should("be.visible");
  })

  it('당첨 번호와 보너스 번호를 입력하여야만 결과를 확인할 수 있다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    const money = 3000;
    cy.get(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).type(money);
    cy.get(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).click();
    cy.get(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`).click().then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(`당첨 번호와 보너스 번호를 입력해주세요.`);
    });
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