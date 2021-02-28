import {
  LOTTO_PRICE,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBERS_LENGTH,
  MONETARY_UNIT,
} from '../../src/js/constants/lottoRules.js';
import {
  PURCHASE_AMOUNT_ALERT_MESSAGE,
  PURCHASED_QUANTITY_MESSAGE,
  LOTTO_NUMBER_SEPARATOR,
  WINNING_NUMBER_CHECK_MESSAGE,
  MANUAL_SELECT_CHECK_MESSAGE,
  TICKET_ISSUE_CONFIRM_MESSAGE,
} from '../../src/js/constants/display.js';

describe('구매금액 입력 UI 검사', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('입력된 로또 구입 금액에 화폐단위 미만의 자릿수가 포함된 경우 alert을 띄우고 input창을 초기화한다.', () => {
    const invalidMoney = MONETARY_UNIT / 10;
    const { PURCHASE_AMOUNT_IS_INVALID_MONEY } = PURCHASE_AMOUNT_ALERT_MESSAGE;
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    cy.get('.purchase-amount-input').type(invalidMoney);
    cy.get('.purchase-amount-button')
      .click()
      .then(() => {
        const actualMessage = alertStub.getCall(0).lastArg;
        expect(actualMessage).to.equal(PURCHASE_AMOUNT_IS_INVALID_MONEY);
      });
    cy.get('.purchase-amount-input').should('have.text', '');
    cy.get('.purchase-amount-input').should('have.focus');
  });

  it('입력된 로또 구입 금액이 로또 한 장의 금액보다 적을 경우 alert을 띄우고 input창을 초기화한다.', () => {
    const tooLowAmount = Math.floor(LOTTO_PRICE * 0.9);
    const { PURCHASE_AMOUNT_IS_TOO_LOW } = PURCHASE_AMOUNT_ALERT_MESSAGE;
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    cy.get('.purchase-amount-input').type(tooLowAmount);
    cy.get('.purchase-amount-button')
      .click()
      .then(() => {
        const actualMessage = alertStub.getCall(0).lastArg;
        expect(actualMessage).to.equal(PURCHASE_AMOUNT_IS_TOO_LOW);
      });
    cy.get('.purchase-amount-input').should('have.text', '');
    cy.get('.purchase-amount-input').should('have.focus');
  });

  it('입력된 로또 구입 금액이 로또 한 장의 금액으로 나누어 떨어지지 않을 경우 alert으로 거스름돈 금액을 알려주고 구입금액 입력을 비활성화한다.', () => {
    const amountWithChange = Math.ceil(LOTTO_PRICE * 1.1);
    const { PURCHASE_AMOUNT_HAS_CHANGE } = PURCHASE_AMOUNT_ALERT_MESSAGE;
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    cy.get('.purchase-amount-input').type(amountWithChange);
    cy.get('.purchase-amount-button')
      .click()
      .then(() => {
        const change = amountWithChange % LOTTO_PRICE;
        const actualMessage = alertStub.getCall(0).lastArg;
        expect(actualMessage).to.equal(PURCHASE_AMOUNT_HAS_CHANGE(change));
      });
    cy.get('.purchase-amount-button').should('be.disabled');
  });
});

