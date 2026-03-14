import WebApp from "./controller/WebApp";

window.addEventListener("DOMContentLoaded", () => {
  const webApp = new WebApp();
  webApp.bindEvents();
});
