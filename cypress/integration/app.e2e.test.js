const baseUrl = '../../dist/index.html';

describe('로또 프로그램, 성공 테스트', () => {
  before(() => {
    cy.visit(baseUrl);
  });

  context(
    '구입할 금액을 입력하면, 구매한 로또의 개수와 로또를 확인할 수 있다',
    () => {
      before(() => {
        const purchaseMoney = 2000;

        cy.get('#lotto-purchase-input').type(purchaseMoney);
        cy.get('#lotto-purchase-button').click();
      });

      it('구매한 로또 개수', () => {
        cy.get('#lotto-purchase-count').should(
          'contain',
          '총 2개를 구매하였습니다.'
        );

        cy.get('#lotto-purchase-count').should(
          'not.contain',
          '총 3개를 구매하였습니다.'
        );
      });

      it('로또', () => {
        cy.get('.lotto-wrap').should('exist');

        cy.get('#lotto-list').children('.lotto-wrap').should('have.length', 2);

        cy.get('#lotto-list')
          .children('.lotto-wrap')
          .should('not.have.length', 3);
      });
    }
  );
  context(
    '번호 보기 버튼을 클릭하면, 구매한 로또의 번호를 확인하거나 숨길 수 있다',
    () => {
      before(() => {
        cy.get('#show-lotto-toggle').check({ force: true });
      });

      it('구매한 로또 번호 확인', () => {
        cy.get('.lotto-wrap').each((element) => {
          expect(element.children('.lotto-numbers')).to.be.visible;
        });
      });

      it('구매한 로또 번호 숨기기', () => {
        cy.get('#show-lotto-toggle').uncheck({ force: true });

        cy.get('.lotto-wrap').each((element) => {
          expect(element.children('.lotto-numbers')).not.to.be.visible;
        });
      });
    }
  );
  // context('결과 확인하기 버튼을 클릭하면');
});

describe('로또 프로그램, 실패 테스트', () => {
  context('잘못된 구입할 금액을 입력하면, 오류 메시지를 볼 수 있다', () => {
    it('음수일 경우', () => {});
    it('1000원으로 나누어 떨어지지 않을 경우', () => {});
    it('숫자가 아닌 경우', () => {});
  });
});
