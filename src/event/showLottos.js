import Ticket from "../domain/Ticket.js";
import lottoStore from "../domain/lottoStore.js";
const showLottos = (count) => {
  const whenBuyed = document.querySelector(".whenBuyed");
  const buyedLottos = document.querySelector(".buyedLottos");
  const text = buyedLottos.querySelector(".text");
  const lottosNumber = buyedLottos.querySelector(".lottosNumber");

  whenBuyed.style.display = "block";
  text.textContent = `총 ${count}개를 구매했습니다.`;

  const lottos = Ticket.createLottos(count);
  lottoStore.setLottos(lottos);
  const ul = document.createElement("ul");
  lottosNumber.appendChild(ul);

  for (let i = 0; lottos.length; i++) {
    const lotto = lottos[i];
    const li = document.createElement("li");
    li.textContent = lotto.getLottoNumbers().join(", ");
    ul.appendChild(li);
  }

  console.log("개수", count);
};

export default showLottos;
