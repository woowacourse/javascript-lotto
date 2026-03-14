import LottoRankCalculator from "./Lotto/LottoRankCalculator.js";
import LottoReturnCalculator from "./Lotto/LottoReturnCalculator.js";
import LottoStore from "./Lotto/LottoStore.js";

const purchaseForm = document.querySelector(".lotto-purchase-form");

let lottos = [];
let purchaseAmount = 0;

purchaseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const formData = new FormData(purchaseForm);
    purchaseAmount = parseInt(formData.get("purchase-amount"), 10); // TODO: 상수화 하기
    lottos = LottoStore.purchaseLottos(purchaseAmount);

    drawLottoList();
    drawWinningNumbersAndBonusNumber();
  } catch (error) {
    alert(error.message);
  }
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

  const winningNumbersAndBonusNumberForm = document.createElement("form");
  winningNumbersAndBonusNumberForm.classList.add(
    "lotto-winning-bonus-number__form",
  );
  winningNumbersAndBonusNumberBlock.appendChild(
    winningNumbersAndBonusNumberForm,
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
  winningNumbersAndBonusNumberForm.appendChild(winningNumbersInput);

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
  winningNumbersAndBonusNumberForm.appendChild(bonusNumberInput);

  const submitButton = document.createElement("button");
  submitButton.classList.add("lotto-winning-bonus-number__button");
  submitButton.innerText = "결과 확인하기";
  winningNumbersAndBonusNumberBlock.appendChild(submitButton);

  submitButton.addEventListener("click", () => {
    const form = new FormData(winningNumbersAndBonusNumberForm);
    const winningNumbers = form.getAll("winning-number");
    const bonusNumber = form.get("bonus-number");

    const rank = LottoRankCalculator.calculateLottoRanks({
      lottos,
      winningNumbers,
      bonusNumber,
    });

    const returnAmount = LottoReturnCalculator.calculateReturnAmount(rank);
    const returnRate = LottoReturnCalculator.calculateReturnRate(
      returnAmount,
      purchaseAmount,
    );

    drawLottoResult(rank, returnRate);
  });
}

function drawLottoResult(rank, returnRate) {
  const lottoResultBlock = document.createElement("div");
  lottoResultBlock.classList.add("lotto-result");
  document.body.appendChild(lottoResultBlock);

  const lottoResultDimmed = document.createElement("div");
  lottoResultDimmed.classList.add("lotto-result__dimmed");
  lottoResultBlock.appendChild(lottoResultDimmed);

  const lottoResultContent = document.createElement("div");
  lottoResultContent.classList.add("lotto-result__content");
  lottoResultBlock.appendChild(lottoResultContent);

  const lottoResultCloseButton = document.createElement("button");
  lottoResultCloseButton.classList.add("lotto-result__close-button");
  lottoResultCloseButton.innerHTML = `<img src="/assets/Close.png" alt="닫기" width="14px" />`;
  lottoResultContent.appendChild(lottoResultCloseButton);

  lottoResultCloseButton.addEventListener("click", () => {
    lottoResultBlock.remove();
  });

  const lottoResultTitleWrapper = document.createElement("div");
  lottoResultTitleWrapper.classList.add("lotto-result__title-wrapper");
  lottoResultContent.appendChild(lottoResultTitleWrapper);

  const lottoResultTitle = document.createElement("h2");
  lottoResultTitle.classList.add("lotto-result__title");
  lottoResultTitle.innerText = "🏆 당첨 통계 🏆";
  lottoResultTitleWrapper.appendChild(lottoResultTitle);

  const lottoResultTable = document.createElement("table");
  lottoResultTable.classList.add("lotto-result__table");
  lottoResultContent.appendChild(lottoResultTable);

  const lottoResultTableHeader = document.createElement("thead");
  lottoResultTableHeader.classList.add("lotto-result__table-header");
  lottoResultTable.appendChild(lottoResultTableHeader);

  const lottoResultTableHeaderRow = document.createElement("tr");
  lottoResultTableHeader.appendChild(lottoResultTableHeaderRow);

  // TODO: 상수화 하기
  ["일치 갯수", "당첨금", "당첨 갯수"].forEach((header) => {
    const th = document.createElement("th");
    th.innerText = header;
    lottoResultTableHeaderRow.appendChild(th);
  });

  const lottoResultTableBody = document.createElement("tbody");
  lottoResultTableBody.classList.add("lotto-result__table-body");
  lottoResultTable.appendChild(lottoResultTableBody);

  lottoResultTableBody.innerHTML = `<tbody class="lotto-result__table-body">
          <tr>
            <td>3개</td>
            <td>5,000</td>
            <td>${rank[5] || 0}</td>
          </tr>
          <tr>
            <td>4개</td>
            <td>50,000</td>
            <td>${rank[4] || 0}</td>
          </tr>
          <tr>
            <td>5개</td>
            <td>1,500,000</td>
            <td>${rank[3] || 0}</td>
          </tr>
          <tr>
            <td>5개+보너스볼</td>
            <td>30,000,000</td>
            <td>${rank[2] || 0}</td>
          </tr>
          <tr>
            <td>6개</td>
            <td>2,000,000,000</td>
            <td>${rank[1] || 0}</td>
          </tr>
        </tbody>`;

  const returnRateInfo = document.createElement("p");
  returnRateInfo.classList.add("lotto-result__return-rate");
  returnRateInfo.innerText = `총 수익률은 ${returnRate}%입니다.`;
  lottoResultContent.appendChild(returnRateInfo);
}
