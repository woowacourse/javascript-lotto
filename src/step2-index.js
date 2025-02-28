import LottoMachine from './Model/LottoMachine.js'
import Validate from './Model/Validate.js';

const lottoMachine = new LottoMachine();
let lottos = [];
document.querySelector("#purchase-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const price = document.querySelector("#purchase-input").value;
    Validate.validatePrice(price);
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


const showBtn = document.querySelector('.show-result-btn');
const resultModal = document.querySelector('.dialog');
const closeBtn = document.querySelector('.close-btn');

showBtn.addEventListener('click', () => {
  resultModal.showModal();
})

closeBtn.addEventListener('click', () => {
  resultModal.close();
});
