import lottoDashboard from './lottoDashboard/LottoDashboard';
import './main.css';

export default function Main() {
  const main = document.createElement('main');

  main.appendChild(lottoDashboard());
  return main;
}
