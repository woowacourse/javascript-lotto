import { ERROR_MESSAGE, SELECTOR } from "../../src/js/constants/constant"

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

const submitAutoBuy = (value) => {
  cw.type(SELECTOR.BUY_INPUT, value)
    .click(SELECTOR.BUY_BUTTON)
    .click("#auto-button")
}

const submitManualBuy = (value) => {
  cw.type(SELECTOR.BUY_INPUT, value).click(SELECTOR.BUY_BUTTON)
}

const testDetail = () => {
  cw.click(SELECTOR.POCKET_TOGGLE, { force: true }).should(
    SELECTOR.POCKET_LOTTO_NUMBERS,
    "exist"
  )
}

const submitManualLotto = (numbers) => {
  cy.get(".manual-number").each(($manualNumber, i) => {
    numbers[i] && cy.wrap($manualNumber).type(numbers[i])
  })

  cw.click("#manual-button")
}

const submitAnswer = (numbers, bonus) => {
  cy.get(SELECTOR.WINNING_NUMBER).each(($winningNumber, i) => {
    numbers[i] && cy.wrap($winningNumber).type(numbers[i])
  })

  cw.type(SELECTOR.BONUS_NUMBER, bonus).click(SELECTOR.OPEN_RESULT_MODAL_BUTTON)
}

