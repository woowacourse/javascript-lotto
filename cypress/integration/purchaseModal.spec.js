import { JS_SELECTOR } from "../../src/js/constants/index.js";
import { toDataAttributeSelector as toDAS } from "../../src/js/utils/querySelector.js";
import { Lotto } from "../../src/js/models/index.js";

describe("로또구매 모달 테스트", () => {
  const userInput = 1000;
  const lottoCount = Math.floor(userInput / Lotto.UNIT_PRICE);
  const numberInput = [1, 2, 3, 4, 5, 6];
  before(() => {
    cy.visit("/");
    cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).type(userInput);
    cy.get(toDAS(JS_SELECTOR.CASH.BUTTON)).click();
  });

  it(
    `유저가 유효한 금액을 입력한 후 구매 모달창이 나타난 상황에서` +
      `토글 버튼을 눌르면` +
      `자동구매와 수동구매 옵션을 토글할 수 있다.`,
    () => {
      cy.get(toDAS(JS_SELECTOR.PURCHASE_MODAL.INPUT)).should("be.disabled");
      cy.get(toDAS(JS_SELECTOR.PURCHASE_MODAL.TOGGLE)).click();
      cy.get(toDAS(JS_SELECTOR.PURCHASE_MODAL.INPUT)).should("not.be.disabled");
    }
  );

  it(
    `유저가 유효한 금액을 입력한 후 구매 모달창이 나타난 상황에서` +
      `수동구매를 위해 로또 번호를 선택하고 선택완료 버튼을 누르면` +
      `구매한 로또 갯수만큼 아이콘 정보와 당첨번호 입력란을 보여준다.`,
    () => {
      numberInput.forEach((number, index) => {
        cy.get(toDAS(JS_SELECTOR.PURCHASE_MODAL.INPUT).eq(index)).type(number);
      });
      cy.get(toDAS(JS_SELECTOR.PURCHASE_MODAL.BUTTON)).click();

      cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER)).should("be.visible");
      cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.LABEL)).should(
        "have.text",
        `총 ${lottoCount}개를 구매하였습니다.`
      );
      cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON)).should(
        "have.length",
        lottoCount
      );
    }
  );
});
