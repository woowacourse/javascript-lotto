import createGameBox from "./view/web/layers/gameBox/createGameBox.js";
import createHeader from "./view/web/layers/header/header.js";
import readLottoPriceInput from "./view/web/modules/readLottoPriceInput.js";

const app = async () => {
  document.addEventListener("DOMContentLoaded", async () => {
    await createHeader();
    await createGameBox();
    readLottoPriceInput();
  });
};

app();
