/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import './step2/public/style.css';

import LottoControllerWeb from './step2/controller/LottoControllerWeb.js';
new LottoControllerWeb();

// import LottoGenerator from './step1/domains/LottoGenerator';
// import LottoPaymentValidator from './step1/validators/LottoPaymentValidator';
// import LottoValidator from './step1/validators/LottoValidator';
// import LottoCalculator from './step1/domains/LottoCalculator';

// // 당첨 가격 입력
// const pr = document.querySelector('.lottoPriceInput');
// const Btn = document.querySelector('.lottoPriceButton');
// const Ul = document.getElementById('generatedLottos');
// const afterBuyLottos = document.querySelector('.afterBuyLottos');
// let generatedLottos;
// let lottoTicket;

// const arrToString = (arr) => {
//   return arr.join(',');
// };

// const createGenerateLottos = (ticketCount, lottoGenerator) => {
//   for (let i = 0; i < ticketCount; i++) {
//     const lottoNumbers = document.createElement('li');
//     const lottos = arrToString(lottoGenerator.generatedLottos[i]);
//     lottoNumbers.innerText = lottos;
//     Ul.appendChild(lottoNumbers);
//   }
// };

// const reset = () => {
//   // P.innerText = '';
//   // afterBuyLottos.style.visibility = 'hidden';
// };

// Btn.addEventListener('click', (event) => {
//   event.preventDefault();

//   try {
//     if (pr.value === '' || pr.value === '0') {
//       throw new Error('로또 구입 금액을 입력해주세요.');
//     }
//     LottoPaymentValidator.validate(pr.value);
//     //TODO : 아무것도 입력 안했을떄 예외처리 추가하기
//     const ticketCount = pr.value / 1000;
//     lottoTicket = ticketCount;

//     if (Ul.hasChildNodes()) {
//       afterBuyLottos.firstChild.remove();
//       while (Ul.firstChild) {
//         Ul.removeChild(Ul.firstChild);
//       }
//     }

//     const lottoGenerator = new LottoGenerator(ticketCount);
//     generatedLottos = lottoGenerator.generatedLottos;
//     console.log(generatedLottos);

//     const ticketCountParagraph = document.createElement('p');
//     ticketCountParagraph.innerText = `총 ${ticketCount}개를 발행했습니다.`;
//     afterBuyLottos?.prepend(ticketCountParagraph);
//     pr.value = '';
//     createGenerateLottos(ticketCount, lottoGenerator);
//     afterBuyLottos.style.visibility = 'visible';
//   } catch (e) {
//     alert(e.message);
//     console.log(e.message);
//   }
// });

// // 당첨번호 입력
// //input 값 2개이상입력 시 다음으로 포커스되는 로직
// // document.ready(() => {
// //   '.inputs'.keyup(function () {
// //     if (this.value.length === this.maxLength) {
// //       this.next('.inputs').focus();
// //     }
// //   });
// // });

// const winningLottos = document.querySelectorAll('.inputWinningLottos');
// const checkResultButton = document.querySelector('.checkResultButton');
// const bonusNumber = document.querySelector('.inputBonusLotto');
// const profit = document.querySelector('.totalProfit');
// const lottoNumbers = {
//   winningNumbers: [],
//   bonusNumber: 0,
// };

// const modal = document.querySelector('.modal');

// //모달에서 당첨 통계 보여주기
// //td 5개 만들어서 당첨통계 넣어주기
// import LOTTO_STATISTICS from './step1/constants/lotto-statistics';
// import LottoControllerWeb from './step2/controller/LottoControllerWeb';
// const winningStatistics = document.getElementById('winningStatistics');

// const makeWinningStatisticsTable = (lottoStatistics) => {
//   for (const key in LOTTO_STATISTICS) {
//     const tr = document.createElement('tr');
//     const td1 = document.createElement('td');
//     const td2 = document.createElement('td');
//     const td3 = document.createElement('td');
//     if (LOTTO_STATISTICS[key].number !== 5 || key !== 'fiveBonus') {
//       td1.innerText = LOTTO_STATISTICS[key].number + '개';
//     } else {
//       td1.innerText = '5개 + 보너스볼';
//     }

//     td2.innerText = LOTTO_STATISTICS[key].price.toLocaleString() + '원';
//     td3.innerText = lottoStatistics[key] + '개';
//     tr.appendChild(td1);
//     tr.appendChild(td2);
//     tr.appendChild(td3);
//     winningStatistics.appendChild(tr);
//   }
// };
// //

// checkResultButton.addEventListener('click', (event) => {
//   try {
//     //reset
//     lottoNumbers.winningNumbers = [];
//     lottoNumbers.bonusNumber = '';
//     // 당첨번호 입력
//     winningLottos.forEach((winningLotto) => {
//       console.log(winningLotto.value);
//       lottoNumbers.winningNumbers.push(Number(winningLotto.value));
//     });
//     LottoValidator.validateWinningNumbers(lottoNumbers.winningNumbers);

//     // 보너스 번호 입력
//     LottoValidator.validateBonusNumber(
//       lottoNumbers.winningNumbers,
//       Number(bonusNumber.value),
//     );
//     lottoNumbers.bonusNumber = Number(bonusNumber.value);

//     // 모달창 띄우기
//     const lottoCalculator = new LottoCalculator(lottoNumbers, generatedLottos);
//     const lottoStatistics = lottoCalculator.lottoStatistics;
//     makeWinningStatisticsTable(lottoStatistics);

//     profit.innerText = `당신의 총 수익률은 ${lottoCalculator.calculateTotalProfit(lottoTicket)}%입니다.`;

//     modal.style.display = 'block';
//   } catch (e) {
//     alert(e.message);
//     console.log(e.message);
//   }
// });

// // 다시시작하기

// const restartButton = document.querySelector('#restartButton');

// restartButton.addEventListener('click', () => {
//   modal.style.display = 'none';
//   window.location.reload();

//   //리셋 ... 만들기
//   bonusNumber.value = '';
// });

// //x버튼

// const close = document.getElementById('close');
// close.addEventListener('click', () => {
//   modal.style.display = 'none';
// });
