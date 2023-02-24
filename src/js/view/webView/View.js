import { $ } from '../../util/dom';

$('header').innerHTML = `
<h1>🎱 행운의 로또</h1>
`;

$('.lottoGame').innerHTML = `
<h1>🎱 내 번호 당첨 확인 🎱</h1>

<form class="purchaseLotto"></form>

<div class="youBought"></div>

<div class="issueLotto"></div>

<div class="inputNumbersLayout">
  <form class="inputNumbersForm"></form>
</div>
`;

$('.purchaseLotto').innerHTML = `
<p>구입할 금액을 입력해 주세요.</p>
<div>
  <input class="moneyInput" placeholder="금액" />
  <button class="purchaseButton" type="submit">구입</button>
</div>`;

$('.youBought').innerHTML = `
<p>총 <span class="purchaseQuantity"></span>개를 구매하였습니다.</p>
`;

$('.issueLotto').innerHTML = `
<div class="lottos">
    <div class="lotto">
    </div>
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

$('footer').innerHTML = `
Copyright 2023. woowacourse
`;
