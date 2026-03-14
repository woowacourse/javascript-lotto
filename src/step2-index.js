/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO, RANK } from "./constants";
import LottoGenerator from "./LottoGenerator";
import WinningLotto from "./Model/WinningLotto";
import ScoreBoard from "./ScoreBoard";
import Validator from "./Validator";
import PurchaseView from "./WebView/PurchaseView";
import ResultModalView from "./WebView/ResultModalView";
import TicketListView from "./WebView/TicketList";
import WinningLottoView from "./WebView/WinningLottoView";

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
      this.#renderPurchasedLottos();

      this.#ticketListView.show();
      this.#winningLottoView.show();
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

      this.#renderLottoResult();
      this.#resultModalView.open();
    } catch (error) {
      alert(error.message);
    }
  };

  #renderPurchasedLottos() {
    const purchaseLottoCount = this.#money / LOTTO.PRICE;
    this.#ticketListView.setPurchaseLottoCount(purchaseLottoCount);

    this.#lottos.push(...LottoGenerator.makeLottos(purchaseLottoCount));
    const allLottoNumbers = this.#lottos.map((lotto) => lotto.getNumbers());
    this.#ticketListView.setAllTickets(allLottoNumbers);
  }

  #renderLottoResult() {
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
    this.#resultModalView.setScore(scoreData);
    const profitRate = ScoreBoard.getProfitRate(allRankCount, this.#money);
    this.#resultModalView.setProfitRate(profitRate);
  }

  #validateLottoNumber(number) {
    Validator.positiveNumber(number);
    Validator.numberLower(LOTTO.LOWER, number);
    Validator.numberUpper(LOTTO.UPPER, number);
  }
}

const app = new App();
app.run();
