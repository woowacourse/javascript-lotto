describe("ui-play", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("사이트 접속시에 제목과 구입 금액 영역만 보여진다.", () => {
    cy.get("#buy").children().should("exist");
    cy.get("#pocket").children().should("not.exist");
    cy.get("#winning").children().should("not.exist");
  });

  it("금액을 입력하고 버튼을 클릭하면 구매 내역 영역과 당첨 번호 확인 영역이 보여진다", () => {
    cy.get("#buy-input").type("5000");
    cy.get("#buy-button").click();
    cy.get("#pocket").children().should("exist");
    cy.get("#winning").children().should("exist");
  });

  it("금액을 입력하고 버튼을 클릭하면 입력 금액/1000 개의 로또 이모지가 보여진다.", () => {
    cy.get("#buy-input").type("5000");
    cy.get("#buy-button").click();
    cy.get("#pocket-lottos").children().its("length").should("eq", 5);
  });
});
