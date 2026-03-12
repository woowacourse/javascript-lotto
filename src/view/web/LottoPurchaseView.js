import { LottoTicket } from "../../components/LottoTicket";

export const renderLottoTicket = (lottos) => {
  const lottoTicketContainer = document.querySelector(
    ".lotto-ticket-container",
  );

  lottoTicketContainer.innerHTML = `
  <p>총 ${lottos.length}개를 구매하였습니다.</p>
  <ul>
    ${lottos.map((lotto) => LottoTicket(lotto)).join("")}
  </ul>`;
};
