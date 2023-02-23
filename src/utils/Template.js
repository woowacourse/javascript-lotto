import { StaticValue } from '../constants/Constants.js';

const generateUserLottoNumbersElement = (numbers) => `
  <li class="user-lotto">
    <p class="lotto-icon">🎟️</p>
    <p class="lotto-numbers">${numbers.join(StaticValue.PRINT_SEPARATOR)}</p>
  </li>
`;

export default generateUserLottoNumbersElement;
