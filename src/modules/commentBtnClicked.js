import { InvBaseURL, reqStarURL } from './api_manager.js';
import submitComment from './submitNewComment.js';
import { commentCounter } from './counter.js';

const btnCommentClicked = async (e) => {
  // fetch data from API
  const { id } = e.target;

  const request = new Request(`${reqStarURL}${id}`);
  const response = await fetch(request);
  const displayStar = await response.json();

  // create modal fromthe API
  const modalContainer = document.querySelector('article');
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.classList.toggle('show');
  modal.innerHTML = `
        <div class='modal-item'>
        
        <div class='photo-wrapper'>
        <img class='star-image' src='${displayStar.imageUrl}' alt='${displayStar.image}'>
        <h3 class='display-name'>${displayStar.fullName}</h3>
        </div>

        <div class='detail-wrapper'>
        <ul class="actor-details">        
        <li class="actor actor-id">ID_${displayStar.id}</li>
        <li class='actor display-firstname'>FirstName: <span>${displayStar.firstName}</span></li>
        <li class='actor display-lastname'>LastName: <span>${displayStar.lastName}</span></li>
        <li class='actor display-title'>Title: <span>${displayStar.title}</span></li>
        <li class='actor display-family'>Family: <span>${displayStar.family}</span></li>
        </ul>

        <form class='add-comment' action="#" method="post">
        <h3 class='add-heading'>Add a comment</h3>
        <div class='name-field'>
            <label for="name"></label>
            <input type="text" name="name" id="name" placeHolder='Your Name'>
        </div>

        <div class ='text-field'>
            <label for="name"></label>
            <textarea name="comment" id="comment" placeholder="Your Insight"></textarea>
        </div>

        <button class='comment-btn' type='button' id='ID_${id}'>Comment</button>
        <span class="message"></span>      

    </form>

    </div>

        <ul class='comment-section'></ul>  

        <span class='close'>&times;</span>

        </div>`;

  modalContainer.appendChild(modal);

  // create comments section dynamically

  const commentRequest = new Request(`${InvBaseURL}comments?item_id=ID_${id}`);
  const commentResponse = await fetch(commentRequest);
  const showComment = await commentResponse.json();

  let numberOfComment;

  if (commentCounter(showComment) === undefined) {
    numberOfComment = 0;
  } else {
    numberOfComment = commentCounter(showComment);
  }

  const displayComment = document.querySelector('.comment-section');
  const commentHeading = document.createElement('h3');
  commentHeading.classList.add('comment-heading');
  commentHeading.innerHTML = `Comments(${numberOfComment})`;

  displayComment.appendChild(commentHeading);

  for (let i = 0; i < showComment.length; i += 1) {
    const createComment = document.createElement('li');
    createComment.classList.add('create-comment');
    createComment.innerHTML = `<span>${showComment[i].creation_date}</span>  <span>${showComment[i].username}:</span>  <span>${showComment[i].comment}</span>`;
    displayComment.appendChild(createComment);
  }

  const closeModal = document.querySelector('.close');
  closeModal.addEventListener('click', () => modal.remove());

  const submitBtn = document.getElementById(`ID_${id}`);
  submitBtn.addEventListener('click', submitComment);
};

export default btnCommentClicked;
