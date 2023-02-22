import './public/css/reset.css';
import './public/css/index.css';
import LottoGame from './domain/LottoGame';
import ResultModal from './view/ResultModal';
import Header from './view/Header';
import Footer from './view/Footer';
import Section from './view/Section';

const app = document.querySelector('#app');
const header = document.querySelector('header');
const section = document.querySelector('section');
const footer = document.querySelector('footer');

const renderHeader = new Header();
const renderSection = new Section(new LottoGame(), ResultModal);
const renderFooter = new Footer();
renderHeader.render(header);
renderSection.render(section);
renderFooter.render(footer);
