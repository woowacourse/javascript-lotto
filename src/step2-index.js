import { LOTTO_PRICE } from "./constants/lottoInfo";
import LottoController from "./controller/LottoController";
import Validator from "./utils/Validator";

const purchaseForm = document.querySelector("form");
const purchasePriceInput = document.querySelector("#purchase-price");

const handlePurchase = (event) => {
  event.preventDefault();

  try {
    const purchasedPrice = Number(purchasePriceInput.value);

    Validator.validateNumber(purchasedPrice);
    Validator.validatePurchaseUnit(purchasedPrice);

    purchaseForm.reset();
    const lottoCount = purchasedPrice / LOTTO_PRICE;
    const lottoController = new LottoController(lottoCount);
    const purchasedLottos = lottoController.issueLottos();
    renderLottoTicket(purchasedLottos);
  } catch (error) {
    alert(error.message);
  }
};

purchaseForm.addEventListener("submit", handlePurchase);

const lottoTicketContainer = document.querySelector(".lotto-ticket-container");

const lottoTicket = (lotto) => {
  const numbers = lotto.join(", ");

  return `
    <li class="lotto-ticket">
      <span class="lotto-icon">🎟️</span>
      <span class="lotto-numbers">${numbers}</span>
    </li>
  `;
};

const renderLottoTicket = (lottos) => {
  lottoTicketContainer.innerHTML = `
  <p>총 ${lottos.length}개를 구매하였습니다.</p>
  <ul>
    ${lottos.map((lotto) => lottoTicket(lotto)).join("")}
  </ul>`;
};
