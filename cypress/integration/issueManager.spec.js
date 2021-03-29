import { CLASSNAME, JS_SELECTOR } from "../../src/js/constants/index.js";
import { Lotto } from "../../src/js/models/index.js";
import {
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../../src/js/utils/index.js";

describe("로또 번호 입력 기능(수동 구매 기능)을 테스트한다", () => {
  context(
    "유저가 입력한 금액에 해당하는 로또 장수만큼의 '자동・수동 구분란과 번호 입력 input 태그 6개'가 표시되어 있다.",
    () => {
      const userInput = 4500;
      const lottoCount = Math.floor(userInput / Lotto.UNIT_PRICE);

      beforeEach(() => {
        cy.visit("/");

        cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).type(userInput);
        cy.get(toDAS(JS_SELECTOR.CASH.BUTTON)).click();

        cy.get(toDAS(JS_SELECTOR.ISSUE_MANAGER.ENTRY_LIST))
          .children()
          .should("have.length", lottoCount);
      });

      it("각 로또 구매란에는 '자동・수동 구분란과 번호 입력 input 태그 6개'가 표시되어 있다.", () => {
        cy.get(toDAS(JS_SELECTOR.ISSUE_MANAGER.ENTRY_LIST))
          .children()
          .each(($entry) => {
            cy.wrap($entry)
              .find("input[type=radio]")
              .should("have.length", 2)
              .get("input[value=auto]")
              .should("have.checked");

            cy.wrap($entry)
              .find("input[type=number]")
              .should("have.length", 6)
              .invoke("attr", "disabled")
              .then((disabled) => {
                expect(disabled).to.exist;
              });
          });
      });

      it("수동 구매 버튼을 클릭하고 번호 여섯개를 입력후 발급 버튼을 누르면 입력한 번호로 로또가 발급된다.", () => {
        const lottoNumbers = [3, 24, 30, 2, 34, 11];

        cy.get(toDAS(JS_SELECTOR.ISSUE_MANAGER.ENTRY))
          .first()
          .then(($entry) => {
            cy.wrap($entry).find("input[type=radio][value=manual]").click();

            cy.wrap($entry)
              .find("input[type=number]")
              .each(($input, index) => {
                cy.wrap($input).type(lottoNumbers[index]);
              });
            cy.wrap($entry).find("input[type=number]").last().type("{enter}");
          });

        cy.get(toCS(CLASSNAME.LOTTO_DETAIL.TOGGLE_BUTTON)).click({
          force: true,
        });

        cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.NUMBERS)).should("be.visible");
        cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.NUMBERS))
          .first()
          .invoke("text")
          .then((text) =>
            expect(text).to.have.string(
              lottoNumbers
                .sort((a, b) => a - b)
                .map((number) => number.toString().padStart(2, 0))
                .join(", ")
            )
          );
      });
    }
  );
});
