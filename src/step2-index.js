/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO } from "./constants";
import LottoGenerator from "./LottoGenerator";
import Validator from "./Validator";
import WebView from "./View/WebView";

const purchaseForm = document.querySelector(".purchase-form");
const purchaseInput = document.querySelector(".purchase-form__input");

const ticketList = document.querySelector(".ticket-list");
const winningForm = document.querySelector(".winning-form");

const validateMoney = (money) => {
  Validator.numberDivided(money, LOTTO.PRICE);
  Validator.positiveNumber(money);
};

const setPurchaseLottoCount = (purchaseLottoCount) => {
  const ticketListSummary = document.querySelector(".ticket-list__summary");
  console.log(ticketListSummary);
  ticketListSummary.innerText = `총 ${purchaseLottoCount}개를 구매하였습니다.`;
};

const getTicket = (lottoNumbers) => {
  const ticket = document.createElement("div");
  ticket.className = "ticket-list__item";
  // 티켓 이미지 생성
  const ticketIcon = document.createElement("img");
  ticketIcon.className = "ticket-list__icon";
  ticketIcon.src = "./assets//lotto_ticket.png";
  // 로또 번호 span 태그 생성
  const lottoNumberSpan = document.createElement("span");
  lottoNumberSpan.className = "ticket-list__numbers";
  const numberText = document.createTextNode(lottoNumbers.join(", "));
  lottoNumberSpan.appendChild(numberText);

  ticket.appendChild(ticketIcon);
  ticket.appendChild(lottoNumberSpan);

  return ticket;
};

// 이벤트 달기
purchaseForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 폼 새로고침 방지
  try {
    const money = WebView.readMoney();
    validateMoney(money);

    // 구입 성공한 이후
    const purchaseLottoCount = money / LOTTO.PRICE;
    setPurchaseLottoCount(purchaseLottoCount);

    // 로또 객체 생성
    const lottos = LottoGenerator.makeLottos(purchaseLottoCount);
    const ticketListContainer = document.querySelector(
      ".ticket-list__container",
    );

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
