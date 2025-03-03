import LottoMachine from "../domain/LottoMachine.js";
import { lottoState } from "../webView/lottoState.js";
import PurchasePriceValidator from "../domain/\bvalidator/PurchasePriceValidator.js";
import domRefs from "../webView/dom.js";
import parser from "../util/parser.js";
import {
  setTagsDisabled,
  focusFirstNode,
  createElement,
} from "../util/webUtil.js";
import { addResultEventHandler } from "./resultHandler.js";

const $priceForm = document.querySelector(".paper_price_form");
const $lottoCount = document.querySelector(".paper_lotto_count");

export function addBuyEventHandler() {
  $priceForm.addEventListener("submit", buyHandler);
}

export function removeBuyEventHandler() {
  $priceForm.removeEventListener("submit", buyHandler);
}

function buyHandler(e) {
  e.preventDefault();
  try {
    const price = parser.toNumber(domRefs.$inputPrice.value);
    PurchasePriceValidator.validatePurchasePrice(price);

    domRefs.$lottoInfoWrap.classList.add("show");
    lottoState.lottoMachine = new LottoMachine(price);

    displayLottoInfo(lottoState.lottoMachine);

    setTagsDisabled([domRefs.$inputPrice, domRefs.$buyButton], true);
    focusFirstNode(domRefs.$paper_winning_number_inputs);

    addResultEventHandler();
    removeBuyEventHandler();
  } catch (error) {
    alert(error.message);
    domRefs.$inputPrice.value = "";
  }
}

function displayLottoInfo(lottoMachine) {
  const lottosNumber = lottoMachine.getLottosNumber();
  $lottoCount.textContent = `총 ${lottosNumber.length}개 구매했습니다.`;
  createLottos(lottosNumber);
}

function createLottos(lottosNumber) {
  const fragment = document.createDocumentFragment();

  lottosNumber.forEach((numbers) => {
    const lottoDiv = createElement({ tag: "div", className: "lotto" });
    const ticketIcon = createElement({
      tag: "div",
      className: "ticket_icon",
      text: "🎟️",
    });
    const lottoNumbersDiv = createElement({
      tag: "div",
      className: "lotto_number",
      text: sortNumbersToString(numbers),
    });

    lottoDiv.appendChild(ticketIcon);
    lottoDiv.appendChild(lottoNumbersDiv);
    fragment.appendChild(lottoDiv);
    return lottoDiv;
  });

  domRefs.$lottoInfo.appendChild(fragment);
}

function sortNumbersToString(numbers) {
  return numbers.sort((a, b) => a - b).join(", ");
}
