import restartGame from "./src/view/web/modules/restartGame.js";
import createGameBox from "./src/view/web/layers/gameBox/createGameBox.js";
import createHeader from "./src/view/web/layers/header/header.js";
import createPrizeResultModal from "./src/view/web/layers/modal/createPrizeResultModal.js";
import readLottoPriceInput from "./src/view/web/modules/readLottoPriceInput.js";

const startGame = () => {
  document.addEventListener("DOMContentLoaded", () => {
    createHeader();
    createGameBox();
    createPrizeResultModal();

    readLottoPriceInput();
    restartGame();
  });
};

export default startGame;
