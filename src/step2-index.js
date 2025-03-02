import Main from './web/components/Main/Main.js';
import { MAIN_SELECTORS } from './common/constants/MainConstants.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    new Main(MAIN_SELECTORS.MAIN).render();
  } catch (e) {
    alert(e.message);
  }
});
