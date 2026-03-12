import { LottoTicket } from "../../components/LottoTicket";

export const renderLottoTicket = (lottos) => {
  const countText = document.querySelector("#lotto-count-text");
  const lottoList = document.querySelector("#lotto-list");

  countText.textContent = `총 ${lottos.length}개를 구매하였습니다.`;

  lottoList.innerHTML = lottos.map((lotto) => LottoTicket(lotto)).join("");
};
