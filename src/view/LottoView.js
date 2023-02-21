const moneyForm = document.getElementById("money_form");

function readMoney(event) {
  event.preventDefault();
  const text = document.getElementById("buy_count_text");
  const money = document.getElementById("input_money").value;
  text.innerText = `총${money}개를 구매했습니다.`;
  // return money;
}

moneyForm.addEventListener("submit", readMoney);

const LottoView = {
  readMoney(event) {
    event.preventDefault();
    const text = document.getElementById("buy_count_text");
    const money = document.getElementById("input_money").value;
    text.innerText = `총${money}개를 구매했습니다.`;
    // return money;
  },
  
  

};

module.exports = LottoView;
