import { ALERT_MESSAGE } from '../../src/js/constants.js';
import Lotto from '../../src/js/objects/Lotto.js';

describe('LOTTO 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('사용자가 로또 구입 금액을 입력하고 확인 버튼을 누르면 금액에 맞는 로또가 화면에 보여진다.', () => {
    cy.get('.lotto-list-section').should('not.be.visible');
    cy.get('.winning-number-form-section').should('not.be.visible');

    // Note: Cypress 체크 시 autofocus가 잡히지 않는 문제가 있어 수동으로 focus를 잡아둠
    cy.get('#money-input').should('have.attr', 'autofocus', 'autofocus').focus();

    cy.focused().should('have.attr', 'id', 'money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-list-section').should('be.visible');
    cy.get('.winning-number-form-section').should('be.visible');

    cy.get('.lotto-count').should('have.text', '10');
    cy.get('.lotto').should('have.length', '10');

    cy.get('.winning-number').first().should('be.focused');
  });

  it('사용자가 토글 버튼을 누르면 로또의 번호를 볼 수 있다.', () => {
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();
    cy.get('#lotto-numbers-toggle').click();

    cy.get('.lotto-numbers').each(($elem) => {
      const numbers = $elem
        .text()
        .split(',')
        .map((number) => number.trim());
      expect(numbers.length).to.be.eq(6);

      numbers.forEach((_number) => {
        const number = Number(_number);
        expect(number).to.be.at.least(1);
        expect(number).to.be.at.most(45);
      });
    });
  });

  it('각 로또 안의 번호가 중복되지 않았는지 확인한다.', () => {
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();
    cy.get('#lotto-numbers-toggle').click();

    cy.get('.lotto-numbers').each(($elem) => {
      const numbers = $elem
        .text()
        .split(',')
        .map((number) => number.trim());
      const numbersSet = new Set(numbers);
      expect(numbers.length).to.be.eq(numbersSet.size);
    });
  });

  it('사용자가 0원을 입력하면 경고창을 띄운다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#money-input').type('0');
    cy.get('#money-submit-button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_MONEY_INPUT);
      });
  });

  it('사용자가 5500 원을 입력하면 화면에 로또가 5개 보여진다.', () => {
    cy.get('#money-input').type('5500');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-list').children().should('have.length', 5);
  });

  it('로또 구입 후, 당첨 번호를 입력하고 결과 확인하기 버튼을 누르면, 모달에서 당첨 개수와 총 수익률을 확인할 수 있다.', () => {
    const winningNumbers = [9, 11, 3, 25, 21, 2];
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.winning-number').each((winningNumberInput, index) => {
      cy.wrap(winningNumberInput).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(45);
    cy.get('.open-result-modal-button').click();

    cy.get('.modal').should('be.visible');

    cy.get('.winning-count').each((count) => {
      cy.wrap(count)
        .invoke('text')
        .should('match', /^[0-9]+$/);
    });

    cy.get('.winning-rate')
      .first()
      .invoke('text')
      .should('match', /^[0-9]+\.[0-9]+$/);
  });

  it('다시 시작하기 버튼을 눌렀을 때, 구입할 금액 입력 폼만 보이는지 확인한다.', () => {
    const winningNumbers = [9, 11, 3, 25, 21, 2];
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.winning-number').each((winningNumberInput, index) => {
      cy.wrap(winningNumberInput).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(45);
    cy.get('.open-result-modal-button').click();

    cy.get('.modal').should('be.visible');

    cy.get('.restart-button').click();

    cy.get('#money-input').should('have.value', '').and('be.focused');
    cy.get('.lotto-list-section').should('not.be.visible');
    cy.get('.winning-number-form-section').should('not.be.visible');
    cy.get('.modal').should('not.be.visible');
  });

  it('닫기 버튼을 눌렀을 때, 모달이 잘 닫히는지 확인한다.', () => {
    const winningNumbers = [9, 11, 3, 25, 21, 2];
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.winning-number').each((winningNumberInput, index) => {
      cy.wrap(winningNumberInput).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(45);
    cy.get('.open-result-modal-button').click();

    cy.get('.modal').should('be.visible');
    cy.get('.modal-close').click();

    cy.get('.modal').should('not.be.visible');
  });

  it('당첨 번호를 입력할 때, 2자리 숫자가 입력되면, 자동으로 다음 폼으로 focus되는지 확인한다.', () => {
    const winningNumbers = [10, 11, 30, 25, 21, 20];
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.winning-number').each((winningNumberInput, index) => {
      cy.wrap(winningNumberInput)
        .should('have.value', '')
        .and('be.focused')
        .type(winningNumbers[index]);
    });
    cy.get('.bonus-number').should('have.value', '').and('be.focused').type(45);
  });

  it('(Assertion) 로또 번호와 당첨 번호를 비교하여 일치하는 갯수가 정확하게 나오는지 확인한다.', () => {
    const winningNumbers = [3, 9, 11, 20, 21, 25];
    const bonusNumber = 45;

    const lottos = [
      {
        sample: new Lotto([3, 9, 11, 20, 21, 25]),
        rank: 'first',
      },
      {
        sample: new Lotto([3, 9, 11, 20, 21, 45]),
        rank: 'second',
      },
      {
        sample: new Lotto([3, 9, 11, 20, 21, 44]),
        rank: 'third',
      },
      {
        sample: new Lotto([3, 9, 11, 20, 22, 44]),
        rank: 'fourth',
      },
      {
        sample: new Lotto([3, 9, 11, 19, 22, 44]),
        rank: 'fifth',
      },
    ];

    lottos.forEach(({ sample, rank }) => {
      expect(sample.getWinningRank(winningNumbers, bonusNumber)).to.be.equal(rank);
    });
  });

  it('입력된 당첨 번호가 중복되면 경고창을 띄운다.', () => {
    const winningNumbers = [9, 11, 9, 1, 21, 45];
    const bonusNumber = 10;
    const alertStub = cy.stub();

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.winning-number').each((winningNumberInput, index) => {
      cy.wrap(winningNumberInput).type(winningNumbers[index]);
    });

    cy.get('.bonus-number').type(bonusNumber);

    cy.on('window:alert', alertStub);
    cy.get('.open-result-modal-button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_WINNING_NUMBER_INPUT);
      });
  });

  it('구입할 금액 입력 후, 로또를 수동 구매하면 구입한 로또 목록에 해당 로또가 추가된다.', () => {
    const lottoNumbers = [3, 9, 11, 20, 21, 25];

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-number').each((lottoNumberInput, index) => {
      cy.wrap(lottoNumberInput).type(lottoNumbers[index]);
    });

    cy.get('#lotto-number-form').submit();

    cy.get('.lotto-count').should('have.value', '1');
    cy.get('.lotto .lotto-numbers').should('have.value', lottoNumbers.join(', '));
  });

  it('구입할 수 있는 로또 개수의 개수가 0개이면 수동 구매 폼과 자동 구매 버튼이 비활성화된다.', () => {
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('#auto-purchase-button').click();

    cy.get('.lotto-number').each((lottoNumberInput) => {
      cy.wrap(lottoNumberInput).should('be.disabled');
    });

    cy.get('#purchase-button').should('be.disabled');
  });

  it('나머지 자동 구매 버튼을 클릭하면 구입할 수 있는 로또의 개수만큼 자동 구매되어 구입한 로또 목록에 추가된다.', () => {
    const lottoNumbers = [3, 9, 11, 20, 21, 25];

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-number').each((lottoNumberInput, index) => {
      cy.wrap(lottoNumberInput).type(lottoNumbers[index]);
    });

    cy.get('#lotto-number-form').submit();
    cy.get('#auto-purchase-button').click();

    cy.get('.lotto').should('have.length', '10');
  });

  it('입력된 수동 구매 번호가 1 ~ 45 사이의 숫자가 아니면, 경고창을 띄운다.', () => {
    const alertStub = cy.stub();
    const lottoNumbers = [3, 9, 11, 20, 21, 46];

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-number').each((lottoNumberInput, index) => {
      cy.wrap(lottoNumberInput).type(lottoNumbers[index]);
    });

    cy.on('window:alert', alertStub);
    cy.get('.open-result-modal-button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_WINNING_NUMBER_INPUT);
      });
  });

  it('입력된 수동 구매 번호가 중복된 번호가 있으면, 경고창을 띄운다.', () => {
    const alertStub = cy.stub();
    const lottoNumbers = [3, 9, 11, 20, 20, 46];

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-number').each((lottoNumberInput, index) => {
      cy.wrap(lottoNumberInput).type(lottoNumbers[index]);
    });

    cy.on('window:alert', alertStub);
    cy.get('.open-result-modal-button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_WINNING_NUMBER_INPUT);
      });
  });
});
