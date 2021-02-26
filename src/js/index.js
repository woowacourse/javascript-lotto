import App from './components/App.js';
import reduce from './redux/reducer.js';
import Store from './redux/store.js';
import { $ } from './utils/dom.js';

export const store = new Store();

document.addEventListener('DOMContentLoaded', () => {
  const app = new App($('#app'));
  store.setup(app.states, reduce);
  app.execute();
});
