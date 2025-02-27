import { getPrice } from "../controller/getInputWIthRetryWeb.js";
import priceStore from "../store/priceStore.js";
import reset from "./reset.js";

const buyLotto = () => {
  reset();
  const price = getPrice();
  if (price === undefined) return;

  priceStore.setPrice(price);
  document.dispatchEvent(new CustomEvent("priceUpdated"));
};
export default buyLotto;
