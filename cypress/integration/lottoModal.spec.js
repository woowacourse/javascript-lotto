import { VALUES } from '../../src/js/constants.js';
import Lotto from '../../src/js/models/Lotto.js';

describe('LOTTO 모달 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
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

  it('(Assertion) 로또 번호와 당첨 번호를 비교하여 일치하는 갯수가 정확하게 나오는지 확인한다.', () => {
    const winningNumbers = [3, 9, 11, 20, 21, 25];
    const bonusNumber = 45;

    const lottos = [
      {
        sample: new Lotto([3, 9, 11, 20, 21, 25]),
        rank: VALUES.RANK.FIRST,
      },
      {
        sample: new Lotto([3, 9, 11, 20, 21, 45]),
        rank: VALUES.RANK.SECOND,
      },
      {
        sample: new Lotto([3, 9, 11, 20, 21, 44]),
        rank: VALUES.RANK.THIRD,
      },
      {
        sample: new Lotto([3, 9, 11, 20, 22, 44]),
        rank: VALUES.RANK.FOURTH,
      },
      {
        sample: new Lotto([3, 9, 11, 19, 22, 44]),
        rank: VALUES.RANK.FIFTH,
      },
    ];

    lottos.forEach(({ sample, rank }) => {
      expect(sample.getWinningRank(winningNumbers, bonusNumber)).to.be.equal(rank);
    });
  });
});
