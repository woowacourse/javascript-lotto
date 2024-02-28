import Money from '../domain/model/Money';
import { errorAlert } from '../util/errorAlert';

const $input = document.getElementById('money-input');
const $number = document.getElementById('content-message-number');
const signupForm = document.querySelector('form');
const contentMessage = document.getElementById('content-message');

signupForm.addEventListener('submit', event => {
  event.preventDefault(); // *
  const value = event.target['money-input'].value;

  signUpFormHandler(value);
});

const signUpFormHandler = value => {
  try {
    const money = new Money(value);
    const countNotice = generateCountNotice(money.count);
    signupForm.insertAdjacentHTML('afterend', countNotice);

    //$number.insertAdjacentHTML('afterend', `${money.count}`);
  } catch (err) {
    errorAlert(err);
    $input.value = null;
  }
};

function generateCountNotice(count) {
  return `<div class="content-message" disabled="true">
            총 ${count}개를 구매하였습니다.
          </div>`;
}
