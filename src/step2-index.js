/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import './css/theme.css';
import './css/style.css';

window.onload = function () {
  const purchaseInputField = document.getElementById('purchaseInputField');
  const purchaseSubmitButton = document.getElementById('purchaseSubmitButton');

  purchaseSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    const inputValue = purchaseInputField.value;
    console.log(`${inputValue}`);
  });
};
