/// <reference types="cypress" />
import Lotto from "../../src/js/models/Lotto.js";
import { ALERT_MESSAGES } from '../../src/js/utils/constants/alert.js';
import { LOTTO_SETTINGS } from '../../src/js/utils/constants/settings.js';
import { DOM_CLASSES } from '../../src/js/utils/constants/dom.js';
import { getRandomNumber } from '../../src/js/utils/util.js';

//TODO 종속적인 요소들 밖으로 빼기
const COMMON_MONEY_INPUT = 5000;
const COMMON_MANUAL_AMOUNT = 2;
const ZERO_AMOUNT_INPUT = 0;
const SUCCESS_INPUT = {
  AUTO_AMOUNT: 2,
  MANUAL_SELECT_NUMBERS: [
    1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12
  ],
  RESULT_WINNING_NUMBER: [1, 2, 3, 4, 5, 6],
  RESULT_BONUS_NUMBER: 7,
}
const ERROR_INPUT = {
  NOT_INTEGER_MONEY: 5000.5,
  SHORT_MONEY: 500,
  MANUAL_SELECT_NUMBERS_DUPLICATED: [
    1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 11
  ],
  MANUAL_SELECT_NUMBERS_OUT_OF_RANGE: [
    1, 2, 3, 4, 5, 6,
    46, -1, 9, 10, 11, 12
  ],
  CANT_BUY_AMOUNT_MANUAL: 6,
  CANT_BUT_AMOUNT_AUTO: 6,
}

