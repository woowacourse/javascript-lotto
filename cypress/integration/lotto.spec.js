import { ALERT_MESSAGE, VALUE } from '../../src/js/constants.js';
import Lotto from '../../src/js/models/Lotto.js';

describe('LOTTO 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('구매할 금액을 입력한후 확인 버튼을 누르면 수동구매 폼이 나타난다.', () => {
    cy.get('.lotto-list-section').should('not.be.visible');
    cy.get('.winning-number-form-section').should('not.be.visible');

    // Note: Cypress 체크 시 autofocus가 잡히지 않는 문제가 있어 수동으로 focus를 잡아둠
    cy.get('#money-input').should('have.attr', 'autofocus', 'autofocus').focus();

    cy.focused().should('have.attr', 'id', 'money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-numbers-input-section').should('be.visible');
    cy.get('#lotto-numbers-input-first').should('be.focused');
    cy.get('.lotto-count').should('have.text', '10');

    cy.get('.lotto-list-section').should('be.visible');
    cy.get('.lotto').should('have.length', '0');

    cy.get('.winning-number-form-section').should('not.be.visible');
  })

  it('입력 란에 숫자를 입력하고 확인 버튼을 누르면, 로또 목록에 로또가 1개 추가 되고, 토글 버튼을 눌러 번호를 확인할 수 있다.', () => {
    const lottoNumbers = [10, 11, 30, 25, 21, 20];

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-number').each((lottoNumberInput, index) => {
      cy.wrap(lottoNumberInput)
        .should('have.value', '')
        .and('be.focused')
        .type(lottoNumbers[index]);
    });

    cy.get('#lotto-numbers-input-button').click();
    cy.get('.purchased-lotto-count').should('have.text', '1');
    cy.get('.lotto').should('have.length', '1');

    cy.get('#lotto-numbers-toggle').click();
    cy.get('.lotto-numbers').should('have.text', lottoNumbers.sort().join(', '));
  })

  it('자동구매 버튼을 누르면 남은 개수만큼의 로또가 자동으로 생성된다.', () => {
    const lottoNumbers = [10, 11, 30, 25, 21, 20];

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-number').each((lottoNumberInput, index) => {
      cy.wrap(lottoNumberInput)
        .should('have.value', '')
        .and('be.focused')
        .type(lottoNumbers[index]);
    });

    cy.get('#lotto-numbers-input-button').click();
    cy.get('.purchased-lotto-count').should('have.text', '1');
    cy.get('.lotto').should('have.length', '1');

    cy.get('#lotto-numbers-auto-button').click();
    cy.get('.purchased-lotto-count').should('have.text', '10');
    cy.get('.lotto').should('have.length', '10');

    cy.get('.lotto-numbers-input-section').should('not.be.visible');
  })

  it('각 로또 안의 번호가 6개의 숫자로 이루어져 있고, 중복되지 않았는지 확인한다.', () => {
    const lottoNumbers = [10, 11, 30, 25, 21, 20];

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-number').each((lottoNumberInput, index) => {
      cy.wrap(lottoNumberInput)
        .should('have.value', '')
        .and('be.focused')
        .type(lottoNumbers[index]);
    });

    cy.get('#lotto-numbers-input-button').click();

    cy.get('.lotto-numbers').each(($elem) => {
      const numbers = $elem
        .text()
        .split(',')
        .map((number) => number.trim());
      expect(numbers.length).to.be.eq(6);
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

  it('사용자가 5500 원을 입력하면 5개의 로또가 구매된다..', () => {
    cy.get('#money-input').type('5500');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-count').should('have.text', '5');
  });

  it('로또 구입 후, 당첨 번호를 입력하고 결과 확인하기 버튼을 누르면, 모달에서 당첨 개수와 총 수익률을 확인할 수 있다.', () => {
    const winningNumbers = [9, 11, 3, 25, 21, 2];

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();
    cy.get('#lotto-numbers-auto-button').click();

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
    cy.get('#lotto-numbers-auto-button').click();

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
    cy.get('#lotto-numbers-auto-button').click();

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
    cy.get('#lotto-numbers-auto-button').click();

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
        rank: VALUE.RANK.FIRST,
      },
      {
        sample: new Lotto([3, 9, 11, 20, 21, 45]),
        rank: VALUE.RANK.SECOND,
      },
      {
        sample: new Lotto([3, 9, 11, 20, 21, 44]),
        rank: VALUE.RANK.THIRD,
      },
      {
        sample: new Lotto([3, 9, 11, 20, 22, 44]),
        rank: VALUE.RANK.FOURTH,
      },
      {
        sample: new Lotto([3, 9, 11, 19, 22, 44]),
        rank: VALUE.RANK.FIFTH,
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
    cy.get('#lotto-numbers-auto-button').click();

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
});
