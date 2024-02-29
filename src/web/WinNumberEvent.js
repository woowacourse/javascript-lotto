import NUMBER from "../constants/number";
import Modal from "./Modal";

const winNumberEvent = {
    createInputUIWinNumber(){
        const winNumbersBox = document.querySelector('.winnumber-input-box');
        winNumbersBox.innerHTML = `${this.createWinNumberInputBox()}`;
        const resultButton = document.querySelector('.result-button');
        resultButton.addEventListener('click',  Modal.createModal.bind(Modal))
    },

    createWinNumberInputBox(){
        return `
        <div class='winnumber-title'>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
        <div class='input-box'>
        ${this.createWinNumberInput()}
        ${this.createBonusNumber()}
        </div>
        <button class='result-button'>결과를 확인하기</button>
        `
    },

    createWinNumberInput(){
        return`
        
        <div>
            <div>당첨 번호</div>
            ${Array.from({length:NUMBER.LOTTO_LENGTH}, () => `<input class='winnumber-input' type = 'text'/>`).join('')}
        </div>
        `
    },

    createBonusNumber(){
        return`
        <div>
            <div>보너스 번호</div>
            <input class='bonusnumber-input' type = 'text'/>
        </div>
        `
    }
}

export default winNumberEvent;