context('로또 UI 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  describe('금액 입력 부분', () => {
    it('로또 구입 금액을 입력하면, 수동과 자동 구입 갯수 입력부가 표시된다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      testChildNodeExistence(`.${DOM_CLASSES.LOTTO_AMOUNT_CONTAINER}`, true);
    });
    it('입력받는 구입 금액은 최소 1000원 이상이어야 한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, ERROR_INPUT.SHORT_MONEY, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`)
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.UNDER_MIN_PRICE);
        });
    });
    it('입력받는 구입 금액은 정수여야한다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, ERROR_INPUT.NOT_INTEGER_MONEY, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      testChildNodeExistence(`.${DOM_CLASSES.LOTTO_CONTAINER}`, false);
    });
    it('로또 구입 금액을 입력받으면, 구입 버튼이 비활성화된다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      cy.get(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).should('be.disabled');
    });
  });

  describe('수동 and 자동 구입 갯수 입력 부분', () => {
    it('자동과 수동 구매 갯수 전부 입력하여야 다음 단계로 진행할 수 있다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      click(`.${DOM_CLASSES.LOTTO_AMOUNT_SUBMIT}`);
      testChildNodeExistence(`.${DOM_CLASSES.MANUAL_SELECT_CONTAINER}`, false);
    })
    it('로또 총 구입 갯수는 반드시 1개 이상이어야 한다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);

      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_MANUAL}`, ZERO_AMOUNT_INPUT);
      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_AUTO}`, ZERO_AMOUNT_INPUT);
      click(`.${DOM_CLASSES.LOTTO_AMOUNT_SUBMIT}`).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.UNDER_MIN_AMOUNT_TO_BUY);
      });
    });

    it('소비자는 수동 구매를 할 수 있어야 한다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);

      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_MANUAL}`, COMMON_MANUAL_AMOUNT);
      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_AUTO}`, ZERO_AMOUNT_INPUT);
      click(`.${DOM_CLASSES.LOTTO_AMOUNT_SUBMIT}`);

      typeNumbers(`.${DOM_CLASSES.MANUAL_SELECT_FORM}`, SUCCESS_INPUT.MANUAL_SELECT_NUMBERS);
      click(`.${DOM_CLASSES.MANUAL_SELECT_SUBMIT}`);

      cy.get(`.${DOM_CLASSES.LOTTO_CONTAINER} .${DOM_CLASSES.LOTTO_TICKET}`).then(elements => {
        expect(elements.length).to.equal(COMMON_MANUAL_AMOUNT);
      })
    });
    it('소비자는 자동 구매를 할 수 있어야한다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);

      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_MANUAL}`, COMMON_MANUAL_AMOUNT);
      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_AUTO}`, SUCCESS_INPUT.AUTO_AMOUNT);
      click(`.${DOM_CLASSES.LOTTO_AMOUNT_SUBMIT}`);

      typeNumbers(`.${DOM_CLASSES.MANUAL_SELECT_FORM}`, SUCCESS_INPUT.MANUAL_SELECT_NUMBERS);
      click(`.${DOM_CLASSES.MANUAL_SELECT_SUBMIT}`);

      cy.get(`.${DOM_CLASSES.LOTTO_CONTAINER} .${DOM_CLASSES.LOTTO_TICKET}`).then(elements => {
        expect(elements.length).to.equal(COMMON_MANUAL_AMOUNT + SUCCESS_INPUT.AUTO_AMOUNT);
      })
    });
    it('자동과 수동으로 구매하는 로또 구입 비용이 가진 금액을 넘어서는 안된다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_MANUAL}`, ERROR_INPUT.CANT_BUY_AMOUNT_MANUAL);
      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_AUTO}`, ERROR_INPUT.CANT_BUT_AMOUNT_AUTO);
      click(`.${DOM_CLASSES.LOTTO_AMOUNT_SUBMIT}`).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.CANT_BUY_AMOUNT);
      });
    });
    it('수동으로 구매하는 로또 수량이 없을 시 번호 수동 선택 창은 스킵한다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);

      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_MANUAL}`, ZERO_AMOUNT_INPUT);
      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_AUTO}`, SUCCESS_INPUT.AUTO_AMOUNT);
      click(`.${DOM_CLASSES.LOTTO_AMOUNT_SUBMIT}`);

      testChildNodeExistence(`.${DOM_CLASSES.MANUAL_SELECT_CONTAINER}`, false);
    });
  });

  describe('수동 로또 번호 선택 부분', () => {
    it('수동으로 구매하는 각 로또 내에서 번호의 중복이 있어서는 안된다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_MANUAL}`, COMMON_MANUAL_AMOUNT);
      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_AUTO}`, SUCCESS_INPUT.AUTO_AMOUNT);
      click(`.${DOM_CLASSES.LOTTO_AMOUNT_SUBMIT}`);

      typeNumbers(`.${DOM_CLASSES.MANUAL_SELECT_FORM}`, ERROR_INPUT.MANUAL_SELECT_NUMBERS_DUPLICATED);
      click(`.${DOM_CLASSES.MANUAL_SELECT_SUBMIT}`);

      testChildNodeExistence(`.${DOM_CLASSES.LOTTO_CONTAINER}`, false);
    });
    it('수동으로 구매하는 로또 번호는 1~45 사이의 숫자를 가진다.', () => {
      typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);

      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_MANUAL}`, COMMON_MANUAL_AMOUNT);
      type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_AUTO}`, SUCCESS_INPUT.AUTO_AMOUNT);
      click(`.${DOM_CLASSES.LOTTO_AMOUNT_SUBMIT}`);

      typeNumbers(`.${DOM_CLASSES.MANUAL_SELECT_FORM}`, ERROR_INPUT.MANUAL_SELECT_NUMBERS_OUT_OF_RANGE);
      click(`.${DOM_CLASSES.MANUAL_SELECT_SUBMIT}`);

      testChildNodeExistence(`.${DOM_CLASSES.LOTTO_CONTAINER}`, false);
    });
  });

  describe('구입한 로또 확인 부분', () => {
    it('번호 보기 토글 버튼을 클릭하면, 복권 번호가 화면에 표시된다.', () => {
      jumpToResultInputUI();
      cy.get(`.${DOM_CLASSES.LOTTO_SWITCH}`).click();
      cy.get(`.${DOM_CLASSES.LOTTO_TICKET_NUMBER}`).should('have.length', COMMON_MANUAL_AMOUNT + SUCCESS_INPUT.AUTO_AMOUNT);
      cy.get(`.${DOM_CLASSES.LOTTO_TICKET_NUMBER}`).should('be.visible');
      cy.get(`.${DOM_CLASSES.LOTTO_SWITCH}`).click();
      cy.get(`.${DOM_CLASSES.LOTTO_TICKET_NUMBER}`).should('not.be.visible');
    });
  });

  describe('로또 당첨 번호 입력 부분', () => {
    it('로또 구입에 필요한 정보를 모두 입력하면 로또 당첨 번호 입력부가 표시된다.', () => {
      jumpToResultInputUI();
      cy.get(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`).should('be.visible');
    });
    it('결과 확인하기 버튼을 누르면 당첨 통계 모달창을 띄운다.', () => {
      jumpToResultInputUI();
      typeResultNumbers(SUCCESS_INPUT.RESULT_WINNING_NUMBER, SUCCESS_INPUT.RESULT_BONUS_NUMBER);
      click(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`);
      cy.get(`.${DOM_CLASSES.MODAL}`).should("be.visible");
    })
    it('당첨 번호와 보너스 번호를 입력하여야만 결과를 확인할 수 있다.', () => {
      jumpToResultInputUI();
      click(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`);
      cy.get(`.${DOM_CLASSES.MODAL}`).should("not.be.visible");
    });
    it('당첨 번호와 보너스 번호는 중복이 있어서는 안된다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      jumpToResultInputUI();
      typeResultNumbers([5, 5, 5, 5, 5, 5], 5);
      click(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.DUPLICATED_NUMBERS_EXIST);
      });
    });
    it('당첨 번호와 보너스 번호는 1~45의 숫자를 가진다.', () => {
      jumpToResultInputUI();
      typeResultNumbers([55, 65, 75, 85, 95, 105], 115);
      click(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`)
      cy.get(`.${DOM_CLASSES.MODAL}`).should('not.be.visible');
    });
  });

  describe('당첨 통계 부분', () => {
    it('당첨 통계에서는 당첨 갯수와 수익률을 확인할 수 있다.', () => {
      jumpToResultInputUI();
      typeResultNumbers(SUCCESS_INPUT.RESULT_WINNING_NUMBER, SUCCESS_INPUT.RESULT_BONUS_NUMBER);

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
      jumpToResultInputUI();
      typeResultNumbers(SUCCESS_INPUT.RESULT_WINNING_NUMBER, SUCCESS_INPUT.RESULT_BONUS_NUMBER);

      cy.get(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`).click();
      cy.get(`.${DOM_CLASSES.MODAL_CLOSE}`).click();
      cy.get(`.${DOM_CLASSES.MODAL}`).should("not.be.visible");
    });
    it('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
      jumpToResultInputUI();
      typeResultNumbers(SUCCESS_INPUT.RESULT_WINNING_NUMBER, SUCCESS_INPUT.RESULT_BONUS_NUMBER);

      cy.get(`.${DOM_CLASSES.RESULT_INPUT_SUBMIT}`).click();
      cy.get(`.${DOM_CLASSES.MODAL_RESTART_BUTTON}`).click();
      cy.get(`.${DOM_CLASSES.MODAL}`).should("not.be.visible");

      testChildNodeExistence(`.${DOM_CLASSES.LOTTO_AMOUNT_CONTAINER}`, false);
      testChildNodeExistence(`.${DOM_CLASSES.MANUAL_SELECT_CONTAINER}`, false);
      testChildNodeExistence(`.${DOM_CLASSES.LOTTO_CONTAINER}`, false);
      testChildNodeExistence(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`, false);
    });
  });
});

context('로또 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });
  it('로또 자동 구매 시, 1 ~ 45 중 중복 없이 무작위 6개 숫자를 뽑아 저장한다.', () => {
    const lotto = new Lotto();
    lotto.setNumbersByAuto();
    const amountTestSet = new Set(lotto.getNumbers());
    expect(amountTestSet.size === LOTTO_SETTINGS.LOTTO_NUMBER_SIZE).to.equal(true);

    for (let i = LOTTO_SETTINGS.MIN_LOTTO_NUMBER; i <= LOTTO_SETTINGS.MAX_LOTTO_NUMBER; i++) {
      const randomNumber = getRandomNumber(LOTTO_SETTINGS.MIN_LOTTO_NUMBER, i);
      expect(randomNumber >= LOTTO_SETTINGS.MIN_LOTTO_NUMBER && randomNumber <= i).to.equal(true);
    }
  });
});

function typeAndClick(inputSelector, inputString, submitSelector) {
  type(inputSelector, inputString);
  return click(submitSelector);
}

function click(selector) {
  return cy.get(selector).click();
}

function type(selector, inputString) {
  return cy.get(selector).type(inputString);
}

function typeResultNumbers([...lottoNumbers], bonusNumber) {
  if (lottoNumbers.length !== LOTTO_SETTINGS.LOTTO_NUMBER_SIZE) {
    cy.log(`당첨번호 입력이 ${LOTTO_SETTINGS.LOTTO_NUMBER_SIZE}개가 아닙니다.`);
    return;
  }
  typeNumbers(`.${DOM_CLASSES.RESULT_INPUT_FORM}`, lottoNumbers.concat(bonusNumber));
}

function typeNumbers(targetSelector, inputs) {
  cy.get(`${targetSelector} input`).then($$numbers => {
    [...$$numbers].forEach(($number, idx) => {
      if (!inputs[idx]) {
        cy.log("input tag에 비해 입력 데이터가 부족합니다");
        return;
      }
      type($number, inputs[idx]);
    })
  });
}

function testChildNodeExistence(selector, existenceToExpect) {
  cy.get(selector).then(element => {
    expect(element[0].hasChildNodes()).be.equal(existenceToExpect);
  });
}

function jumpToResultInputUI() {
  typeAndClick(`.${DOM_CLASSES.MONEY_FORM_INPUT}`, COMMON_MONEY_INPUT, `.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
  type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_MANUAL}`, COMMON_MANUAL_AMOUNT);
  type(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_AUTO}`, SUCCESS_INPUT.AUTO_AMOUNT);
  click(`.${DOM_CLASSES.LOTTO_AMOUNT_SUBMIT}`);
  typeNumbers(`.${DOM_CLASSES.MANUAL_SELECT_FORM}`, SUCCESS_INPUT.MANUAL_SELECT_NUMBERS);
  click(`.${DOM_CLASSES.MANUAL_SELECT_SUBMIT}`);
}
