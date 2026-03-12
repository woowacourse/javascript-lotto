import LottoStore from "./Lotto/LottoStore.js";

const purchaseForm = document.querySelector(".lotto-purchase-form");

let lottos = [];

purchaseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(purchaseForm);
  const purchaseAmount = parseInt(formData.get("purchase-amount"), 10); // TODO: 상수화 하기
  lottos = LottoStore.purchaseLottos(purchaseAmount);

  drawLottoList();
  drawWinningNumbersAndBonusNumber();
});

function drawLottoList() {
  const lottoListBlock = document.querySelector(".lotto-list");

  const lottoListInfo = document.createElement("p");
  lottoListInfo.classList.add("lotto-list__info");
  lottoListInfo.innerText = `총 ${lottos.length}개를 구매하였습니다.`;
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

function drawWinningNumbersAndBonusNumber() {
  const winningNumbersAndBonusNumberBlock = document.querySelector(
    ".lotto-winning-bonus-number",
  );

  const winningNumbersAndBonusNumberInfo = document.createElement("p");
  winningNumbersAndBonusNumberInfo.innerText =
    "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.";
  winningNumbersAndBonusNumberBlock.appendChild(
    winningNumbersAndBonusNumberInfo,
  );

  const winningNumbersAndBonusNumberInputs = document.createElement("div");
  winningNumbersAndBonusNumberInputs.classList.add(
    "lotto-winning-bonus-number__inputs",
  );
  winningNumbersAndBonusNumberBlock.appendChild(
    winningNumbersAndBonusNumberInputs,
  );

  const winningNumbersInput = document.createElement("div");
  winningNumbersInput.classList.add("lotto-winning-bonus-number__winning");
  winningNumbersInput.innerHTML = `
    <label for="">당첨 번호</label>
    <div class="lotto-winning-bonus-number__winning-inputs">
      <input
        type="number"
        name="winning-number"
        class="lotto-winning-bonus-number__input"
      />
      <input
        type="number"
        name="winning-number"
        class="lotto-winning-bonus-number__input"
      />
      <input
        type="number"
        name="winning-number"
        class="lotto-winning-bonus-number__input"
      />
      <input
        type="number"
        name="winning-number"
        class="lotto-winning-bonus-number__input"
      />
      <input
        type="number"
        name="winning-number"
        class="lotto-winning-bonus-number__input"
      />
      <input
        type="number"
        name="winning-number"
        class="lotto-winning-bonus-number__input"
      />
    </div>
  `;
  winningNumbersAndBonusNumberInputs.appendChild(winningNumbersInput);

  const bonusNumberInput = document.createElement("div");
  bonusNumberInput.classList.add("lotto-winning-bonus-number__bonus");
  bonusNumberInput.innerHTML = `
    <label for="">보너스 번호</label>
    <input
      type="number"
      name="bonus-number"
      class="lotto-winning-bonus-number__input"
    />
  `;
  winningNumbersAndBonusNumberInputs.appendChild(bonusNumberInput);
}
