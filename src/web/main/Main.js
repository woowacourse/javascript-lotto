import LottoDashboard from './lottoDashboard/LottoDashboard';
import './main.css';

export default function Main() {
  const main = document.createElement('main');

  main.appendChild(LottoDashboard());
  return main;
}
