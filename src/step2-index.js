import Main from './web/components/Main/Main.js';
import { SELECTORS } from './common/constants/WinningResultModalConstants.js';

document.addEventListener('DOMContentLoaded', () => {
  new Main(SELECTORS.MAIN).render();
});
