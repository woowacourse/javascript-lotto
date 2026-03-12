import { LOTTO_PRICE } from "./constants/lottoInfo";
import LottoController from "./controller/LottoController";
import Validator from "./utils/Validator";
import { renderLottoTicket } from "./view/web/LottoPurchaseView";

const lottoController = new LottoController();

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
    const purchasedLottos = lottoController.issueLottos(lottoCount);
    renderLottoTicket(purchasedLottos);
  } catch (error) {
    alert(error.message);
  }
};

purchaseForm.addEventListener("submit", handlePurchase);
