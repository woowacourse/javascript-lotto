import NUMBER from "../constants/number";
import LottoService from "../domain/LottoService";
import PurchaseAmountValidation from "../validation/purchaseAmount";

const PurchaseEvent = {
    initPurchaseEvent(){
        const puchaseButton = document.querySelector('.lotto-forms');
        puchaseButton.addEventListener('submit', this.purchaseSubmitEvent.bind(this));
    },

    purchaseSubmitEvent(event = {}){
        event.preventDefault();
        const purchaseInput = document.querySelector('.purchase-input-text').value;
        try{
            PurchaseAmountValidation.validate(purchaseInput);
            const randomLottos = LottoService.getLottos(Number.parseInt(Number(purchaseInput) / NUMBER.LOTTO_PRICE, 10));
            this.showRandomLottos('.random-lottos', randomLottos)
        } catch (error){
            this.showErrorMessage('.puchase-error-message', error);
        }
    },

    showErrorMessage(selector, error){
        const errorDvi = document.querySelector(selector);
        errorDvi.innerText = error.message;
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
                ${lottos.map((lotto) => `<li class="random-lotto-list">🎟️ ${lotto.getNumbers().join(', ')}</li>`).join('')}
            </ul>
        </div>
        `
    }
}

export default PurchaseEvent;