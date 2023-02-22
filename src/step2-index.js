const Money = require('./domain/model/Money');

/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
require('./style/index.css');

const moneyForm = document.querySelector('.moneyForm');
const moneyAmount = document.querySelector('.moneyAmount');

moneyForm.addEventListener('submit', (event) => {
  event.preventDefault();

  console.log(moneyAmount.value);
  try {
    const money = new Money(moneyAmount.value);
  } catch (error) {
    console.log(error.message);
  }
});
