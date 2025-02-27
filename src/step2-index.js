let purchasePrice = 0;

const getPurchasePrice = () => {
  const purchaseForm = document.getElementById('purchase-form');
  purchaseForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(purchaseForm);
    const inputPurchasePrice = Number(formData.get('purchase-input'));
    purchasePrice = inputPurchasePrice;

    printQuantity(inputPurchasePrice);
  });
};

const printQuantity = (purchasePrice) => {
  const quantity = Math.floor(purchasePrice / 1000);

  const result = document.getElementById('result');
  result.innerHTML = ''; // 기존 내용 초기화
  const div = document.createElement('div');
  div.textContent = `총 ${quantity}개를 구매하였습니다.`;
  result.appendChild(div);

  printLottos(quantity);
};

getPurchasePrice();
