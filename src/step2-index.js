import LottoMachine from './Model/LottoMachine.js'
import Validate from './Model/Validate.js';
import Winning from './Model/Winning';

const lottoMachine = new LottoMachine();
let price = 0;
let lottos = [];
document.querySelector("#purchase-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const priceInput = document.querySelector("#purchase-input").value;
    Validate.validatePrice(priceInput);
    price = priceInput
    lottos = lottoMachine.generateLotto(price);

    console.log("구매한 로또:", lottos);
    updateLottoUI(lottos);
    document.querySelector(".lotto-display-container").style.display = "block";
    document.querySelector("#purchase-input").value = '';
  } catch (error) {
    document.querySelector(".lotto-display-container").style.display = "none";
    document.querySelector("#purchase-input").value = '';
    alert(error.message);
  }
});

function updateLottoUI(lottos) {
  document.querySelector(".purchase-count-message span").textContent = lottos.length;

  const lottoList = document.querySelector(".lotto-tickets");
  lottoList.innerHTML = "";

  lottos.forEach((lotto) => {
    const lottoItem = document.createElement("li");

    const ticketIcon = document.createElement("span");
    ticketIcon.classList.add("lotto-title");
    ticketIcon.textContent = "🎟️";

    const lottoNumbers = document.createElement("span");
    lottoNumbers.classList.add("lotto-body");
    lottoNumbers.textContent = lotto.numbers.join(", ");

    lottoItem.appendChild(ticketIcon);
    lottoItem.appendChild(lottoNumbers);
    lottoList.appendChild(lottoItem);
  });
}

document.querySelector(".show-result-btn").addEventListener("click", (event) => {
  event.preventDefault();

  try {
    const winningNumbersInput = getWinningNumbers();
    checkIsEmpty(winningNumbersInput);
    Validate.validateWinningNumbers(winningNumbersInput);
    const winningNumbers = winningNumbersInput.map(Number);

    const bonusNumber = getBonusNumber();
    Validate.validateBonusNumber(bonusNumber, winningNumbers);
    console.log("당첨 번호:", winningNumbers);
    console.log("보너스 번호:", bonusNumber);

    const winning = new Winning(winningNumbers, bonusNumber);
    winning.calculateRank(lottos);
    const prizeRate = winning.getCalculatedPrizeRate(price);
    console.log(winning.rankHistory);
    console.log(prizeRate);

    resultModal.showModal();
  } catch (error) {
    console.log(error)
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

function checkIsEmpty(value) {
  if (value.length < 1) {
    throw new Error('[ERROR] 당첨번호를 입력해 주세요.');
  }
}

const resultModal = document.querySelector('.dialog');
const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', () => {
  resultModal.close();
});
