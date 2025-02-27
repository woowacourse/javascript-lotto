import lottoStore from "../store/lottoStore.js";
import appendTextElement from "../utils/appendTextElement.js";
import setPurchaseDetailVisibility from "./setPurchaseDetailVisibility.js";
const showLottos = (count) => {
  setPurchaseDetailVisibility("on");

  const purchasedLottos = document.querySelector(".purchasedLottos");
  appendTextElement(purchasedLottos, `총 ${count}개를 구매하였습니다.`);

  const lottosNumbers = createLottoListElement(lottoStore.getLottos());
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

  img.src = "../../public/lotto.png";
  img.alt = "lotto";

  div.textContent = lotto.getLottoNumbers().join(", ");
  div.classList.add("lottoNumbers");

  li.appendChild(img);
  li.appendChild(div);

  return li;
};
export default showLottos;
