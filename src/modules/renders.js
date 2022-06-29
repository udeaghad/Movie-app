import Logo from '../images/logo-32.png';
import { loadStarList, getLikes, postLike } from './api_manager.js';
import btnCommentClicked from './commentBtnClicked.js';
import starCounts from './counter.js';

const populateLikes = (starLikes) => {
  starLikes.forEach((star, i) => {
    document.getElementById(`l-${i}`).textContent = `Likes ${star.likes}`;
  });
};

const btnHeartClicked = (e) => {
  const newLike = {
    item_id: `${e.target.id}`,
  };
  postLike(newLike);
  getLikes(populateLikes);
  e.stopPropagation();
};

const populateStarList = (stars) => {
  document.getElementById('throne-stars').textContent = `Characters (${starCounts(stars)})`;
  const mainStarList = document.querySelector('main');
  stars.forEach((star) => {
    const artStars = document.createElement('article');
    artStars.className = 'stars';
    artStars.innerHTML = `<img src="${star.imageUrl}" alt="star" class="img-stars">
    <div class="ct-ph">
      <h2 class="card-title">${star.fullName}</h2>
      <button type='button' class="hearts" id="h-${star.id}">&#9829;</button>
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

const renderUI = () => {
  document.getElementById('logo').src = Logo;
  loadStarList(populateStarList);
  getLikes(populateLikes);
};

export default renderUI;