const testProfit = (assertion, value) => {
  cy.get(SELECTOR.EARNINGS_RATE).then(($rateText) => {
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
    cy.get(SELECTOR.BUY_SECTION).children().should("exist")
    cy.get("#buy-method").children().should("not.exist")
    cy.get(SELECTOR.POCKET_SECTION).children().should("not.exist")
    cy.get(SELECTOR.WINNING_SECTION).children().should("not.exist")
  })

  it("금액을 입력하고 버튼을 클릭하면 수동 구매 영역이 보여진다", () => {
    submitAutoBuy(5000)
    cy.get("#buy-method").children().should("exist")
    cy.get(SELECTOR.POCKET_SECTION).children().should("not.exist")
    cy.get(SELECTOR.WINNING_SECTION).children().should("not.exist")
  })

  it("금액을 입력하고 버튼을 클릭하면 구매가능한 로또 개수가 보여진다", () => {
    submitManualBuy(5000)
    cy.get("#buy-method .available").then((number) => {
      expect(number.text()).to.equal(5)
    })
  })

  it("수동 번호를 입력하고 수동 구매 버튼을 누르면 현재 구매가능 개수가 한개 줄어든다", () => {
    submitManualBuy(5000)
    submitManualLotto([1, 2, 3, 4, 5, 6])
    cy.get("#buy-method .available").then((number) => {
      expect(number.text()).to.equal(4)
    })
  })

  it("수동 번호를 입력하고 수동 구매 버튼을 누르면 구매한 수동 번호 목록에 보여진다", () => {
    submitManualBuy(5000)
    submitManualLotto([1, 2, 3, 4, 5, 6])
    cy.get("#manual p").then((number) => {
      expect(number.text()).to.equal("1 2 3 4 5 6")
    })
  })

  it("수동 번호 입력후 나머지 자동 구매 버튼을 누르면 입력한 수동번호가 포함된 로또가 생성된다.", () => {
    submitManualBuy(5000)
    const manualNumbers = [1, 2, 3, 4, 5, 6]
    submitManualLotto(manualNumbers)
    cw.click("#auto-button")
    testDetail()
    cy.get(".pocket-lotto-numbers").its("length").should("be.equal", 5)
    cy.get(".pocket-lotto-numbers")
      .first()
      .then((numbers) => {
        expect(numbers.text()).to.equal("1 2 3 4 5 6")
      })
  })

  it("구매 가능 개수가 1개인 상태에서 수동 구매를 하면 수동 구매 영역 감춰지고 구매 내역 영역과 당첨 번호 확인 영역이 보여진다", () => {
    submitManualBuy(1000)
    const manualNumbers = [1, 2, 3, 4, 5, 6]
    submitManualLotto(manualNumbers)
    cy.get("#buy-method").children().should("not.exist")
    cy.get(SELECTOR.POCKET_SECTION).children().should("not.exist")
    cy.get(SELECTOR.WINNING_SECTION).children().should("not.exist")
  })

  it("금액을 입력하고 확인 버튼, 나머지 자동구매 버튼을 클릭하면 수동 구매 영역 감춰지고 구매 내역 영역과 당첨 번호 확인 영역이 보여진다", () => {
    submitAutoBuy(5000)
    cy.get("#buy-method").children().should("not.exist")
    cy.get(SELECTOR.POCKET_SECTION).children().should("exist")
    cy.get(SELECTOR.WINNING_SECTION).children().should("exist")
  })

  it("금액을 입력하고 버튼을 클릭하면 입력 금액/1000 개의 로또 이모지가 보여진다.", () => {
    submitAutoBuy(5000)
    cy.get(SELECTOR.POCKET_LOTTOS).children().its("length").should("eq", 5)
  })

  it("번호보기 토글 버튼을 클릭하면 각 로또 이모지와 로또 번호 6자리가 보여진다.", () => {
    submitAutoBuy(5000)
    testDetail()
    cy.get(SELECTOR.POCKET_LOTTO_NUMBERS).each(($numbers) => {
      expect($numbers.text().split(" ").length).to.eq(6)
    })
  })

  it("번호보기 토클 버튼을 클릭했을 때 나오는 각 로또 번호들은 서로 달라야 한다.", () => {
    submitAutoBuy(5000)
    testDetail()
    cy.get(SELECTOR.POCKET_LOTTO_NUMBERS).each(($numbers) => {
      expect(new Set($numbers.text().split(" ")).size).to.eq(6)
    })
  })

  it("번호보기 토클 버튼을 클릭했을 때 나오는 각 로또 번호들은 1이상 45이하 사이여야 한다.", () => {
    submitAutoBuy(5000)
    testDetail()
    cy.get(SELECTOR.POCKET_LOTTO_NUMBERS).each(($numbers) => {
      cy.get($numbers.text().split(" ")).each(($number) => {
        cy.wrap(parseInt($number, 10)).should("be.lte", 45).and("be.gte", 1)
      })
    })
  })

  it("결과 확인하기 버튼을 누르면 모달 창이 보여진다.", () => {
    submitAutoBuy(5000)
    submitAnswer([1, 2, 3, 4, 5, 6], 7)
    cw.should(SELECTOR.MODAL_SECTION, "have.class", "open")
  })

  it("당첨된 로또의 총 개수는 구매한 로또의 총 개수보다 작거나 같아야 한다.", () => {
    submitAutoBuy(5000)
    submitAnswer([1, 2, 3, 4, 5, 6], 7)

    let winner = 0
    cy.get(`${SELECTOR.RESULT_TABLE} tbody tr`)
      .each(($result) => {
        winner += parseInt($result.children().last().text().slice(0, -1), 10)
      })
      .then(() => {
        cy.wrap(winner).should("be.lte", 5)
      })
  })

  it("수익률은 -100% 미만일 수 없다.", () => {
    submitAutoBuy(5000)
    submitAnswer([1, 2, 3, 4, 5, 6], 7)
    testProfit("be.gte", -100)
  })

  it("다시 시작하기 버튼을 누르면 제목과 구입 금액 영역만 보여진다.", () => {
    submitAutoBuy(5000)
    submitAnswer([1, 2, 3, 4, 5, 6], 7)
    cw.click(SELECTOR.RESET_BUTTON)
    cy.get(SELECTOR.BUY_SECTION).children().should("exist")
    cy.get(SELECTOR.POCKET_SECTION).children().should("not.exist")
    cy.get(SELECTOR.WINNING_SECTION).children().should("not.exist")
  })

  it("구매한 번호와 당첨 번호가 6개 일치할 때 당첨 개수와 수익률이 기대한 대로 출력된다.", () => {
    submitAutoBuy(1000)
    cy.get(SELECTOR.POCKET_LOTTO_NUMBERS).then(($numbers) => {
      const numbers = $numbers.text().split(" ")
      let bonusNum = 1
      while (numbers.includes(bonusNum)) {
        bonusNum++
      }

      submitAnswer(numbers, bonusNum)
    })

    cy.get(`${SELECTOR.RESULT_TABLE} tr`)
      .last()
      .children()
      .last()
      .should("have.text", "1개")
    testProfit("be.equal", 199999900)
  })
})

