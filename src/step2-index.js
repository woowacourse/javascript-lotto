import createHeader from "./view/layers/header.js";

const app = async () => {
  document.addEventListener("DOMContentLoaded", async () => {
    await createHeader();
  });
};

app();
