/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO } from "./constants";
import LottoGenerator from "./LottoGenerator";
import WinningLotto from "./Model/WinningLotto";
import ScoreBoard from "./ScoreBoard";
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
    this.#purchaseView.bindSubmitButton(this.#successPurchase);
    this.#winningLottoView.bindSubmitButton(this.#successCreateWinningLotto);
    this.#resultModalView.bindCloseButton();
    this.#resultModalView.bindSubmitButton(this.#initLotttGame);
  }

  #successPurchase = (money) => {
    this.#money = money;
    const purchaseLottoCount = money / LOTTO.PRICE;
    this.#ticketListView.setPurchaseLottoCount(purchaseLottoCount);

    // 로또 객체 생성
    this.#lottos.push(...LottoGenerator.makeLottos(purchaseLottoCount));
    const allLottoNumbers = this.#lottos.map((lotto) => lotto.getNumbers());
    this.#ticketListView.setAllTickets(allLottoNumbers);

    this.#ticketListView.show();
    this.#winningLottoView.show();
  };

  #successCreateWinningLotto = (winningNumbers, bonusNumber) => {
    this.#winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const allRankCount = ScoreBoard.makeAllRankCount(
      this.#lottos,
      this.#winningLotto,
    );
    this.#setScore(allRankCount);
    const profitRate = ScoreBoard.getProfitRate(allRankCount, this.#money);
    this.#resultModalView.setProfitRate(profitRate);

    this.#resultModalView.open();
  };

  // 반복 코드 - 리팩토링 하기
  #setScore = (allRankCount) => {
    const tableDataFifth = document.querySelector(".result-modal__td--fifth");
    const tableDataFourth = document.querySelector(".result-modal__td--fourth");
    const tableDataThird = document.querySelector(".result-modal__td--third");
    const tableDataSecond = document.querySelector(".result-modal__td--second");
    const tableDataFirst = document.querySelector(".result-modal__td--first");

    tableDataFifth.innerText = `${allRankCount.FIFTH}개`;
    tableDataFourth.innerText = `${allRankCount.FOURTH}개`;
    tableDataThird.innerText = `${allRankCount.THIRD}개`;
    tableDataSecond.innerText = `${allRankCount.SECOND}개`;
    tableDataFirst.innerText = `${allRankCount.FIRST}개`;
  };

  #initLotttGame = () => {
    this.#lottos = [];

    this.#ticketListView.init();
    this.#purchaseView.init();
    this.#winningLottoView.init();
  };
}

const app = new App();
app.run();
