import {
  getRandomNumber,
  compareNumbers,
} from '../../../src/js/utils/utils.js';
import Lotto from '../../../src/js/Lotto.js';

describe('로또 게임 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  const price = 10000;
  const lottoTotalCount = price / 1000;
  const LOTT0_LENGTH = 7;

  function clickAfterTypePrice() {
    cy.get('#input-price').type(price);
    cy.get('#input-price-btn').click();
  }

  function typeWinningNumber() {
    const numbers = new Set();
    while (numbers.size < LOTT0_LENGTH) {
      numbers.add(getRandomNumber());
    }

    cy.get('.winning-number').each((winningNumber, idx) => {
      cy.wrap(winningNumber).type([...numbers][idx]);
    });
  }

  it('프로그램을 시작하면 구입금액 입력폼만 보인다.', () => {
    cy.get('#input-price-form').should('be.visible');
    cy.get('#purchased-lottos').should('not.be.visible');
    cy.get('#input-lotto-nums').should('not.be.visible');
  });

  it('사용자는 로또 구입 금액을 입력하면, 확인 버튼을 누르면 사용자가 구매한 로또와 지난 주 당첨 로또 입력폼이 보인다.', () => {
    clickAfterTypePrice();
    cy.get('#purchased-lottos').should('be.visible');
    cy.get('#input-lotto-nums').should('be.visible');
  });

  it('사용자는 로또 구입 금액을 입력하면, Enter를 누르면 사용자가 구매한 로또와 지난 주 당첨 로또 입력폼이 보인다.', () => {
    cy.get('#input-price').type(`${price}{enter}`);
    cy.get('#purchased-lottos').should('be.visible');
    cy.get('#input-lotto-nums').should('be.visible');
  });

  it('사용자가 구매한 로또의 개수와 개수 만큼의 로또 이모지를 보여준다.', () => {
    clickAfterTypePrice();

    cy.get('#purchased-lottos').should('be.visible');
    cy.get('#total-purchased').should('have.text', lottoTotalCount);
    cy.get('#lotto-icons')
      .children('.lotto-wrapper')
      .should('have.length', lottoTotalCount);
    cy.get('#input-lotto-nums').should('be.visible');
  });

  it('번호 보기 스위치 off 상태에서는 로또 아이콘들이 가로로, on에서는 세로로 정렬된다.', () => {
    clickAfterTypePrice();

    cy.get('.switch').click();
    cy.get('#lotto-icons').should('have.class', 'flex-col');
    cy.get('.switch').click();
    cy.get('#lotto-icons').should('not.have.class', 'flex-col');
  });

  it('번호 보기 스위치가 off이면 구매한 로또의 번호가 보이지 않고, on이면 번호가 보인다.', () => {
    clickAfterTypePrice();

    cy.get('.switch').click();
    cy.get('.lotto-wrapper').children('.lotto-detail').should('be.visible');
    cy.get('.switch').click();
    cy.get('.lotto-wrapper').children('.lotto-detail').should('not.be.visible');
  });

  it('모든 숫자의 입력을 완료하면, 결과 확인 버튼이 활성화된다.', () => {
    clickAfterTypePrice();
    typeWinningNumber();

    cy.get('#show-result-btn').should('not.be.disabled');
  });

  it('결과 확인 버튼을 누르면 modal 창이 보이고, x 버튼을 누르면 modal 창이 닫힌다.', () => {
    clickAfterTypePrice();
    typeWinningNumber();

    cy.get('#show-result-btn').click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal-close').click();
    cy.get('.modal').should('not.be.visible');
  });

  const lottoNumsArr = [
    [21, 6, 43, 29, 35, 16], // 1등 (6개 일치)
    [21, 6, 43, 29, 35, 17], // 2등 (5개 + 보너스 17)
    [17, 44, 28, 43, 7, 33], // 탈락
    [41, 33, 4, 25, 11, 30], // 탈락
    [21, 6, 43, 37, 26, 15], // 5등 (3개)
    [27, 13, 39, 29, 35, 16], // 5등 (3개)
  ];

  const winningNumbers = { 1: 21, 2: 6, 3: 43, 4: 29, 5: 35, 6: 16, 7: 17 };

  it('로또 당첨 결과를 올바르게 계산한다.', () => {
    const lottos = [];

    lottoNumsArr.forEach(lottoNums => {
      const lotto = new Lotto();
      lotto.numbers = lottoNums;
      lottos.push(lotto);
    });

    compareNumbers(lottos, winningNumbers);
  });
});
