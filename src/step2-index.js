/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoManager from "./domain/LottoManager";

const getPrice = async () => {
  return new Promise((resolve) => {
    const userInputPrice = document.querySelector(".input-contents input");
    const purchaseButton = document.querySelector(".input-contents button");

    purchaseButton.addEventListener("click", async () => {
      resolve(userInputPrice.value);
    });
  });
};

async function run() {
  while (true) {
    const price = await getPrice();
  }
}
run();
