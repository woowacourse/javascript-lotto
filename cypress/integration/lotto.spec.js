describe("ui-play", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("사이트 접속시에 제목과 구입 금액 영역만 보여진다.", () => {
    cy.get("#buy").children().should("exist");
    cy.get("#pocket").children().should("not.exist");
    cy.get("#winning").children().should("not.exist");
  });
});
