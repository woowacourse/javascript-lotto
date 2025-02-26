import { getPrice } from "../controller/getInputWIthRetryWeb.js";

const buyButton = document.querySelector(".buyButton");

const buyLotto = () => {
  buyButton.addEventListener("click", () => {
    const price = getPrice();
    if (price === undefined) return;

    document.dispatchEvent(new CustomEvent("priceUpdated", { detail: price }));
    console.log("입력한 금액:", price);
  });
};

export default buyLotto;
