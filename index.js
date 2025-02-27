import restartGame from "./src/view/web/modules/restartGame.js";
import createGameBox from "./src/view/web/layers/gameBox/createGameBox.js";
import createHeader from "./src/view/web/layers/header/header.js";
import createPrizeResultModal from "./src/view/web/layers/modal/createPrizeResultModal.js";
import readLottoPriceInput from "./src/view/web/modules/readLottoPriceInput.js";
import createFooter from "./src/view/web/layers/footer/footer.js";

const startGame = () => {
  document.addEventListener("DOMContentLoaded", () => {
    createHeader();
    createFooter();
    createGameBox();
    createPrizeResultModal();

    readLottoPriceInput();
    restartGame();
  });
};

export default startGame;
