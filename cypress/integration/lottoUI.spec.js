/// <reference types="cypress" />
import { ALERT_MESSAGES } from '../../src/js/utils/constants/alert.js';
import { LOTTO_SETTINGS } from '../../src/js/utils/constants/settings.js';
import { DOM_CLASSES } from '../../src/js/utils/constants/dom.js';

const COMMON_MONEY_INPUT = 5000;
const NOT_INTEGER_MONEY_INPUT = 5000.5;
const SHORT_MONEY_INPUT = 500;

context('로또 UI 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  describe('금액 입력 부분', () => {
    it('로또 구입 금액을 입력하면, 수동 구매와 자동 구매 갯수를 정하는 input이 나타난다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      testChildNodeExist(`.${DOM_CLASSES.BUYING_INPUT_CONTAINER}`);
    });

    it('입력받는 구입 금액은 최소 1000원 이상이어야 한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, SHORT_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`)
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.UNDER_MIN_PRICE);
        });
    });

    it('입력받는 구입 금액은 정수여야한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, NOT_INTEGER_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      testChildNodeNotExist(`.${DOM_CLASSES.LOTTO_CONTAINER}`);
    });

    it('로또 구입 금액을 입력받으면, 구입 버튼이 비활성화된다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      cy.get(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).should('be.disabled');
    });
  });

  describe('로또 자동/수동 구매 정보 입력 부분', () => {
    it('자동/수동 구매 갯수를 정하면 수동 번호 입력란이 표시된다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      cy.get(`.${DOM_CLASSES.BUYING_FORM_COUNT_SUBMIT}`).click();
      
      cy.document().then(doc => {
        const lottoAmount = doc.querySelector(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).value / LOTTO_SETTINGS.LOTTO_PRICE;
        const autoLottoAmount = doc.querySelector(`.${DOM_CLASSES.BUYING_FORM_RANGE_INPUT}`).value;
        cy.get(`.${DOM_CLASSES.BUYING_FORM_MANUAL_PAPER}`).then($$papers => {
          expect($$papers.length).to.equal(lottoAmount - autoLottoAmount);
        });
      });
    });

    it('수동 구매 번호를 입력하면 로또 번호 확인란과 당첨 번호 입력란이 표시된다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      submitManualNumbers();
      
      cy.get(`.${DOM_CLASSES.LOTTO_TICKET}`).should('have.length', Math.floor(COMMON_MONEY_INPUT / LOTTO_SETTINGS.LOTTO_PRICE));
      cy.get(`.${DOM_CLASSES.RESULT_INPUT_FORM}`).should('be.visible');
    });
  });

  describe('구입한 로또 확인 부분', () => {
    it('번호 보기 토글 버튼을 클릭하면, 복권 번호가 화면에 표시된다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      submitManualNumbers();

      cy.get(`.${DOM_CLASSES.LOTTO_SWITCH}`).click();
      cy.get(`.${DOM_CLASSES.LOTTO_TICKET_NUMBER}`).should('have.length', Math.floor(COMMON_MONEY_INPUT / LOTTO_SETTINGS.LOTTO_PRICE));
      cy.get(`.${DOM_CLASSES.LOTTO_TICKET_NUMBER}`).should('be.visible');
      cy.get(`.${DOM_CLASSES.LOTTO_SWITCH}`).click();
      cy.get(`.${DOM_CLASSES.LOTTO_TICKET_NUMBER}`).should('not.be.visible');
    });
  });

  describe('로또 당첨 번호 입력 부분', () => {
    it('로또 구입 금액을 입력 받으면 결과 확인 UI를 띄운다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      submitManualNumbers();

      cy.get(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`).should('be.visible');
    });

    it('결과 확인하기 버튼을 누르면 당첨 통계 모달창을 띄운다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      submitManualNumbers();
      typeResultNumbers([1, 2, 3, 4, 5, 6, 7]);

      cy.get(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`).click();
      cy.get(`.${DOM_CLASSES.MODAL}`).should("be.visible");
    })

    it('당첨 번호와 보너스 번호를 입력하여야만 결과를 확인할 수 있다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      submitManualNumbers();
      cy.get(`.${DOM_CLASSES.MODAL}`).should('not.be.visible');
    });

    it('당첨 번호와 보너스 번호는 중복이 있어서는 안된다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      submitManualNumbers();
      typeResultNumbers([5, 5, 5, 5, 5, 5, 5]);

      cy.get(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`).click().then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.DUPLICATED_NUMBERS_EXIST);
      });
    });

    it('당첨 번호와 보너스 번호는 1~45의 숫자를 가진다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      submitManualNumbers();
      typeResultNumbers([55, 65, 75, 85, 95, 105, 115]);

      cy.get(`.${DOM_CLASSES.MODAL}`).should('not.be.visible');
    });
  });

  describe('당첨 통계 부분', () => {
    it('당첨 통계에서는 당첨 갯수와 수익률을 확인할 수 있다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      submitManualNumbers();
      typeResultNumbers([1, 2, 3, 4, 5, 6, 7]);

      cy.get(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`).click();
      cy.get(`.${DOM_CLASSES.MODAL_WINNING_COUNT}`).then(($$winningCounts) => {
        [...$$winningCounts].forEach(($winningCount) => {
          const text = $winningCount.innerText;
          expect(/[0-9]개/g.test(text)).to.be.true;
        });
      });
      cy.get(`.${DOM_CLASSES.MODAL_EARNING_RATE}`).then(($earningRate) => {
        const text = $earningRate[0].innerText;
        expect(/[0-9]\%/g.test(text)).to.be.true;
      })
    });

    it('X 표시를 누르면 모달 창을 닫을 수 있다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      submitManualNumbers();
      typeResultNumbers([1, 2, 3, 4, 5, 6, 7]);

      cy.get(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`).click();
      cy.get(`.${DOM_CLASSES.MODAL_CLOSE}`).click();
      cy.get(`.${DOM_CLASSES.MODAL}`).should("not.be.visible");
    });

    it('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      submitManualNumbers();
      typeResultNumbers([1, 2, 3, 4, 5, 6, 7]);

      cy.get(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`).click();
      cy.get(`.${DOM_CLASSES.MODAL_RESTART_BUTTON}`).click();
      cy.get(`.${DOM_CLASSES.MODAL}`).should("not.be.visible");

      testChildNodeNotExist(`.${DOM_CLASSES.LOTTO_CONTAINER}`);
      testChildNodeNotExist(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`);
    });
  });
});

function typeAndClick(inputSelector, inputString, submitSelector) {
  cy.get(inputSelector).type(inputString);
  return cy.get(submitSelector).click();
}

function typeLottoNumbers(numberInputs, inputs) {
  [...numberInputs].forEach(($number, idx) => {
    cy.get($number).type(inputs[idx]);
  });
}

function submitManualNumbers() {
  cy.get(`.${DOM_CLASSES.BUYING_FORM_COUNT_SUBMIT}`).click();
  cy.get(`.${DOM_CLASSES.BUYING_FORM_MANUAL_PAPER}`).then($$papers => {
    [...$$papers].forEach($paper => {
      const numberInputs = $paper.querySelectorAll(`.${DOM_CLASSES.BUYING_FORM_MANUAL_NUMBER}`);
      typeLottoNumbers(numberInputs, [1, 2, 3, 4, 5, 6]);
    });
  });
  cy.get(`.${DOM_CLASSES.BUYING_FORM_NUMBER_SUBMIT}`).click();
}

function typeResultNumbers(inputs) {
  const LENGTH_LIMIT = LOTTO_SETTINGS.LOTTO_NUMBER_SIZE + LOTTO_SETTINGS.BONUS_NUMBER_SIZE;
  if (inputs.length !== LENGTH_LIMIT) {
    cy.log(`로또 숫자 갯수가 ${LENGTH_LIMIT}개가 아닙니다.`);
    return;
  }

  cy.get(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`).then($$numbers => {
    [...$$numbers].forEach(($number, idx) => {
      cy.get($number).type(inputs[idx]);
    });
  });
  cy.get(`.${DOM_CLASSES.RESULT_BONUS_NUMBER}`).type(inputs[inputs.length - 1]);
}

function testChildNodeNotExist(selector) {
  cy.get(selector).then(element => {
    expect(element[0].hasChildNodes()).to.be.false;
  });
}

function testChildNodeExist(selector) {
  cy.get(selector).then(element => {
    expect(element[0].hasChildNodes()).to.be.true;
  });
}
