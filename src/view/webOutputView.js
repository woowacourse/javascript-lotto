const purchaseResult = document.querySelector(".lotto-result .small-text");
const lottoTicketListContainer = document.querySelector(".lotto-ticket-list");

export const webOutputView = {
    displayLottoNumber(lottoList){
        purchaseResult.textContent = `총 ${lottoList.length}개 구매했습니다.`;
        lottoTicketListContainer.innerHTML = lottoList
             .map((lotto) => `
                    <div class="lotto-ticket">
                    <p class="ticket-icon">🎟️</p>
                     <p class="ticket-numbers">${lotto.numbers.join(", ")}</p>
                </div>
            `)
            .join("");
    }
}