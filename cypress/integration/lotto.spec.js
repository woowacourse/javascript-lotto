class CypressWrapper {
  _getCy(selector) {
    return cy.get(selector)
  }
  type(selector, value) {
    try {
      this._getCy(selector).type(value)
    } catch (err) {
      new Error(err)
    }
    return this
  }
  click(selector, params) {
    try {
      this._getCy(selector).click(params)
    } catch (err) {
      new Error(err)
    }
    return this
  }
  should(selector, ...param) {
    try {
      this._getCy(selector).should(...param)
    } catch (err) {
      new Error(err)
    }
    return this
  }
}
const cw = new CypressWrapper()

const submitBuy = (value) => {
  cw.type("#buy-input", value).click("#buy-button")
}

const testDetail = () => {
  cw.click(".lotto-numbers-toggle-button", { force: true }).should(
    ".pocket-lotto-numbers",
    "exist"
  )
}

const submitAnswer = (numbers, bonus) => {
  cy.get(".winning-number").each(($winningNumber, i) => {
    numbers[i] && cy.wrap($winningNumber).type(numbers[i])
  })

  cw.type(".bonus-number", bonus).click("#winning-result-button")
}

const testProfit = (assertion, value) => {
  cy.get("#earnings-rate").then(($rateText) => {
    const profitText = $rateText.text().trim()
    const rate = Number(profitText.slice(11, profitText.indexOf("%")))
    cy.wrap(rate).should(assertion, value)
  })
}

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
    submitBuy(5000)
    cy.get("#pocket").children().should("exist")
    cy.get("#winning").children().should("exist")
  })

  it("금액을 입력하고 버튼을 클릭하면 입력 금액/1000 개의 로또 이모지가 보여진다.", () => {
    submitBuy(5000)
    cy.get("#pocket-lottos").children().its("length").should("eq", 5)
  })

  it("번호보기 토글 버튼을 클릭하면 각 로또 이모지와 로또 번호 6자리가 보여진다.", () => {
    submitBuy(5000)
    testDetail()
    cy.get(".pocket-lotto-numbers").each(($numbers) => {
      expect($numbers.text().split(" ").length).to.eq(6)
    })
  })

  it("번호보기 토클 버튼을 클릭했을 때 나오는 각 로또 번호들은 서로 달라야 한다.", () => {
    submitBuy(5000)
    testDetail()
    cy.get(".pocket-lotto-numbers").each(($numbers) => {
      expect(new Set($numbers.text().split(" ")).size).to.eq(6)
    })
  })

  it("번호보기 토클 버튼을 클릭했을 때 나오는 각 로또 번호들은 1이상 45이하 사이여야 한다.", () => {
    submitBuy(5000)
    testDetail()
    cy.get(".pocket-lotto-numbers").each(($numbers) => {
      cy.get($numbers.text().split(" ")).each(($number) => {
        cy.wrap(parseInt($number, 10)).should("be.lte", 45).and("be.gte", 1)
      })
    })
  })

  it("결과 확인하기 버튼을 누르면 모달 창이 보여진다.", () => {
    submitBuy(5000)
    submitAnswer([1, 2, 3, 4, 5, 6], 7)
    cw.should(".modal", "have.class", "open")
  })

  it("당첨된 로또의 총 개수는 구매한 로또의 총 개수보다 작거나 같아야 한다.", () => {
    submitBuy(5000)
    submitAnswer([1, 2, 3, 4, 5, 6], 7)

    let winner = 0
    cy.get(".result-table tbody tr")
      .each(($result) => {
        winner += parseInt($result.children().last().text().slice(0, -1), 10)
      })
      .then(() => {
        cy.wrap(winner).should("be.lte", 5)
      })
  })

  it("수익률은 -100% 미만일 수 없다.", () => {
    submitBuy(5000)
    submitAnswer([1, 2, 3, 4, 5, 6], 7)
    testProfit("be.gte", -100)
  })

  it("다시 시작하기 버튼을 누르면 제목과 구입 금액 영역만 보여진다.", () => {
    submitBuy(5000)
    submitAnswer([1, 2, 3, 4, 5, 6], 7)
    cw.click("#reset")
    cy.get("#buy").children().should("exist")
    cy.get("#pocket").children().should("not.exist")
    cy.get("#winning").children().should("not.exist")
  })

  it("구매한 번호와 당첨 번호가 6개 일치할 때 당첨 개수와 수익률이 기대한 대로 출력된다.", () => {
    submitBuy(1000)
    cy.get(".pocket-lotto-numbers").then(($numbers) => {
      const numbers = $numbers.text().split(" ")
      let bonusNum = 1
      while (numbers.includes(bonusNum)) {
        bonusNum++
      }

      submitAnswer(numbers, bonusNum)
    })

    cy.get(".result-table td").eq(2).should("have.text", "1개")
    testProfit("be.equal", 199999900)
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
    submitBuy(432.13)
    cw.should("@alertStub", "be.calledWith", "금액은 소수가 될 수 없습니다.")
  })

  it("금액에 음수를 입력했을때 alert가 발생한다", () => {
    submitBuy(-1000)
    cw.should("@alertStub", "be.calledWith", "금액은 자연수여야 합니다.")
  })

  it("금액에 1000원 미만을 입력했을때 alert가 발생한다", () => {
    submitBuy(500)

    cw.should("@alertStub", "be.calledWith", "최소 입력금액은 1000원입니다.")
  })

  it("당첨 번호를 전부 입력하지 않은 상태로 결과 확인하기 버튼을 누르면 alert가 발생한다.", () => {
    submitBuy(5000)
    submitAnswer([1, 2, "", 4, "", 6], 7)
    cw.should("@alertStub", "be.calledWith", "당첨 번호를 모두 입력해주세요.")
  })

  it("당첨 번호에 중복되는 숫자가 있으면 alert가 발생해야 한다.", () => {
    submitBuy(5000)
    submitAnswer([1, 2, 3, 4, 4, 26], 17)
    cw.should("@alertStub", "be.calledWith", "당첨 번호는 중복되면 안됩니다.")
  })

  it("당첨 번호가 1이상 45이하가 아닌 숫자가 있을때 alert가 발생해야 한다.", () => {
    submitBuy(5000)
    submitAnswer([40, 41, 42, 43, 44, 46], -1)
    cw.should(
      "@alertStub",
      "be.calledWith",
      "당첨 번호는 1이상 45이하의 숫자여야 합니다."
    )
  })

  it("당첨 번호에 소수가 있으면 alert가 발생해야 한다.", () => {
    submitBuy(5000)
    submitAnswer([1, 2.3, 4.5, 6, 34, 43], 3.14)
    cw.should(
      "@alertStub",
      "be.calledWith",
      "당첨 번호는 소수가 될 수 없습니다."
    )
  })
})
