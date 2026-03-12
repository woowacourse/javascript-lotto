import LottoStore from "./Lotto/LottoStore.js";

const purchaseForm = document.querySelector(".lotto-purchase-form");

let lottos = [];

purchaseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(purchaseForm);
  const purchaseAmount = parseInt(formData.get("purchase-amount"), 10); // TODO: 상수화 하기
  lottos = LottoStore.purchaseLottos(purchaseAmount);

  drawLottoList();
});

function drawLottoList() {}
