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
import { RANK } from "../constants/constant.js"

>>>>>>> f8fb373... refactor: RANK 상수 구현 및 적용
class LottoModel {
  constructor() {
    this._lottos = []
    this._answerLotto = {
      numbers: null,
      bonus: null,
    }
    this._lottoResult = {
      [RANK.FIRST.TEXT]: { price: RANK.FIRST.PRICE, count: 0 },
      [RANK.SECOND.TEXT]: { price: RANK.SECOND.PRICE, count: 0 },
      [RANK.THIRD.TEXT]: { price: RANK.THIRD.PRICE, count: 0 },
      [RANK.FOURTH.TEXT]: { price: RANK.FOURTH.PRICE, count: 0 },
      [RANK.FIFTH.TEXT]: { price: RANK.FIFTH.PRICE, count: 0 },
    }
  }

  get lottos() {
    return this._lottos
  }

  get answerLotto() {
    return this._answerLotto
  }

  get lottoResult() {
    return this._lottoResult
  }

  addLotto(newLotto) {
    this._lottos.push(newLotto)
  }

  addAnswerLotto(numbers, bonus) {
    this._answerLotto = { numbers, bonus }
  }

  calculateLottosResult() {
    const calculateLottoResult = (lotto) => {
      const match = lotto.numbers.filter((x) =>
        this._answerLotto.numbers.includes(x)
      ).length
      const bonusMatch = lotto.numbers.includes(this._answerLotto.bonus)

      let key = ""
      if (match === 6) {
        key = RANK.FIRST.TEXT
      } else if (match === 5 && bonusMatch) {
        key = RANK.SECOND.TEXT
      } else if (match === 5 || (match === 4 && bonusMatch)) {
        key = RANK.THIRD.TEXT
      } else if (match === 4 || (match === 3 && bonusMatch)) {
        key = RANK.FOURTH.TEXT
      } else if (match === 3 || (match === 2 && bonusMatch)) {
        key = RANK.FIFTH.TEXT
      }

      key && this._lottoResult[key].count++
    }

    this._lottos.forEach(calculateLottoResult)
  }

  get profit() {
    const income = Object.values(this._lottoResult).reduce((acc, cur) => {
      return acc + cur.price * cur.count
    }, 0)

    return (income / (this._lottos.length * 1000) - 1) * 100
  }

  resetLottoResult() {
    for (let i in this._lottoResult) {
      this._lottoResult[i].count = 0
    }
  }

  init() {
    this._lottos = []
    this.resetLottoResult()
  }
}
export default LottoModel
>>>>>>> 7f51c15... style: 세미콜론 제거
