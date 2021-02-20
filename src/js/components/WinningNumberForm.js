import Component from '../lib/core/Component.js';

export default class WinningNumberForm extends Component {
  mountTemplate() {
    this.$target.innerHTML = `
      <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
      <div class="d-flex">
        <div>
          <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
          <div>
            <input
              type="number"
              class="winning-number mx-1 text-center"
              name="first"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
              name="second"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
              name="third"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
              name="fourth"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
              name="fifth"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
              name="sixth"
            />
          </div>
        </div>
        <div class="bonus-number-container flex-grow">
          <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
          <div class="d-flex justify-center">
            <input type="number" class="bonus-number text-center" name="bonus"/>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="open-result-modal-button mt-5 btn btn-cyan w-100"
        id="result-button"
      >
        결과 확인하기
      </button>
    `;
  }

  initEvent() {
    this.$target.addEventListener('submit', event => {
      event.preventDefault();

      const {
        first: $first,
        second: $second,
        third: $third,
        fourth: $fourth,
        fifth: $fifth,
        sixth: $sixth,
        bonus: $bonus,
      } = event.target.elements;

      const winningNumber = {
        main: [$first, $second, $third, $fourth, $fifth, $sixth].map(element =>
          Number(element.value)
        ),
        bonus: Number($bonus.value),
      };

      this.props.open.set(true);
      this.props.winningNumber.set(winningNumber);
    });
  }
}
