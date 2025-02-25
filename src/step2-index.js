import createGameBox from "./view/web/layers/gameBox/createGameBox.js";
import createHeader from "./view/web/layers/header/header.js";
import createPrizeResultModal from "./view/web/layers/modal/createPrizeResultModal.js";
import readLottoPriceInput from "./view/web/modules/readLottoPriceInput.js";

const app = () => {
  document.addEventListener("DOMContentLoaded", () => {
    createHeader();
    createGameBox();

    readLottoPriceInput();
    createPrizeResultModal();
  });
};

app();
