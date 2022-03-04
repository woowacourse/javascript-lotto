import LottoMachine from '../domains/LottoMachine';
import { validateArrayNumber } from '../validations/utils';
import $ from './utils';

export class LottoModal {
  constructor(view) {
    this.lottoView = view;
  }
  show(machine) {
    const winningNumbers = Array.from(
      document.querySelectorAll('.winning-number-input')
    ).map(({ value }) => Number.parseInt(value));
    try {
      validateArrayNumber(winningNumbers);
      const bonusNumber = winningNumbers.pop();
      machine.calculateGrade(winningNumbers, bonusNumber);
      $('lotto-result-table').replaceChildren();
      $('lotto-result-table').insertAdjacentHTML(
        'beforeend',
        `  <div class="grid table-title"><span>일치 갯수</span><span>당첨금</span><span>당첨 갯수</span></div>
    <div class="grid"><span>3개</span><span>5,000</span><span>${machine.getNumberOfGrade(
      'fifth'
    )}개</span></div>
    <div class="grid"><span>4개</span><span>50,000</span><span>${machine.getNumberOfGrade(
      'fourth'
    )}개</span></div>
    <div class="grid"><span>5개</span><span>1,500,000</span><span>${machine.getNumberOfGrade(
      'third'
    )}개</span></div>
    <div class="grid"><span>5개+보너스볼</span><span>30,000,000</span><span>${machine.getNumberOfGrade(
      'second'
    )}개</span></div>
    <div class="grid"><span>6개</span><span>2,000,000,000</span><span>${machine.getNumberOfGrade(
      'first'
    )}개</span></div>
 `
      );
      $(
        'lotto-result-rate'
      ).textContent = `당신의 총 수익률은 ${machine.profitRate}%입니다.`;
      $('modal').style.display = 'flex';
      this.bindEventsToModalBtn();
    } catch (e) {
      alert(e.message);
    }
  }

  bindEventsToModalBtn() {
    $('modal-close').addEventListener('click', this.closeModal.bind(this));
    $('restart').addEventListener('click', this.restart.bind(this));
  }
  restart() {
    this.closeModal();
    this.lottoView.restart();
  }
  closeModal() {
    $('modal').style.display = 'none';
  }
}
