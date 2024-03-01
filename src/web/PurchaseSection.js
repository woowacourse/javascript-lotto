import NUMBER from "../constants/number";
import LottoService from "../domain/LottoService";
import PurchaseAmountValidation from "../validation/purchaseAmount";
import WinNumberSection from "./WinNumberSection";

const PurchaseSection = {
    initPurchaseEvent(){
        const puchaseForm = document.querySelector('.puchase-form');
        puchaseForm.addEventListener('submit', this.purchaseSubmitEvent.bind(this));
    },

    purchaseSubmitEvent(event = {}){
        event.preventDefault();
        const purchaseInput = document.querySelector('.purchase-input-text').value;
        try{
            PurchaseAmountValidation.validate(purchaseInput);
            const randomLottos = LottoService.getLottos(Number.parseInt(Number(purchaseInput) / NUMBER.LOTTO_PRICE, 10));
            this.closeErrorMessage('.purchase-error');
            this.showRandomLottos('.random-lottos', randomLottos)
            WinNumberSection.createInputUIWinNumber(randomLottos);
        } catch (error){
            this.showErrorMessage('.purchase-error', error);
        }
    },

    showErrorMessage(selector, error){
        const errorDiv = document.querySelector(selector);
        errorDiv.innerText = error.message;
        
    },

    closeErrorMessage(selector) {
        const errorDiv = document.querySelector(selector);
        errorDiv.innerText = '';
    },

    showRandomLottos(selector = '', lottos = []){
        const randomLottoContainer = document.querySelector(selector);
        randomLottoContainer.innerHTML = this.createRandomLottos(lottos);
    },

    createRandomLottos(lottos = []){
        return `
        <div>
        <div class = "random-lottos-result-title">총 ${lottos.length}개를 구매하였습니다.</div>
            <ul>
                ${lottos.map((lotto) => `<li class="random-lotto-list">🎟️ <span class = 'lotto-list-p'>${lotto.getNumbers().join(', ')}<span></p></li>`).join('')}
            </ul>
        </div>
        `
    }
}

export default PurchaseSection;