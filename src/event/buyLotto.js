import { getPrice } from "../controller/getInputWIthRetryWeb.js";

const buyButton = document.querySelector(".buyButton");

// buyLotto 함수 정의
const buyLotto = () => {
  buyButton.addEventListener("click", () => {
    const price = getPrice();
    document.dispatchEvent(new CustomEvent("priceUpdated", { detail: price }));
    console.log("입력한 금액:", price);
  });
};

// buyLotto 함수를 기본으로 export
export default buyLotto;
