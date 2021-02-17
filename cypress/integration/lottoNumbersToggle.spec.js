import { CLASSNAME, JS_SELECTOR } from "../../src/js/constants/index.js";
import {
  toDataAttributeSelector as toDAS,
  toClassSelector as toCS,
} from "../../src/js/utils/querySelector.js";

describe("번호보기 토글 테스트", () => {
  before(() => {
    cy.visit("/");
  });

  it("비활성화된 번호보기 토글을 클릭하면, 각 로또 장수에 대한 숫자 6개가 표시된다.", () => {
    const userInput = 4500;
    cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).type(userInput);
    cy.get(toDAS(JS_SELECTOR.CASH.BUTTON)).click();

    cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON_WRAPPER)).should(
      "not.have.class",
      "flex-col"
    );

    cy.get(toCS(CLASSNAME.LOTTO_DETAIL.TOGGLE_BUTTON)).click();

    cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON_WRAPPER)).should(
      "have.class",
      "flex-col"
    );
    cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.NUMBERS)).should("be.visible");
    cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.NUMBERS))
      .invoke("text")
      .should((text) => {
        expect(text.split(",").length).to.be.equal(6);
      });
  });

  it("활성화된 번호보기 토글을 클릭하면, 각 로또 장수에 대한 아이콘만 표시되며 숫자 6개는 표시되지 않는다.", () => {
    cy.get(toCS(CLASSNAME.LOTTO_DETAIL.TOGGLE_BUTTON)).click();

    cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON_WRAPPER)).should(
      "not.have.class",
      "flex-col"
    );
    cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.NUMBERS)).should("not.be.visible");
  });
});
