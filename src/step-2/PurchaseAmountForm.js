const PurchaseAmountForm = {
  render(target) {
    const purchaseAmountForm = document.createElement('form');
    const purchaseAmountInput = document.createElement('input');
    const purchaseButton = document.createElement('button');

    purchaseAmountForm.id = 'purchase-amount-form';
    purchaseAmountForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(purchaseAmountForm);
      const data = Object.fromEntries(formData.entries());
      console.log(data);
    });

    purchaseAmountInput.id = 'purchase-amount-input';
    purchaseAmountInput.type = 'number';
    purchaseAmountInput.name = 'purchaseAmount';

    purchaseButton.id = 'purchase-button';
    purchaseButton.type = 'submit';
    purchaseButton.innerText = '구입';

    purchaseAmountForm.appendChild(purchaseAmountInput);
    purchaseAmountForm.appendChild(purchaseButton);

    target.appendChild(purchaseAmountForm);
  },
};
export default PurchaseAmountForm;
