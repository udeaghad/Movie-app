import Logo from '../images/logo-32.png';
import loadStarList from './api_manager.js';

const populateStarList = (stars) => {
  document.getElementById('throne-stars').textContent = `Throne Stars (${stars.length})`;
  const mainStarList = document.querySelector('main');
  stars.forEach((star, i) => {
    let x = '';
    if (i % 2 === 1) x = '&#9829;';
    else x = '&#9825;';
    const artStars = document.createElement('article');
    artStars.className = 'stars';
    artStars.innerHTML = `<img src="${star.imageUrl}" alt="star" class="img-stars">
    <div class="ct-ph">
      <h2 class="card-title">${star.fullName}</h2>
      <span class="hearts" id="h-${star.fullName}">${x}</span>
    </div>
    <p class="likes" id="l-${star.fullName}">likes </p>
    <button type="button" class="btn-comment" id="${star.fullName}">
      comment
    </button>`;
    mainStarList.appendChild(artStars);
  });
};

const renderUI = () => {
  document.getElementById('logo').src = Logo;
  loadStarList(populateStarList);
};

export default renderUI;