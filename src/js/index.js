import WebController from "../controller/WebController.js";
import ElementTree from "./ElementTree.js";

const webController = new WebController();

const purchaseButton = document.getElementById("purchase-lotto");

const showPurchaseLottoCount = (lottos) => {
  const lottoListsElement = new ElementTree("div");

  const message = `총 ${lottos.length}개를 구매하였습니다.`;
  lottoListsElement.createNewTag("div", message);

  return lottoListsElement.tags;
};

const showLottoLists = (lottos) => {
  const lottoListsElement = new ElementTree("ul");
  lottos.forEach((lotto) => {
    lottoListsElement.generateTmpStack("li", "");
    lottoListsElement.pushTmpTag("div", "🎟️ ", { class: "ticket-icon" });
    lottoListsElement.pushTmpTag("div", lotto.numbers.join(", "));
    lottoListsElement.flushTmpTag();
  });

  return lottoListsElement.tags;
};

const showInputBonusNumber = () => {
  const bonusNumberElement = new ElementTree("div");
  bonusNumberElement.createNewTag(
    "h2",
    "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
  );

  bonusNumberElement.generateTmpStack("div", "", {
    class: "input-bonus-title",
  });
  bonusNumberElement.pushTmpTag("h2", "당첨 번호");
  bonusNumberElement.pushTmpTag("h2", "보너스 번호");
  bonusNumberElement.flushTmpTag();

  bonusNumberElement.generateTmpStack("div", "", {
    class: "input-bonusball-wrapper",
  });
  Array.from({ length: 6 }).forEach(() =>
    bonusNumberElement.pushTmpTag("input", "", {
      class: "input-winningnumber",
      type: "number",
      min: 1,
      max: 45,
    }),
  );

  bonusNumberElement.pushTmpTag("input", "", {
    class: "input-bonusnumber",
    type: "number",
  });
  bonusNumberElement.flushTmpTag();

  bonusNumberElement.createNewTag("button", "결과 확인하기", {
    class: "check-lotto-result",
  });

  return bonusNumberElement.tags;
};

const purchaseLotto = () => {
  const showPurchaseLottosTag = document.getElementById(
    "purchased-lotto-lists",
  );
  const purchaseAmount = document.getElementById("amount").value;
  const lottos = webController.purchaseLottos(Number(purchaseAmount));

  showPurchaseLottosTag.innerHTML = showPurchaseLottoCount(lottos);
  showPurchaseLottosTag.innerHTML += showLottoLists(lottos);
  showPurchaseLottosTag.innerHTML += showInputBonusNumber();
};

purchaseButton.addEventListener("click", purchaseLotto);