describe('수동/자동구매 UI 검사', () => {
  const numOfLotto = 5;
  const summary = ({ auto, manual }) => `· 자동: ${auto} 장
  · 수동: ${manual} 장`;

  before(() => {
    cy.visit('http://localhost:5500/');
  });

  it('정상적인 로또구입 금액을 투입하면, 로또 발급버튼, 로또용지 추가버튼이 표시된다.', () => {
    cy.get('.purchase-option-section').should('not.be.visible');
    cy.get('.ticket-issue-button').should('not.be.visible');
    cy.get('.paper-add-button').should('not.be.visible');

    cy.get('.purchase-amount-input')
      .type(LOTTO_PRICE * numOfLotto)
      .type('{enter}');

    cy.get('.ticket-issue-button').should('be.visible').should('not.be.disabled');
    cy.get('.paper-add-button').should('be.visible').should('not.be.disabled');
  });

  it('정상적인 로또구입 금액을 투입하면, 전체 자동구매 수량을 기본값으로 해서 화면에 표시된다.', () => {
    cy.get('.purchase-option-section').should('be.visible');
    cy.get('.auto-quantity').should('have.text', numOfLotto);
    cy.get('.manual-quantity').should('have.text', 0);
  });

  let numOfManualSelect = 0;

  it('로또용지 추가버튼을 누를 때마다 로또번호 선택용지가 한 장씩 화면에 추가된다.', () => {
    numOfManualSelect = 1;
    cy.get('.paper-add-button').click();
    cy.get('.manual-select-paper').should('have.length', numOfManualSelect);
    cy.get('.auto-quantity').should('have.text', numOfLotto - numOfManualSelect);
    cy.get('.manual-quantity').should('have.text', numOfManualSelect);

    numOfManualSelect = 2;
    cy.get('.paper-add-button').click();
    cy.get('.manual-select-paper').should('have.length', numOfManualSelect);
    cy.get('.auto-quantity').should('have.text', numOfLotto - numOfManualSelect);
    cy.get('.manual-quantity').should('have.text', numOfManualSelect);
  });

  it('자동구매 수량이 남아있을 경우, 적용수량을 증가시켜 수동구매로 추가전환할 수 있다.', () => {
    cy.get('.quantity-select')
      .first()
      .select(`${1 + numOfLotto - numOfManualSelect}장`);
    cy.get('.auto-quantity').should('have.text', 0);
    cy.get('.manual-quantity').should('have.text', numOfLotto);
  });

  it('남은 자동구매 수량이 0매일 경우, 로또용지 추가버튼이 비활성화된다.', () => {
    cy.get('.paper-add-button').should('be.disabled');
  });

  it('로또용지 삭제버튼을 누를 경우, 해당 로또용지가 화면에서 사라지고 해당 적용수량은 자동구매로 전환된다.', () => {
    cy.get('.manual-select-paper').should('have.length', numOfManualSelect);
    cy.get('.paper-remove-button').first().click();
    numOfManualSelect = 1;
    cy.get('.auto-quantity').should('have.text', numOfLotto - numOfManualSelect);
    cy.get('.manual-quantity').should('have.text', numOfManualSelect);
  });

  it('로또용지에서 6개 보다 적게 고를 경우, 상태메세지가 화면에 표시되고 로또 발급버튼이 비활성화된다.', () => {
    cy.get('.manual-select-check-message').should('have.text', MANUAL_SELECT_CHECK_MESSAGE(6));
    cy.get('.ticket-issue-button').should('be.disabled');

    cy.get('.select-paper input').eq(0).click().should('be.checked');
    cy.get('.manual-select-check-message').should('have.text', MANUAL_SELECT_CHECK_MESSAGE(5));
    cy.get('.select-paper input').eq(1).click().should('be.checked');
    cy.get('.manual-select-check-message').should('have.text', MANUAL_SELECT_CHECK_MESSAGE(4));
    cy.get('.select-paper input').eq(2).click().should('be.checked');
    cy.get('.manual-select-check-message').should('have.text', MANUAL_SELECT_CHECK_MESSAGE(3));
    cy.get('.select-paper input').eq(3).click().should('be.checked');
    cy.get('.manual-select-check-message').should('have.text', MANUAL_SELECT_CHECK_MESSAGE(2));
    cy.get('.select-paper input').eq(4).click().should('be.checked');
    cy.get('.manual-select-check-message').should('have.text', MANUAL_SELECT_CHECK_MESSAGE(1));
    cy.get('.select-paper input').eq(5).click().should('be.checked');
    cy.get('.manual-select-check-message').should('have.text', '');
  });

  it('로또 발급하기 버튼을 누를 경우, 자동/수동구매 수량이 적힌 컨펌메세지가 표시된다.', () => {
    const confirmStub = cy.stub();

    cy.on('window:confirm', confirmStub);
    cy.get('.ticket-issue-button')
      .should('not.be.disabled')
      .click()
      .then(() => {
        const actualMessage = confirmStub.getCall(0).lastArg;
        expect(actualMessage).to.equal(TICKET_ISSUE_CONFIRM_MESSAGE(numOfLotto - numOfManualSelect, numOfManualSelect));
      });
  });

  it('로또 발급 컨펌메세지에서 "취소"를 선택할 경우, 로또가 발급되지 않는다.', () => {
    cy.contains('취소').click();
    cy.get('.purchased-lotto-section').should('not.be.visible');
    cy.get('.ticket-issue-button').should('not.be.visible');
  });

  it('로또 발급 컨펌메세지에서 "확인"을 선택할 경우, 발급된 로또가 화면에 표시된다.', () => {
    cy.get('.ticket-issue-button').click();
    cy.contains('확인').click();
    cy.get('.purchase-option-section').should('be.visible');
    cy.get('.purchased-lotto-section').should('be.visible');
  });

  it('로또를 발급한 경우, 사용한 로또용지와 로또용지 추가버튼을 화면에서 숨기고, 로또발급하기 버튼을 비활성화된다.', () => {
    cy.get('.paper-add-button').should('not.be.visible');
    cy.get('.manual-select-paper').forEach(($el) => cy.wrap($el).should('not.be.visible'));
    cy.get('.ticket-issue-button').should('be.disabled');
  });
});

