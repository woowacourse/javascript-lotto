/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import loadComponent from "./ui/loadComponent.js";

loadComponent("main", "./src/ui/html/main.html").then(() => {
  const modalContainer = document.getElementById("modal-container");

  document
    .querySelector("#winning-input-section button")
    .addEventListener("click", () => {
      document.getElementById("modal-container").style.display = "flex";
    });

  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      modalContainer.style.display = "none";
    }
  });
});
