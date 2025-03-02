import LottoMachine from "../domain/LottoMachine.js";
import { lottoState } from "../webView/lottoState.js";
import PurchasePriceValidator from "../domain/\bvalidator/PurchasePriceValidator.js";
import domRefs from "../webView/dom.js";
import parser from "../util/parser.js";
import { disabled, focusFirstNode, createElement } from "../util/webUtil.js";

domRefs.$priceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    const price = parser.toNumber(domRefs.$inputPrice.value);
    PurchasePriceValidator.validatePurchasePrice(price);

    domRefs.$lottoInfoWrap.style.display = "block";
    lottoState.lottoMachine = new LottoMachine(price);

    displayLottoInfo(lottoState.lottoMachine);
  } catch (error) {
    alert(error.message);
    domRefs.$inputPrice.value = "";
  }
});

function displayLottoInfo(lottoMachine) {
  const lottosNumber = lottoMachine.getLottosNumber();
  domRefs.$lottoCount.textContent = `총 ${lottosNumber.length}개 구매했습니다.`;

  disabled([domRefs.$inputPrice, domRefs.$buyButton], true);
  focusFirstNode(domRefs.$paper_winning_number_inputs);

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
      text: numbers.sort((a, b) => a - b).join(", "),
    });

    lottoDiv.appendChild(ticketIcon);
    lottoDiv.appendChild(lottoNumbersDiv);
    fragment.appendChild(lottoDiv);
    return lottoDiv;
  });

  domRefs.$lottoInfo.appendChild(fragment);
}
