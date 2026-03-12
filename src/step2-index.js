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

function drawLottoList() {
  const lottoListBlock = document.querySelector(".lotto-list");

  const lottoListInfo = document.createElement("p");
  lottoListInfo.classList.add("lotto-list__info");
  lottoListInfo.textContent = `총 ${lottos.length}개를 구매하였습니다.`;
  lottoListBlock.appendChild(lottoListInfo);

  const lottoListItems = document.createElement("ul");
  lottoListItems.classList.add("lotto-list__items");
  lottoListBlock.appendChild(lottoListItems);

  lottos.forEach((lotto) => {
    const lottoListItem = document.createElement("li");
    lottoListItem.classList.add("lotto-list__item");
    lottoListItem.innerHTML = `<img src="/assets/Lotto.png" alt="로또" width="34px" /> ${lotto.parseNumbers().join(", ")}`;
    lottoListItems.appendChild(lottoListItem);
  });
}
