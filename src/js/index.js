import App from './components/App.js';
import { $ } from './utils/dom.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App($('#app'));
  app.execute();
});