describe('발급한 로또 UI 검사', () => {
  const numOfLotto = 3;

  before(() => {
    cy.visit('http://localhost:5500/');
  });

  it('로또 발급하기 버튼을 누르면, 자동 또는 수동 구매로 발급한 로또를 화면에 표시한다.', () => {
    cy.get('.purchase-amount-input')
      .type(LOTTO_PRICE * numOfLotto)
      .type('{enter}');
    cy.get('.purchased-lotto-section').should('be.visible');
    cy.get('.purchased-lotto-label').should('have.text', PURCHASED_QUANTITY_MESSAGE(numOfLotto));
    cy.get('.lotto-ticket-container > li').should('have.length', numOfLotto);
    cy.get('.lotto-numbers-toggle-button').should('not.be.checked');
  });

  it('번호보기 토글이 비활성화 되어 있는 상태에서 토글을 누르면, 로또 아이콘이 세로로 배치되고 로또 번호가 표시된다.', () => {
    cy.get('.switch').click();
    cy.get('.lotto-numbers-toggle-button').should('be.checked');
    cy.get('.lotto-ticket-container').should('have.css', 'flex-direction', 'column');
    cy.get('.lotto-numbers').should('be.visible');
  });

  it('표시된 로또 번호의 개수, 중복여부, 범위를 검사한다.', () => {
    cy.get('.lotto-numbers').each(($el) => {
      const lottoNumbers = $el.text().split(LOTTO_NUMBER_SEPARATOR);

      expect(lottoNumbers.length).to.be.equal(LOTTO_NUMBERS_LENGTH);
      expect(lottoNumbers.length).to.be.equal(new Set(lottoNumbers).size);
      lottoNumbers.forEach((lottoNumber) => {
        expect(Number(lottoNumber)).to.be.within(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER);
      });
    });
  });

  it('로또를 재구입하면 기존에 구매한 로또를 삭제하고 새로 구매한 로또를 보여준다.', () => {
    const nextNumOfLotto = numOfLotto * 2;

    cy.get('.purchase-amount-input')
      .clear()
      .type(LOTTO_PRICE * nextNumOfLotto);
    cy.get('.purchase-amount-button').click();
    cy.get('.lotto-ticket-container > li').should('have.length', nextNumOfLotto);
  });

  it('번호보기 토글이 활성화된 상태에서 재구입을 하면, 토글 상태가 변하지 않고 새로 구매한 로또번호를 보여준다.', () => {
    cy.get('.lotto-numbers-toggle-button').should('be.checked');
    cy.get('.lotto-numbers').should('be.visible');
  });

  it('번호보기 토글이 활성화된 상태에서 토글을 누르면, 로또 아이콘이 가로로 배치되고 로또 번호가 사라진다.', () => {
    cy.get('.switch').click();
    cy.get('.lotto-numbers-toggle-button').should('not.be.checked');
    cy.get('.purchased-lotto-section').should('not.have.css', 'flex-direction', 'column');
    cy.get('.lotto-numbers').should('not.be.visible');
  });
});

