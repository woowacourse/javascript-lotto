import { createElement } from '../utils/dom';
import LottoDashboard from './lottoDashboard/LottoDashboard';
import './main.css';

export default function Main() {
  const main = createElement('main');

  main.appendChild(LottoDashboard());
  return main;
}
