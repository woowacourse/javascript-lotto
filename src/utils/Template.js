import { StaticValue } from '../constants/Constants.js';

const generateUserLottoNumbers = (numbers) => `
  <li class="user-lotto">
    <p class="lotto-icon">🎟️</p>
    <p class="lotto-numbers">${numbers.join(StaticValue.PRINT_SEPARATOR)}</p>
  </li>
`

export { generateUserLottoNumbers };