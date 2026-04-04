/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO, RANK } from "./constants.js";
import LottoGenerator from "./LottoGenerator.js";
import WinningLotto from "./Model/WinningLotto.js";
import ScoreBoard from "./ScoreBoard.js";
import Validator from "./Validator.js";
import PurchaseView from "./WebView/PurchaseView.js";
import ResultModalView from "./WebView/ResultModalView.js";
import TicketListView from "./WebView/TicketListView.js";
import WinningLottoView from "./WebView/WinningLottoView.js";

class App {
  #lottos;
  #money;
  #winningLotto;

  #purchaseView;
  #ticketListView;
  #winningLottoView;
  #resultModalView;

  constructor() {
    this.#lottos = [];

    this.#purchaseView = new PurchaseView();
    this.#ticketListView = new TicketListView();
    this.#winningLottoView = new WinningLottoView();
    this.#resultModalView = new ResultModalView();
  }

  run() {
    this.#purchaseView.bindSubmitButton(this.#handleSubmitPurchase);
    this.#winningLottoView.bindSubmitButton(this.#handleSubmitWinningLotto);
    this.#resultModalView.bindCloseButton();
    this.#resultModalView.bindSubmitButton(this.#initLotttGame);
  }

  #initLotttGame = () => {
    this.#lottos = [];

    this.#ticketListView.init();
    this.#purchaseView.init();
    this.#winningLottoView.init();
  };

  #handleSubmitPurchase = () => {
    try {
      const money = this.#purchaseView.readMoney();
      Validator.numberDivided(money, LOTTO.PRICE);
      Validator.positiveNumber(money);

      this.#money = money;

      this.#purchaseView.disableForm();
      this.#calculateAndShowPurchasedLottos();
      this.#winningLottoView.focusInput(0);
    } catch (error) {
      alert(error.message);
      this.#purchaseView.removeInputValue();
      this.#purchaseView.focusInput();
    }
  };

  #handleSubmitWinningLotto = () => {
    try {
      const winningNumbers = this.#winningLottoView.readWinningNumbers();
      winningNumbers.forEach((number) => {
        this.#validateLottoNumber(number);
      });
      Validator.notDuplicated(winningNumbers);
      Validator.arrayLength(winningNumbers, LOTTO.COUNT);

      const bonusNumber = this.#winningLottoView.readBonusNumber();
      this.#validateLottoNumber(bonusNumber);

      this.#winningLotto = new WinningLotto(winningNumbers, bonusNumber);
      this.#winningLottoView.disableInputs();

      this.#calculateAndShowLottoResult();
    } catch (error) {
      alert(error.message);
    }
  };

  #calculateAndShowPurchasedLottos() {
    const purchaseLottoCount = this.#money / LOTTO.PRICE;
    this.#ticketListView.renderPurchaseLottoCount(purchaseLottoCount);

    this.#lottos.push(...LottoGenerator.makeLottos(purchaseLottoCount));
    const allLottoNumbers = this.#lottos.map((lotto) => lotto.getNumbers());
    this.#ticketListView.renderAllTickets(allLottoNumbers);

    this.#ticketListView.show();
    this.#winningLottoView.show();
  }

  #calculateAndShowLottoResult() {
    const allRankCount = ScoreBoard.makeAllRankCount(
      this.#lottos,
      this.#winningLotto,
    );
    const scoreData = Object.entries(RANK).map(([_, rank]) => {
      return {
        matchCount: rank.MATCH_COUNT,
        mustHaveBonus: rank.MUST_HAVE_BONUS,
        price: rank.PRICE,
        winCount: allRankCount[rank.DISPLAY],
      };
    });
    this.#resultModalView.renderScore(scoreData);
    const profitRate = ScoreBoard.getProfitRate(allRankCount, this.#money);
    this.#resultModalView.renderProfitRate(profitRate);

    this.#resultModalView.open();
  }

  #validateLottoNumber(number) {
    Validator.positiveNumber(number);
    Validator.numberLower(LOTTO.LOWER, number);
    Validator.numberUpper(LOTTO.UPPER, number);
  }
}

const app = new App();
app.run();
