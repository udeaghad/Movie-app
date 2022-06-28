import Logo from '../images/logo-32.png';

const renderUI = () => {
  document.getElementById('logo').src = Logo;
  document.querySelector('main').style.height = 'calc(100vh - 75px)';
  document.querySelector('main').textContent = 'Hello Kanban Board!';
};

export default renderUI;