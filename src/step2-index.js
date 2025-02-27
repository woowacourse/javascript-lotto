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

getPurchasePrice();
