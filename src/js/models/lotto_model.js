<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD:src/js/model.js
<<<<<<< HEAD
class LottoModel {
  constructor() {
    this._lotto = [];
    //this._money = 0;
    //this._count = 0;
    this.detail = false;
  }

  get lootto() {
    return this._lotto;
  }

  get money() {
    return this._money;
  }

  get count() {
    return this._count;
  }

  set lotto(newLotto) {
    this._lotto = newLotto;
  }

  set money(newMoney) {
    this._money = newMoney;
  }

  set count(newCount) {
    this._count = newCount;
  }
}

export default LottoModel;
=======
import { INIT } from "./constant.js"
=======
import { INIT } from "../constants/constant.js"
>>>>>>> 06832f7... refactor: 디렉터리 구조 변경 및 ticket.js 추가:src/js/models/lotto_model.js

=======
>>>>>>> 30862ad... refactor: INIT 상수 제거
=======
=======
import Ticket from "../ticket.js"
>>>>>>> fdae302... refactor: 컨벤션 및 일부 메서드 리팩토링
=======
import Ticket from "../components/ticket.js"
>>>>>>> 28e89a3... fix: ticket 클래스 파일 경로 수정
import { RANK } from "../constants/constant.js"
import { getProfitRate } from "../util.js"

>>>>>>> f8fb373... refactor: RANK 상수 구현 및 적용
class LottoModel {
  #tickets
  #answerLotto
  #lottoResult

  constructor() {
    this.#tickets = []
    this.#answerLotto = {
      numbers: null,
      bonus: null,
    }
    this.#lottoResult = {
      [RANK.FIFTH.TEXT]: { price: RANK.FIFTH.PRICE, count: 0 },
      [RANK.FOURTH.TEXT]: { price: RANK.FOURTH.PRICE, count: 0 },
      [RANK.THIRD.TEXT]: { price: RANK.THIRD.PRICE, count: 0 },
      [RANK.SECOND.TEXT]: { price: RANK.SECOND.PRICE, count: 0 },
      [RANK.FIRST.TEXT]: { price: RANK.FIRST.PRICE, count: 0 },
    }
  }

  #addTicket(ticket) {
    this.#tickets.push(ticket)
  }

  #addAnswerLotto(numbers, bonus) {
    this.#answerLotto = { numbers, bonus }
  }

  #calculateMatch(ticket) {
    const match = ticket.numbers.filter((x) =>
      this.#answerLotto.numbers.includes(x)
    ).length
    const bonusMatch = ticket.numbers.includes(this.#answerLotto.bonus)

    return { match, bonusMatch }
  }

  #resetLottoResult() {
    for (let i in this.#lottoResult) {
      this.#lottoResult[i].count = 0
    }
  }

  get tickets() {
    return this.#tickets
  }

  get answerLotto() {
    return this.#answerLotto
  }

  get lottoResult() {
    return this.#lottoResult
  }

  generateRandomTicket() {
    const ticket = new Ticket()
    ticket.generateRandomNumbers()
    this.#addTicket(ticket)
  }

  calculateLottosResult(numbers, bonus) {
    const calculateLottoResult = (ticket) => {
      const { match, bonusMatch } = this.#calculateMatch(ticket)

      let key = ""
      switch (true) {
        case match === 6:
          key = RANK.FIRST.TEXT
          break
        case match === 5 && bonusMatch:
          key = RANK.THIRD.TEXT
          break
        case match === 5 || (match === 4 && bonusMatch):
          key = RANK.THIRD.TEXT
          break
        case match === 4 || (match === 3 && bonusMatch):
          key = RANK.FOURTH.TEXT
          break
        case match === 3 || (match === 2 && bonusMatch):
          key = RANK.FIFTH.TEXT
          break
        default:
      }

      key && this.#lottoResult[key].count++
    }

    this.#addAnswerLotto(numbers, bonus)
    this.#tickets.forEach(calculateLottoResult)
  }

  get profitRate() {
    const income = Object.values(this.#lottoResult).reduce((acc, cur) => {
      return acc + cur.price * cur.count
    }, 0)
    console.log(income, this.#tickets.length * 1000)
    return getProfitRate(income, this.#tickets.length * 1000)
  }

  init() {
    this.#tickets = []
    this.#resetLottoResult()
  }
}
export default LottoModel
>>>>>>> 7f51c15... style: 세미콜론 제거
