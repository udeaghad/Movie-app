import {InvBaseURL, reqStarURL} from './api_manager.js'

const btnCommentClicked = async(e) => {
  //fetch data from API
  let id = e.target.id;
  
  const request = new Request(`${reqStarURL}${id}`);
  const response = await fetch(request);
  const displayStar= await response.json();

  console.log(displayStar)
  //create modal fromthe API
  const modalContainer = document.querySelector('article')
  const modal = document.createElement('div');
    modal.classList.add('modal')
    modal.classList.toggle('show')
    modal.innerHTML = `
        <div class='modal-item'>
        <img src='${displayStar.imageUrl }' alt='${displayStar.image}'>
        <span class='close'>&times;</span>
        <ul class=""actor-details>
        <li>FullName: ${displayStar.fullName}</li>
        <li class="actor-id">ID: ${displayStar.id}</li>
        <li>FirstName: ${displayStar.firstName}</li>
        <li>LastName: ${displayStar.lastName}</li>
        <li>Title: ${displayStar.title}</li>
        <li>Family: ${displayStar.family}</li>
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

        <button type='button' id='submit'>Comment</button>
        <span class="message"></span>
        

    </form>

        </div>`

        modalContainer.appendChild(modal)

  //create comments dynamically

  const commentRequest = new Request(`${InvBaseURL}comments?item_id=ID: ${id}`);
  const commentResponse = await fetch(commentRequest);
  const showComment= await commentResponse.json();
  
  let numberOfComment
  console.log(showComment)
  if(showComment.length === undefined){
    numberOfComment = 0
  }else {
    numberOfComment = showComment.length
  }

        const displayComment = document.querySelector('.comment-section')
        displayComment.innerHTML = `Comments(${numberOfComment})`
       for (let i = 0; i < showComment.length; i+=1){ 
        
        const createComment = document.createElement('li');
        createComment.classList.add('create-comment');
        createComment.innerHTML = `${showComment[i].creation_date}  ${showComment[i].username}:  ${showComment[i].comment}`
        displayComment.appendChild(createComment)
       }
        
       const closeModal = document.querySelector('.close')
      

        closeModal.addEventListener('click', () =>  modal.remove())
        

};

export default btnCommentClicked;
