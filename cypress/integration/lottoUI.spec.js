import {
  LOTTO_PRICE,
  PURCHASED_QUANTITY_MESSAGE,
  LOTTO_NUMBER_SEPARATOR,
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBERS_LENGTH,
  MONETARY_UNIT,
  PURCHASE_AMOUNT_ALERT_MESSAGE,
  WINNING_NUMBER_CHECK_MESSAGE,
} from '../../src/js/constants.js';

describe('구매금액 입력 검사', () => {
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

  it('입력된 로또 구입 금액이 로또 한 장의 금액으로 나누어 떨어지지 않을 경우 alert으로 거스름돈 금액을 알려주고 구매한 로또를 표시한다.', () => {
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
    cy.get('.purchased-lotto-section').should('be.visible');
  });
});

describe('구매한 로또 UI 검사', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  const numOfLotto = 3;

  it('Enter키 이벤트로 로또를 구입한 후 입력된 로또 구입 금액으로 발급한 로또를 화면에 표시한다.', () => {
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

describe('당첨번호 입력 검사', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
    cy.get('.purchase-amount-input').type(LOTTO_PRICE).type('{enter}');
  });

  it('로또를 구매하면 당첨번호를 입력할 수 있는 창이 표시된다.', () => {
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
    const { COMPLETED } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.winning-number-check-message').should('have.text', COMPLETED);
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
