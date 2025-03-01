import { webLottoController } from "../controller/webLottoController.js";

const restartButton = document.querySelector(".restart-button")
const statisticsModal = document.querySelector(".statistics-modal");
const modalBackdrop = document.querySelector(".modal-backdrop");
const lottoInput = document.querySelector(".lotto-input input");
const winningInputList= document.querySelector(".winning-input-list");
const bonusInput = document.querySelector(".bonus-input input");
const winningForm = document.querySelector(".winning-form");
const purchaseResult = document.querySelector(".lotto-result .small-text");
const lottoTicketListContainer = document.querySelector(".lotto-ticket-list");

export const webGameService = {
  restart() {
    restartButton.addEventListener("click", () => {
        lottoInput.value = "";
        winningInputList.querySelectorAll("input").forEach(input => input.value = "");
        bonusInput.value = "";
        statisticsModal.style.visibility = 'hidden';
        modalBackdrop.style.visibility = 'hidden';
        winningForm.style.visibility = "hidden";
        purchaseResult.textContent = "";
        lottoTicketListContainer.innerHTML = "";

        webLottoController.run()
    });
},
};
