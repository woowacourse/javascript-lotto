import LottoMachine from './Model/LottoMachine.js'
import Validate from './Model/Validate.js';
import Winning from './Model/Winning';

const lottoMachine = new LottoMachine();
const resultModal = document.querySelector('.dialog');
const closeBtn = document.querySelector('.close-btn');
const purchaseBtn = document.querySelector(".purchase-btn");
let price = 0;
let lottos = [];

document.querySelector("#purchase-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const priceInput = document.querySelector("#purchase-input").value;
    Validate.validatePrice(priceInput);
    price = priceInput
    lottos = lottoMachine.generateLotto(price);

    updateLottoUI(lottos);
    updatePurchaseUI(true);
    purchaseBtn.disabled = true;
  } catch (error) {
    updatePurchaseUI(false);
    alert(error.message);
  }
});

function updateLottoUI(lottos) {
  updateLottoCount(lottos.length);
  renderLottoTickets(lottos);
}

function updateLottoCount(count) {
  document.querySelector(".purchase-count-message span").textContent = count;
}

function renderLottoTickets(lottos) {
  const lottoList = document.querySelector(".lotto-tickets");
  lottoList.innerHTML = ""; // 기존 리스트 초기화

  lottos.forEach((lotto) => {
    lottoList.appendChild(createLottoItem(lotto));
  });
}

function createLottoItem(lotto) {
  const lottoItem = document.createElement("li");

  const ticketIcon = document.createElement("span");
  ticketIcon.classList.add("lotto-title");
  ticketIcon.textContent = "🎟️";

  const lottoNumbers = document.createElement("span");
  lottoNumbers.classList.add("lotto-body");
  lottoNumbers.textContent = lotto.numbers.join(", ");

  lottoItem.appendChild(ticketIcon);
  lottoItem.appendChild(lottoNumbers);
  return lottoItem;
}

function updatePurchaseUI(isPurchased) {
  const lottoDisplayContainer = document.querySelector(".lotto-display-container");
  const purchaseInput = document.querySelector("#purchase-input");

  if (isPurchased) {
    lottoDisplayContainer.style.display = "block";
    purchaseInput.value = "";
    return;
  }
  lottoDisplayContainer.style.display = "none";
  purchaseInput.value = "";
}

document.querySelector(".show-result-btn").addEventListener("click", (event) => {
  event.preventDefault();

  try {
    const { winningNumbers, bonusNumber } = getAndValidateWinningNumbers();
    processWinningResult(winningNumbers, bonusNumber);

    resultModal.showModal();
    resetWinningBonusInput();
  } catch (error) {
    alert(error.message);
  }
});

function getWinningNumbers() {
  const numberInputs = document.querySelectorAll(".winning-numbers-input .number-input");
  return Array.from(numberInputs)
    .map(input => input.value.trim())
    .filter(value => value !== "");
}

function getBonusNumber() {
  return Number(document.querySelector("#bonus-input").value.trim());
}

function resetWinningBonusInput() {
  const numberInputs = document.querySelectorAll(".winning-numbers-input .number-input");
  numberInputs.forEach(input => {
    input.value = '';
  });
  document.querySelector("#bonus-input").value = '';
}

function checkIsEmpty(value) {
  if (value.length < 1) {
    throw new Error('[ERROR] 당첨번호를 입력해 주세요.');
  }
}

function updateWinningTable(rankHistory) {
  document.querySelectorAll(".dialog-container table tr").forEach((row, index) => {
    if (index > 0) {
      const rank = ["fifth", "fourth", "third", "second", "first"][index - 1];
      row.lastElementChild.textContent = `${rankHistory[rank]}개`;
    }
  });
}

function updatePrizeRate(prizeRate) {
  document.querySelector(".winning-rate-result p").textContent =
    `당신의 총 수익률은 ${prizeRate.toFixed(1).toLocaleString()}%입니다.`;
}

function getAndValidateWinningNumbers() {
  const winningNumbersInput = getWinningNumbers();
  checkIsEmpty(winningNumbersInput);
  Validate.validateWinningNumbers(winningNumbersInput);
  const winningNumbers = winningNumbersInput.map(Number);

  const bonusNumber = getBonusNumber();
  Validate.validateBonusNumber(bonusNumber, winningNumbers);

  return { winningNumbers, bonusNumber };
}

function processWinningResult(winningNumbers, bonusNumber) {
  const winning = new Winning(winningNumbers, bonusNumber);
  winning.calculateRank(lottos);
  const prizeRate = winning.getCalculatedPrizeRate(price);

  updateWinningTable(winning.rankHistory);
  updatePrizeRate(prizeRate);
}

closeBtn.addEventListener('click', () => {
  resultModal.close();
});

document.querySelector(".restart-btn").addEventListener("click", () => {
  resetGame();
});

function resetGame() {
  price = 0;
  lottos = [];

  document.querySelector(".lotto-display-container").style.display = "none";
  document.querySelector("#purchase-input").value = "";
  resetWinningBonusInput();
  updateWinningTable({ first: 0, second: 0, third: 0, fourth: 0, fifth: 0 });
  updatePrizeRate(0);
  purchaseBtn.disabled = false;

  resultModal.close();
}