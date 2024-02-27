import NUMBER from "../constants/number";
import LottoService from "../domain/LottoService";
import PurchaseAmountValidation from "../validation/purchaseAmount";

const Event = {
    initPurchaseEvent(){
        const puchaseButton = document.querySelector('.lotto-forms')
        puchaseButton.addEventListener('submit', this.purchaseSubmitEvent)
    },

    purchaseSubmitEvent(event = {}){
        event.preventDefault();
        const purchaseInput = document.querySelector('.purchase-input-text').value;
        try{
            PurchaseAmountValidation.validate(purchaseInput);
            const randomLottos = LottoService.getLottos(Number.parseInt(Number(purchaseInput) / NUMBER.LOTTO_PRICE, 10));
        } catch (error){
            this.showErrorMessage('.puchase-error-message', error)
        }
    },

    showErrorMessage(selector, error){
        const errorDvi = document.querySelector(selector);
        errorDvi.innerText = error.message;
    }
}

export default Event;