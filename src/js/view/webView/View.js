import { $ } from '../../util/dom';

$('.youBought').innerHTML = `
<p>총 <span class="purchaseQuantity"></span>개를 구매하였습니다.</p>
`;

$('.issueLotto').innerHTML = `
<div class="lottos">
    <div class="lotto"></div>
</div>
`;

export const lottoTemplate = (lotto) => {
  return `<div class="lotto"><span class="lottoEmoji">🎟️</span> ${lotto.join(', ')}</div>`;
};

$('.inputNumbersForm').innerHTML = `
<p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
            <div class="inputNumbers">
              <div>
                <p>당첨 번호</p>
                <div>
                  <input class="inputNumber winningNumber-input" />
                  <input class="inputNumber winningNumber-input" />
                  <input class="inputNumber winningNumber-input" />
                  <input class="inputNumber winningNumber-input" />
                  <input class="inputNumber winningNumber-input" />
                  <input class="inputNumber winningNumber-input" />
                </div>
              </div>
              <div class="bonusNumber">
                <p>보너스 번호</p>
                <input class="inputNumber bonusNumberInput" />
              </div>
            </div>
            <div class="checkResult">
              <button class="printResultButton" type="submit">결과 확인하기</button>
            </div>
`;
