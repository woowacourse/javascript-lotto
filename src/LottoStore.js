import PurchaseAmount from "./PurchaseAmount.js";
import InputView from "./ui/InputView.js";


export const purchase = async () => {
  const purchaseAmount = new PurchaseAmount(
    await InputView.readPurchaseAmount()
  ).price;
};


