import Main from './web/components/Main/Main.js';
import { SELECTORS } from './common/constants/WinningResultModalConstants.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    new Main(SELECTORS.MAIN).render();
  } catch (e) {
    alert(e.message);
  }
});
