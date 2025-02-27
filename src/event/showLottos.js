import Ticket from "../domain/Ticket.js";
import lottoStore from "../store/lottoStore.js";
const showLottos = (count) => {
  const purchaseDetail = document.querySelector(".purchaseDetail");
  purchaseDetail.style.display = "flex";

  const purchasedLottos = document.querySelector(".purchasedLottos");

  const text = document.createElement("div");
  text.classList.add("text");
  text.textContent = `총 ${count}개를 구매하였습니다.`;
  purchasedLottos.appendChild(text);

  const lottosNumbers = document.createElement("div");
  lottosNumbers.classList.add("lottosNumbers");
  const ul = document.createElement("ul");
  lottosNumbers.appendChild(ul);

  const lottos = Ticket.createLottos(count);
  lottoStore.setLottos(lottos);

  for (let i = 0; i < lottos.length; i++) {
    const lotto = lottos[i];

    const li = document.createElement("li");
    const div = document.createElement("div");
    const img = document.createElement("img");

    img.src = "../../public/lotto.png";
    img.alt = "lotto";

    div.textContent = lotto.getLottoNumbers().join(", ");
    div.classList.add("lottoNumbers");

    li.appendChild(img);
    li.appendChild(div);
    ul.appendChild(li);
  }

  purchasedLottos.appendChild(lottosNumbers);
};

export default showLottos;
