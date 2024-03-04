import LottoService from "../../domain/LottoService";
import LottoValidation from "../../validation/lottoValidation";
import Error from "../../util/Error";

const ModalSection = {
    addResultButton(event, randomLottos = []) {
        event.preventDefault();
        const winNumbers = Array.from(document.querySelectorAll('.winnumber-input')).map(lotto => Number(lotto.value));
        const bonusNumber = Number(document.querySelector('.bonusnumber-input').value);
        try{
            LottoValidation.validateNumbers(winNumbers);
            LottoValidation.validateBonusNumber(winNumbers, bonusNumber);
            Error.closeMessage('.input-error');
            this.createModal({randomLottos, winNumbers, bonusNumber})
        } catch (error){
            Error.showMessage('.input-error', error)
        }
    },
    
    createModal({randomLottos, winNumbers, bonusNumber}){
        const modalPosition = document.querySelector('.modal');
        const winLotto = LottoService.wrapArrayToLotto(winNumbers);
        const lottoCount = randomLottos.length;
        const [result, rateOfRevenue] = LottoService.calculateResult({randomLottos, winLotto, bonusNumber, lottoCount})
        modalPosition.innerHTML = this.createModalContainer(result, rateOfRevenue)
        const resultButton = document.querySelector('.restart-button');
        resultButton.addEventListener('click', () => this.restart(modalPosition).bind(this))
    },

    restart(){
        location.reload()
    },

    createModalContainer(result = [], rateOfRevenue = 0) {
        return`
        <div class = 'modal-container'>
            <div class = 'modal-contents'>
                <p class='modal-title'>🏆 당첨 통계 🏆</p>
                ${this.createModalTable(result)}
                <div class='total-price'>당신의 총 수익률은 ${rateOfRevenue}%입니다</div>
                <butto class = 'restart-button button'>다시 시작하기</butto>
            </div>
            
        </div>
        `
    },

    createModalTable(result = []){
        return`
        <table class = 'modal-table'>
            <thead>
                <tr>
                    <th>일치 갯수</th>
                    <th>당첨금</th>
                    <th>당첨 갯수</th>
                </tr>
            </thead>
            <tbody>
                ${result.map((value => {
                    const [matchCount, isBonus, price, winCount] = value;
                    const bonusMatch = isBonus ? ' + 보너스 볼' : '';
                    return `
                    <tr>
                        <td>${matchCount}개${bonusMatch}</td>
                        <td>${price.toLocaleString()}</td>
                        <td>${winCount}개</td>
                    </tr>`
                    })).join('')
                }
            </tbody>
        </table>
        `
    }
}
export default ModalSection;
