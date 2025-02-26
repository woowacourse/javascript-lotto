import Ticket from "../domain/Ticket.js";
import lottoStore from "../store/lottoStore.js";
const showLottos = (count) => {
  const whenBuyed = document.querySelector(".whenBuyed");
  whenBuyed.style.display = "flex";
  const buyedLottos = document.querySelector(".buyedLottos");

  const text = document.createElement("div");
  text.classList.add("text");
  buyedLottos.appendChild(text);

  const lottosNumbers = document.createElement("div");
  lottosNumbers.classList.add("lottosNumbers");
  buyedLottos.appendChild(lottosNumbers);

  text.textContent = `총 ${count}개를 구매하였습니다.`;

  const lottos = Ticket.createLottos(count);
  console.log(lottos);
  lottoStore.setLottos(lottos);
  const ul = document.createElement("ul");
  lottosNumbers.appendChild(ul);

  for (let i = 0; i < lottos.length; i++) {
    const lotto = lottos[i];
    console.log(lotto);
    const li = document.createElement("li");
    li.textContent = lotto.getLottoNumbers().join(", ");
    ul.appendChild(li);
  }

  console.log("개수", count);
};

export default showLottos;
