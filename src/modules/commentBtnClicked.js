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
        <span class='close'>&times;</span>
        <img class='star-image' src='${displayStar.imageUrl}' alt='${displayStar.image}'>
        <h3 class='display-name'>${displayStar.fullName}</h3>
        <ul class="actor-details">        
        <li class="actor-id">ID_${displayStar.id}</li>
        <li class='display-firstname'>FirstName: ${displayStar.firstName}</li>
        <li class='display-lastname'>LastName: ${displayStar.lastName}</li>
        <li class='display-title'>Title: ${displayStar.title}</li>
        <li class='display-family'>Family: ${displayStar.family}</li>
        </ul>

        <ul class='comment-section'></ul>  

        <form class='add-comment' action="#" method="post">
        <h3>Add a comment</h3>
        <div class='name-field'>
            <label for="name"></label>
            <input type="text" name="name" id="name" placeHolder='Your Name'>
        </div>

        <div class ='text-field'>
            <label for="name"></label>
            <textarea name="comment" id="comment" placeholder="Your Insight"></textarea>
        </div>

        <button class='btn-comment'type='button' id='ID_${id}'>Comment</button>
        <span class="message"></span>
        

    </form>

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
  const commentHeading = document.createElement('h2');
  commentHeading.classList.add('comment-heading');
  commentHeading.innerHTML = `Comments(${numberOfComment})`;

  displayComment.appendChild(commentHeading);

  for (let i = 0; i < showComment.length; i += 1) {
    const createComment = document.createElement('li');
    createComment.classList.add('create-comment');
    createComment.innerHTML = `${showComment[i].creation_date}  ${showComment[i].username}:  ${showComment[i].comment}`;
    displayComment.appendChild(createComment);
  }

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  modalContainer.appendChild(overlay);

  const closeModal = document.querySelector('.close');
  closeModal.addEventListener('click', () => {
    modal.remove();
    overlay.remove();
  });

  const submitBtn = document.getElementById(`ID_${id}`);
  submitBtn.addEventListener('click', submitComment);
};

export default btnCommentClicked;
