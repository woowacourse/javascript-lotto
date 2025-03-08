import appendTextElement from "../utils/appendTextElement.js";
import setPurchaseDetailVisibility from "../event/setPurchaseDetailVisibility.js";

const showLottos = (lottos) => {
  setPurchaseDetailVisibility(true);

  updatePurchasedLottosUI(lottos);
};

const updatePurchasedLottosUI = (lottos) => {
  const purchasedLottos = document.querySelector(".purchase-detail__lottos");
  appendTextElement(purchasedLottos, `총 ${lottos.length}개를 구매하였습니다.`);

  const lottosNumbers = createLottoListElement(lottos);
  purchasedLottos.appendChild(lottosNumbers);
};

const createLottoListElement = (lottos) => {
  const lottosNumbers = document.createElement("div");
  lottosNumbers.classList.add("lottosNumbers");

  const ul = document.createElement("ul");
  lottos.forEach((lotto) => ul.appendChild(createLottoItem(lotto)));

  lottosNumbers.appendChild(ul);
  return lottosNumbers;
};

const createLottoItem = (lotto) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const img = document.createElement("img");

  img.src = "./lotto.png";
  img.alt = "lotto";

  div.textContent = lotto.getLottoNumbers().join(", ");
  div.classList.add("lottoNumbers");

  li.appendChild(img);
  li.appendChild(div);

  return li;
};
export default showLottos;
