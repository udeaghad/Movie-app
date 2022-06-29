import Logo from '../images/logo-32.png';
import { loadStarList, getLikes } from './api_manager.js';
import btnCommentClicked from './commentBtnClicked.js';

const populateLikes = (likes) => {

}

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
      <span class="hearts" id="h-${star.id}">${x}</span>
    </div>
    <p class="likes" id="l-${star.id}">likes </p>
    <button type="button" class="btn-comment" id="${star.id}">
      comment
    </button>`;
    mainStarList.appendChild(artStars);
    document.getElementById(`h-${star.id}`).addEventListener('click', btnHeartClicked);
    document.getElementById(`${star.id}`).addEventListener('click', btnCommentClicked);
  });
};

const btnHeartClicked = (e) => {
  alert(`Hi like button with id no ${e.target.id} is clicked`);
  e.stopPropagation();
};

const renderUI = () => {
  document.getElementById('logo').src = Logo;
  loadStarList(populateStarList);
  getLikes(populateLikes);
};

export default renderUI;