describe("ui-exception", () => {
  const ALERT_STUB = "alertStub"
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/")
    cy.window()
      .then((win) => cy.stub(win, "alert"))
      .as(ALERT_STUB)
  })

  describe("ui-buy-exception", () => {
    it("금액에 소수점을 입력했을때 alert가 발생한다", () => {
      submitAutoBuy(432.13)
      cw.should(
        `@${ALERT_STUB}`,
        "be.calledWith",
        ERROR_MESSAGE.PRICE_CANNOT_BE_FLOAT
      )
    })

    it("금액에 음수를 입력했을때 alert가 발생한다", () => {
      submitAutoBuy(-1000)
      cw.should(
        `@${ALERT_STUB}`,
        "be.calledWith",
        ERROR_MESSAGE.PRICE_CANNOT_BE_NEGATIVE
      )
    })

    it("금액에 1000원 미만을 입력했을때 alert가 발생한다", () => {
      submitAutoBuy(500)
      cw.should(
        `@${ALERT_STUB}`,
        "be.calledWith",
        ERROR_MESSAGE.PRICE_CANNOT_BE_LESS_THAN_THOUSAND
      )
    })
  })

  describe("ui-manual-exception", () => {
    it("수동 번호를 전부 입력하지 않은 상태로 결과 확인하기 버튼을 누르면 alert가 발생한다", () => {
      submitManualBuy(5000)
      submitManualLotto([2, "", 4, "", 9, 10])
      cw.should(
        `@${ALERT_STUB}`,
        "be.calledWith",
        "수동 구매 번호를 전부 입력해주세요."
      )
    })

    it("수동 번호에 중복되는 숫자가 있으면 alert가 발생한다", () => {
      submitManualBuy(5000)
      submitManualLotto([2, 3, 4, 4, 9, 10])
      cw.should(
        `@${ALERT_STUB}`,
        "be.calledWith",
        "중복된 번호로 구입하실 수 없습니다."
      )
    })

    it("수동 번호가 1이상 45이하가 아닌 숫자가 있을때 alert가 발생해야 한다", () => {
      submitManualBuy(5000)
      submitManualLotto([2, 3, 4, 46, 9, 0])
      cw.should(
        `@${ALERT_STUB}`,
        "be.calledWith",
        "1이상 45이하의 숫자에서만 구입이 가능합니다."
      )
    })

    it("수동 번호에 소수가 있으면 alert가 발생해야 한다", () => {
      submitManualBuy(5000)
      submitManualLotto([2, 3.1, 4, 23, 9, 44])
      cw.should(
        `@${ALERT_STUB}`,
        "be.calledWith",
        "번호는 반드시 자연수여야 합니다."
      )
    })
  })

  describe("ui-answer-exception", () => {
    it("당첨 번호를 전부 입력하지 않은 상태로 결과 확인하기 버튼을 누르면 alert가 발생한다.", () => {
      submitAutoBuy(5000)
      submitAnswer([1, 2, "", 4, "", 6], 7)
      cw.should(
        `@${ALERT_STUB}`,
        "be.calledWith",
        ERROR_MESSAGE.ANSWER_CANNOT_BE_EMPTY
      )
    })

    it("당첨 번호에 중복되는 숫자가 있으면 alert가 발생해야 한다.", () => {
      submitAutoBuy(5000)
      submitAnswer([1, 2, 3, 4, 4, 26], 17)
      cw.should(
        `@${ALERT_STUB}`,
        "be.calledWith",
        ERROR_MESSAGE.ANSWER_CANNOT_BE_DUPLICATED
      )
    })

    it("당첨 번호가 1이상 45이하가 아닌 숫자가 있을때 alert가 발생해야 한다.", () => {
      submitAutoBuy(5000)
      submitAnswer([40, 41, 42, 43, 44, 46], -1)
      cw.should(
        `@${ALERT_STUB}`,
        "be.calledWith",
        ERROR_MESSAGE.ANSWER_CANNOT_BE_OUT_RANGE
      )
    })

    it("당첨 번호에 소수가 있으면 alert가 발생해야 한다.", () => {
      submitAutoBuy(5000)
      submitAnswer([1, 2.3, 4.5, 6, 34, 43], 3.14)
      cw.should(
        `@${ALERT_STUB}`,
        "be.calledWith",
        ERROR_MESSAGE.ANSWER_CANNOT_BE_FLOAT
      )
    })
  })
})
