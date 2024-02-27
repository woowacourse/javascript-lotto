import WebController from "../controller/WebController.js";
import CreateElement from "./CreateElement.js";

const webController = new WebController();

const purchaseButton = document.getElementById("purchase-lotto");

const purchaseLotto = () => {
  const newParentElement = new CreateElement("div");
  const showPurchaseLottosTag = document.getElementById(
    "purchased-lotto-lists",
  );

  const purchaseAmount = document.getElementById("amount").value;

  const lottos = webController.purchaseLottos(Number(purchaseAmount));
  const message = `총 ${lottos.length}개를 구매하였습니다.`;

  const newUlElement = new CreateElement("ul");
  lottos.forEach((lotto) =>
    newUlElement.createNewTag("li", {
      contents: "🎟️ " + lotto.numbers.join(", "),
    }),
  );

  newParentElement.createNewTag("div", { contents: message });

  showPurchaseLottosTag.innerHTML = newParentElement.tags;
  showPurchaseLottosTag.innerHTML += newUlElement.tags;
};

purchaseButton.addEventListener("click", purchaseLotto);