describe('당첨번호 입력 UI 검사', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
    cy.get('.purchase-amount-input').type(LOTTO_PRICE).type('{enter}');
    cy.get('.ticket-issue-button').click();
    cy.contains('확인');
  });

  it('로또를 발급하면 당첨번호를 입력할 수 있는 창이 표시된다.', () => {
    cy.get('.winning-number-form').should('be.visible');
  });

  it('6개의 당첨번호와 1개의 보너스번호가 모두 정상입력되기 전까지 결과확인하기 버튼이 비활성화 되어 있다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const { HAS_BLANK } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number').first().should('have.focus');
    cy.get('.open-result-modal-button').should('be.disabled');
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
      cy.get('.open-result-modal-button').should('be.disabled');
      cy.get('.winning-number-check-message').should('have.text', HAS_BLANK);
      cy.get('.winning-number-check-message').should('have.class', 'text-red');
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.open-result-modal-button').should('not.be.disabled');
  });

  it('입력된 번호가 1 ~ 45 범위가 아니면, 입력칸 하단에 재입력 요청 메세지를 표시한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const invalidBonusNumber = 77;
    const { OUT_OF_RANGE } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(invalidBonusNumber);
    cy.get('.winning-number-check-message').should('have.text', OUT_OF_RANGE);
    cy.get('.winning-number-check-message').should('have.class', 'text-red');
  });

  it('입력된 번호에 중복된 값이 있으면, 입력칸 하단에 재입력 요청 메세지를 표시한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 6;
    const { DUPLICATED } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.winning-number-check-message').should('have.text', DUPLICATED);
    cy.get('.winning-number-check-message').should('have.class', 'text-red');
  });

  it('모든 번호가 올바르게 입력되면, 입력칸 하단에 결과 확인 가능 메세지를 표시한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const { FULFILLED } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.winning-number-check-message').should('have.text', FULFILLED);
    cy.get('.winning-number-check-message').should('have.class', 'text-green');
  });

  it('모든 번호가 올바르게 입력된 후에 입력한 숫자를 지우면, 입력칸 하단에 재입력 요청 메세지를 표시한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const { HAS_BLANK } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.bonus-number').type('{backspace}');
    cy.get('.winning-number-check-message').should('have.text', HAS_BLANK);
    cy.get('.winning-number-check-message').should('have.class', 'text-red');
  });
});

describe('당첨 결과 모달 UI 검사', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  const winningNumber = {
    winningNumbers: [1, 2, 3, 4, 5, 6],
    bonusNumber: 7,
  };

  it('로또 구매 및 당첨번호 입력을 마치고 결과확인 버튼을 클릭하면 당첨 결과 모달이 표시된다.', () => {
    const { winningNumbers, bonusNumber } = winningNumber;

    cy.get('.purchase-amount-input').type(LOTTO_PRICE).type('{enter}');
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.open-result-modal-button').click();
    cy.get('.modal').should('be.visible');
  });

  it('다시 시작하기 버튼을 클릭하면, 모달이 사라지고 화면이 초기화된다.', () => {
    cy.get('.reset-button').click();
    cy.get('.modal').should('not.be.visible');
    cy.get('.purchased-lotto-section').should('not.be.visible');
    cy.get('.winning-number-form').should('not.be.visible');
    cy.get('.purchase-amount-input').should('have.text', '');
    cy.get('.lotto-numbers-toggle-button').should('not.be.checked');
    cy.get('.winning-number').each(($el) => {
      cy.wrap($el).should('have.text', '');
    });
  });
});
