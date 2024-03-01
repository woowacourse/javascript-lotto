import NUMBER from "../constants/number";
import ModalSection from "./ModalSection";

const WinNumberSection = {
    createInputUIWinNumber(randomLottos = []){
        const winNumbersBox = document.querySelector('.winnumber-input-box');
        winNumbersBox.innerHTML = `${this.createWinNumberInputBox()}`;
        const winNumberForm = document.querySelector('.winnumber-form');
        winNumberForm.addEventListener('submit',  (event) => ModalSection.addResultButton(event, randomLottos))
    },

    createWinNumberInputBox(){
        return `
        <div class='winnumber-title'>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
        <form class= 'winnumber-form'>
        <div class='input-box'>
        ${this.createWinNumberInput()}
        ${this.createBonusNumber()}
        </div>
        <div class= 'input-error error-message'></div>
        <input class='result-button button' type = 'submit' value = '결과를 확인하기'>
        </form>
        `
    },

    createWinNumberInput(){
        return`
        <div>
            <div>당첨 번호</div>
            ${Array.from({length:NUMBER.LOTTO_LENGTH}, () => `<input class='winnumber-input one-number-input' type = 'text'/>`).join('')}
        </div>
        `
    },

    createBonusNumber(){
        return`
        <div>
            <div>보너스 번호</div>
            <input class='bonusnumber-input one-number-input' type = 'text'/>
        </div>
        `
    }
}

export default WinNumberSection;