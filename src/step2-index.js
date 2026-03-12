/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO } from "./constants";
import LottoGenerator from "./LottoGenerator";
import WinningLotto from "./Model/WinningLotto";
import ScoreBoard from "./ScoreBoard";
import Validator from "./Validator";
import WebView from "./View/WebView";

const purchaseForm = document.querySelector(".purchase-form");
const purchaseInput = document.querySelector(".purchase-form__input");
const purchaseSubmitButton = document.querySelector(
  ".purchase-form__submit-btn",
);

const ticketList = document.querySelector(".ticket-list");
const ticketListContainer = document.querySelector(".ticket-list__container");

const winningForm = document.querySelector(".winning-form");
const resultModal = document.querySelector(".result-modal");
const resultModalCloseButton = document.querySelector(
  ".result-modal__close-btn",
);
const resultModalProfit = document.querySelector(".result-modal__profit");
const resultModalSubmitButton = document.querySelector(
  ".result-modal__submit-btn",
);

const lottos = [];
let money;

const validateMoney = (money) => {
  Validator.numberDivided(money, LOTTO.PRICE);
  Validator.positiveNumber(money);
};

const initLotttGame = () => {
  lottos.length = 0;
  ticketListContainer.innerHTML = "";

  purchaseForm.reset();
  winningForm.reset();

  purchaseInput.disabled = false;
  purchaseInput.style.cursor = "";
  purchaseSubmitButton.disabled = false;
  purchaseSubmitButton.style.cursor = "pointer";

  ticketList.style.visibility = "hidden";
  winningForm.style.visibility = "hidden";

  const winningNumberInputNodes = document.querySelectorAll(
    ".winning-form__input",
  );

  winningNumberInputNodes.forEach((node) => {
    node.disabled = false;
    node.style.cursor = "";
  });
};

const setPurchaseLottoCount = (purchaseLottoCount) => {
  const ticketListSummary = document.querySelector(".ticket-list__summary");
  ticketListSummary.innerText = `총 ${purchaseLottoCount}개를 구매하였습니다.`;
};

const getTicket = (lottoNumbers) => {
  const ticket = document.createElement("div");
  ticket.className = "ticket-list__item";
  // 티켓 이미지 생성
  const ticketIcon = document.createElement("img");
  ticketIcon.className = "ticket-list__icon";
  ticketIcon.src = "./assets/lotto_ticket.png";
  // 로또 번호 span 태그 생성
  const lottoNumberSpan = document.createElement("span");
  lottoNumberSpan.className = "ticket-list__numbers";
  const numberText = document.createTextNode(lottoNumbers.join(", "));
  lottoNumberSpan.appendChild(numberText);

  ticket.appendChild(ticketIcon);
  ticket.appendChild(lottoNumberSpan);

  return ticket;
};

const setScore = (allRankCount) => {
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

// 이벤트 달기
purchaseForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 폼 새로고침 방지
  try {
    money = WebView.readMoney();
    validateMoney(money);

    // 구입 성공한 이후
    purchaseInput.disabled = true;
    purchaseInput.style.cursor = "not-allowed";
    purchaseSubmitButton.disabled = true;
    purchaseSubmitButton.style.cursor = "not-allowed";
    const purchaseLottoCount = money / LOTTO.PRICE;
    setPurchaseLottoCount(purchaseLottoCount);

    // 로또 객체 생성
    lottos.push(...LottoGenerator.makeLottos(purchaseLottoCount));

    lottos.map((lotto) =>
      ticketListContainer.appendChild(getTicket(lotto.getNumbers())),
    );

    ticketList.style.visibility = "visible";
    winningForm.style.visibility = "visible";
  } catch (error) {
    alert(error.message);
    purchaseInput.focus();
  } finally {
    purchaseInput.value = "";
  }
});

winningForm.addEventListener("submit", (e) => {
  try {
    const winningNumbers = WebView.readWinningNumbers();
    const bonusNumber = WebView.readBonusNumber();
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const winningNumberInputNodes = document.querySelectorAll(
      ".winning-form__input",
    );
    const allRankCount = ScoreBoard.makeAllRankCount(lottos, winningLotto);
    setScore(allRankCount);
    const profitRate = ScoreBoard.getProfitRate(allRankCount, money);
    resultModalProfit.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;

    winningNumberInputNodes.forEach((node) => {
      node.disabled = true;
      node.style.cursor = "not-allowed";
    });

    resultModal.showModal();
  } catch (error) {
    alert(error.message);
  }
});

resultModalCloseButton.addEventListener("click", (e) => {
  resultModal.close();
});

resultModalSubmitButton.addEventListener("click", () => {
  resultModal.close();
  initLotttGame();
});
