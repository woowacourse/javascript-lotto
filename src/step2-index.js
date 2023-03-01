import './public/css/reset.css';
import './public/css/index.css';
import LottoGame from './domain/LottoGame';
import Header from './components/Header';
import Footer from './components/Footer';
import Section from './components/Section';

const header = document.querySelector('header');
const section = document.querySelector('section');
const footer = document.querySelector('footer');

const renderHeader = new Header();
const renderSection = new Section(new LottoGame());

const renderFooter = new Footer();
renderHeader.render(header);
renderSection.render(section);
renderFooter.render(footer);
