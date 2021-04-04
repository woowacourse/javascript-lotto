import LottoRankController from '../../../src/js/controllers/LottoRankController.js';
import { LOTTO_NUMBERS } from '../../../src/js/utils/constants.js';
import { calculateEarningRate, getRandomNumber } from '../../../src/js/utils/utils.js';

describe('로또 게임 테스트', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080/');
  });

  const lottoRankController = new LottoRankController();
  const price = 10000;
  const lottoTotalCount = price / LOTTO_NUMBERS.LOTTO_UNIT;
  const LOTT0_LENGTH = 7;

  function typeWinningNumber() {
    const numbers = new Set();
    while (numbers.size < LOTT0_LENGTH) {
      numbers.add(getRandomNumber());
    }

    cy.get('.winning-number').each((winningNumber, idx) => {
      cy.wrap(winningNumber).type([...numbers][idx]);
    });
  }

  // 당첨 번호가 다음과 같다고 가정한다.   21, 6, 43, 29, 35, 16, 보너스 숫자 : 17
  const lottoNumsArr = [
    [21, 6, 43, 29, 35, 16], // 1등 (6개 일치)
    [21, 6, 43, 29, 35, 17], // 2등 (5개 + 보너스)
    [17, 44, 28, 43, 7, 33], // 탈락
    [41, 33, 4, 25, 11, 30], // 탈락
    [21, 6, 43, 37, 26, 15], // 5등 (3개 일치)
    [27, 13, 39, 29, 35, 16], // 5등 (3개 일치)
  ];

  it('프로그램을 시작하면, 금액 입력을 해야한다.', () => {
    cy.get('#input-price-form').should('be.visible');

    cy.get('#purchase-lottos').should('not.be.visible');
    cy.get('#mixed-purchase').should('not.be.visible');
    cy.get('#purchased-lotto-result').should('not.be.visible');
    cy.get('#input-winning-lotto-nums').should('not.be.visible');
  });

  it('금액을 입력하면, 사용자는 구매 방법을 선택할 수 있다', () => {
    cy.get('#input-price').type(price);
    cy.get('#input-price-btn').click();
    cy.get('#mixed-purchase-btn').should('be.visible');
    cy.get('#auto-purchase-btn').should('be.visible');

    cy.get('#mixed-purchase').should('not.be.visible');
    cy.get('#purchased-lotto-result').should('not.be.visible');
    cy.get('#input-winning-lotto-nums').should('not.be.visible');
  });

  it('자동구매 버튼을 선택하면, 금액에 해당하는 자동구매 로또 결과를 확인할 수 있다.', () => {
    cy.get('#auto-purchase-btn').click();

    cy.get('#purchased-lotto-result').should('be.visible');
    cy.get('#input-winning-lotto-nums').should('be.visible');
  });

  it('사용자가 구매한 로또의 개수와 개수 만큼의 로또 이모지를 보여준다.', () => {
    cy.get('#total-purchased').should('have.text', lottoTotalCount);
    cy.get('#lotto-icons').children('.lotto-wrapper').should('have.length', lottoTotalCount);
    cy.get('#input-winning-lotto-nums').should('be.visible');
  });

  it('번호 보기 스위치 off 상태에서는 로또 아이콘들이 가로로, on에서는 세로로 정렬된다.', () => {
    cy.get('.switch').click();
    cy.get('#lotto-icons').should('have.class', 'flex-col');
    cy.get('.switch').click();
    cy.get('#lotto-icons').should('not.have.class', 'flex-col');
  });

  it('번호 보기 스위치가 off이면 구매한 로또의 번호가 보이지 않고, on이면 번호가 보인다.', () => {
    cy.get('.switch').click();
    cy.get('.lotto-wrapper').children('.lotto-detail').should('be.visible');
    cy.get('.switch').click();
    cy.get('.lotto-wrapper').children('.lotto-detail').should('not.be.visible');
  });

  it('당첨번호를 입력하고, 결과 확인 버튼을 누르면 modal 창이 보이고 x 버튼을 누르면 modal 창이 닫힌다.', () => {
    typeWinningNumber();

    cy.get('#show-result-btn').click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal-close').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('modal 영역 밖을 click 하면 modal 창이 닫힌다', () => {
    cy.get('#show-result-btn').click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal-inner').click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal').click(-50, -50, { force: true }); // modal 영역 밖을 클릭한 경우
    cy.get('.modal').should('not.be.visible');
  });

  it('로또 당첨 결과를 올바르게 계산한다.', () => {
    cy.get('#show-result-btn').click();

    const matchingNumCounts = [6, 5, 0, 0, 3, 3]; // 일치하는 number의 개수
    const isMatchBonusArr = [false, true, false, false, false, false]; // 보너스 숫자와 일치하는지 여부
    const resultRank = [1, 2, 0, 0, 5, 5].join('');

    expect(lottoRankController.initRanks(matchingNumCounts, isMatchBonusArr).join('')).to.be.equal(
      resultRank
    );
  });

  it('수익률을 올바르게 계산한다.', () => {
    const rankCounts = [1, 1, 0, 0, 2];
    const sum = 2030010000;
    const purchasedPrice = lottoNumsArr.length * LOTTO_NUMBERS.LOTTO_UNIT;
    const earningRate = (sum / purchasedPrice - 1) * 100;

    expect(calculateEarningRate(purchasedPrice, rankCounts)).to.be.equal(earningRate);
  });

  it('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
    cy.get('#reset-btn').click();
    cy.get('.modal').should('not.be.visible');

    cy.get('#input-price-form').should('be.visible');
    cy.get('#input-price').should('have.value', '');

    cy.get('#purchase-lottos').should('not.be.visible');
    cy.get('#mixed-purchase').should('not.be.visible');
    cy.get('#purchased-lotto-result').should('not.be.visible');
    cy.get('#input-winning-lotto-nums').should('not.be.visible');
    cy.get('.winning-number').each(winningNumber => {
      cy.wrap(winningNumber).should('have.value', '');
    });
  });
});
