import { getPrice } from "../controller/getInputWIthRetryWeb.js";
import priceStore from "../store/priceStore.js";
import reset from "./reset.js";

const buyButton = document.querySelector(".buyButton");

buyButton.addEventListener("click", () => {
  buyLotto();
});

const buyLotto = () => {
  reset();
  const price = getPrice();
  if (price === undefined) return;

  document.dispatchEvent(new CustomEvent("priceUpdated", { detail: price }));
  priceStore.setPrice(price);
  console.log("입력한 금액:", price);
};
export default buyLotto;
