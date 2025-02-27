import Main from './components/Main/Main.js';
import { SELECTORS } from './constants/WinningResultModalConstants.js';

document.addEventListener('DOMContentLoaded', () => {
  new Main(SELECTORS.MAIN).render();
});
