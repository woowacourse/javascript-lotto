describe("ui-play", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/")
  })

  it("사이트 접속시에 제목과 구입 금액 영역만 보여진다.", () => {
    cy.get("#buy").children().should("exist")
    cy.get("#pocket").children().should("not.exist")
    cy.get("#winning").children().should("not.exist")
  })

  it("금액을 입력하고 버튼을 클릭하면 구매 내역 영역과 당첨 번호 확인 영역이 보여진다", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get("#pocket").children().should("exist")
    cy.get("#winning").children().should("exist")
  })

  it("금액을 입력하고 버튼을 클릭하면 입력 금액/1000 개의 로또 이모지가 보여진다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get("#pocket-lottos").children().its("length").should("eq", 5)
  })

  it("번호보기 토글 버튼을 클릭하면 각 로또 이모지와 로또 번호 6자리가 보여진다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get("#pocket-toggle-number").click({ force: true })
    cy.get(".pocket-lotto-numbers").should("exist")
    cy.get(".pocket-lotto-numbers").each(($numbers) => {
      expect($numbers.text().split(" ").length).to.eq(6)
    })
  })

  it("번호보기 토클 버튼을 클릭했을 때 나오는 각 로또 번호들은 서로 달라야 한다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get("#pocket-toggle-number").click({ force: true })
    cy.get(".pocket-lotto-numbers").should("exist")
    cy.get(".pocket-lotto-numbers").each(($numbers) => {
      expect(new Set($numbers.text().split(" ")).size).to.eq(6)
    })
  })

  it("번호보기 토클 버튼을 클릭했을 때 나오는 각 로또 번호들은 1이상 45이하 사이여야 한다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get("#pocket-toggle-number").click({ force: true })
    cy.get(".pocket-lotto-numbers").should("exist")
    cy.get(".pocket-lotto-numbers").each(($numbers) => {
      cy.get($numbers.text().split(" ")).each(($number) => {
        cy.wrap(parseInt($number, 10)).should("be.lte", 45).and("be.gte", 1)
      })
    })
  })

  it("결과 확인하기 버튼을 누르면 모달 창이 보여진다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get(".winning-number").each(($winningNumber, i) => {
      cy.wrap($winningNumber).type(i + 1)
    })
    cy.get(".bonus-number").type(7)
    cy.get("#winning-result-button").click()
    cy.get(".modal").should("have.class", "open")
  })

  it("당첨된 로또의 총 개수는 구매한 로또의 총 개수보다 작거나 같아야 한다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get(".winning-number").each(($winningNumber, i) => {
      cy.wrap($winningNumber).type(i + 1)
    })
    cy.get(".bonus-number").type(7)
    cy.get("#winning-result-button").click()

    let winner = 0
    cy.get(".result-table > tbody > tr")
      .each(($result) => {
        winner += parseInt($result.children().last().text().slice(0, -1), 10)
      })
      .then(() => {
        cy.wrap(winner).should("be.lte", 5)
      })
  })

  it("수익률은 0보다 작을 수 없다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get(".winning-number").each(($winningNumber, i) => {
      cy.wrap($winningNumber).type(i + 1)
    })
    cy.get(".bonus-number").type(7)
    cy.get("#winning-result-button").click()
    cy.get("#earnings-rate").then(($rateText) => {
      const txt = $rateText.text().trim()
      const rate = Number(txt.slice(11, txt.indexOf("%")))
      cy.wrap(rate).should("be.gte", 0)
    })
  })

  it("다시 시작하기 버튼을 누르면 제목과 구입 금액 영역만 보여진다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get(".winning-number").each(($winningNumber, i) => {
      cy.wrap($winningNumber).type(i + 1)
    })
    cy.get(".bonus-number").type(7)
    cy.get("#winning-result-button").click()
    cy.get("#reset").click()
    cy.get("#buy").children().should("exist")
    cy.get("#pocket").children().should("not.exist")
    cy.get("#winning").children().should("not.exist")
  })
})

describe("ui-exception", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/")
    cy.window()
      .then((win) => cy.stub(win, "alert"))
      .as("alertStub")
  })

  it("금액에 소수점을 입력했을때 alert가 발생한다", () => {
    cy.get("#buy-input").type("432.13")
    cy.get("#buy-button").click()
    cy.get("@alertStub").should(
      "be.calledWith",
      "금액은 소수가 될 수 없습니다."
    )
  })

  it("금액에 음수를 입력했을때 alert가 발생한다", () => {
    cy.get("#buy-input").type("-1000")
    cy.get("#buy-button").click()
    cy.get("@alertStub").should("be.calledWith", "금액은 자연수여야 합니다.")
  })

  it("금액에 1000원 미만을 입력했을때 alert가 발생한다", () => {
    cy.get("#buy-input").type("500")
    cy.get("#buy-button").click()
    cy.get("@alertStub").should(
      "be.calledWith",
      "최소 입력금액은 1000원입니다."
    )
  })

  it("당첨 번호를 전부 입력하지 않은 상태로 결과 확인하기 버튼을 누르면 alert가 발생한다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get(".winning-number").each(($winningNumber, i) => {
      i % 2 !== 0 && cy.wrap($winningNumber).type(i + 1)
    })
    cy.get("#winning-result-button").click()
    cy.get("@alertStub").should(
      "be.calledWith",
      "당첨 번호를 모두 입력해주세요."
    )
  })

  it("당첨 번호에 중복되는 숫자가 있으면 alert가 발생해야 한다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get(".winning-number").each(($winningNumber, i) => {
      cy.wrap($winningNumber).type((i % 3) + 1)
    })
    cy.get(".bonus-number").type(2)
    cy.get("#winning-result-button").click()
    cy.get("@alertStub").should(
      "be.calledWith",
      "당첨 번호는 중복되면 안됩니다."
    )
  })

  it("당첨 번호가 1이상 45이하가 아닌 숫자가 있을때 alert가 발생해야 한다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get(".winning-number").each(($winningNumber, i) => {
      cy.wrap($winningNumber).type(i + 42)
    })
    cy.get(".bonus-number").type(-1)
    cy.get("#winning-result-button").click()
    cy.get("@alertStub").should(
      "be.calledWith",
      "당첨 번호는 1이상 45이하의 숫자여야 합니다."
    )
  })

  it("당첨 번호에 소수가 있으면 alert가 발생해야 한다.", () => {
    cy.get("#buy-input").type("5000")
    cy.get("#buy-button").click()
    cy.get(".winning-number").each(($winningNumber, i) => {
      cy.wrap($winningNumber).type(i * 0.5 + 1)
    })
    cy.get(".bonus-number").type(3.14)
    cy.get("#winning-result-button").click()
    cy.get("@alertStub").should(
      "be.calledWith",
      "당첨 번호는 소수가 될 수 없습니다."
    )
  })
})
