import { DOM } from "../../utils/DomSelector.js";

export function openModal() {
    DOM.statisticsModal.style.visibility = "visible";
    DOM.modalBackdrop.style.visibility = "visible";
}

function closeModal() {
    DOM.statisticsModal.style.visibility = "hidden";
    DOM.modalBackdrop.style.visibility = "hidden";
}

DOM.closeButton.addEventListener("click", closeModal);
DOM.modalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});
