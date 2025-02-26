import LottoCompany from "../domain/LottoCompany";
import { LOTTO_LENGTH } from "../lib/constants";
import Validator from "../validator/Validator";
import Component from "./Component";

export default class UserInput extends Component {
  setUp() {
    this.state = {
      winNumbers: new Array(LOTTO_LENGTH).fill(null),
      bonusNumber: null,
    };
  }

  setEvent() {
    this.addEvent(
      "click",
      ".results-button",
      this.handleButtonClick.bind(this)
    );
    this.addEvent(
      "input",
      ".win-number",
      this.handleWinNumberChange.bind(this)
    );
    this.addEvent(
      "input",
      ".bonus-number",
      this.handleBonusNumberChange.bind(this)
    );
  }

  template() {
    return `
     <h2 class="user-input-title body">
            지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
          </h2>
          <section class="user-input-section">
            <article class="user-input-win-article body">
              <span class="body">당첨 번호</span>
              <form>
              ${Array(6)
                .fill(null)
                .map(
                  (_, i) => `
                <input type="number" class="user-input win-number" data-index="${i}" />
              `
                )
                .join("")}
              </form>
            </article>
            <article class="user-input-bonus-article body">
              <span class="body">보너스 번호</span>
              <form class="user-input-bonus-form">
                <input type="number" class="user-input bonus-number" />
              </form>
            </article>
          </section>
          <section class="results-button-layout">
            <button type="button" class="results-button lotto-caption">
              결과 확인하기
            </button>
          </section>
    `;
  }

  handleWinNumberChange(event) {
    const index = event.target.dataset.index;
    const value = Number(event.target.value);
    this.setState({
      winNumbers: [
        ...this.state.winNumbers.slice(0, index),
        value,
        ...this.state.winNumbers.slice(index + 1),
      ],
    });
  }

  handleBonusNumberChange(event) {
    const value = Number(event.target.value);
    this.setState({ bonusNumber: value });
  }

  handleButtonClick() {
    try {
      const { winNumbers, bonusNumber } = this.state;

      // 당첨 번호 유효성 검사
      Validator.validateWinNumbers(winNumbers);
      Validator.validateBonusNumber(bonusNumber, winNumbers);

      // LottoCompany 인스턴스 생성
      const lottoCompany = new LottoCompany(winNumbers, bonusNumber);

      console.log(
        "this.props.lottoList.lottoList",
        this.props.lottoList.lottoList
      );
      // 당첨 결과 계산
      const lottoRanks = lottoCompany.calculateLottoRanks(
        this.props.lottoList.lottoList
      );
      const totalProfit = lottoCompany.calculateTotalProfit(lottoRanks);

      // 결과를 상위 컴포넌트에 전달
      if (this.props.onResult) {
        this.props.onResult({ lottoRanks, totalProfit });
      }
      console.log("lottoRanks", lottoRanks);
      console.log("totalProfit", totalProfit);
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  }
}
