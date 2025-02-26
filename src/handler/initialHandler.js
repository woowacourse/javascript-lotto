import { Button } from "../components/Button.js";
import { LottoNumberInput } from "../components/LottoNumberInput.js";
import { purchaseLotto } from "../step2-index.js";
import { displayComponent } from "../util/displayComponents.js";

export const initialHandler = () => {
  const purchaseButtonProps = { label: "구입", onClick: purchaseLotto, style: "small", name: "purchase" };
  displayComponent(".input-container", LottoNumberInput({ name: "price", style: "large", placeholder: "금액" }));
  displayComponent(".purchase-button-container", Button(purchaseButtonProps));
};
