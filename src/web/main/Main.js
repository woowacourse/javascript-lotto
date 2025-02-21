import lottoDashboard from './lottoDashboard/lottoDashboard';
import './main.css';

export default function Main() {
  const main = document.createElement('main');

  main.appendChild(lottoDashboard());
  return main;
}
