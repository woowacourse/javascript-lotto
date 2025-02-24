import createGameBox from "./view/web/layers/createGameBox.js";
import createHeader from "./view/web/layers/header.js";

const app = async () => {
  document.addEventListener("DOMContentLoaded", async () => {
    await createHeader();
    await createGameBox();
  });
};

app();
