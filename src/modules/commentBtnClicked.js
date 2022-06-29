const btnCommentClicked = (e) => {
  alert(`Hi comment button with id no ${e.target.id} is clicked`);
  /*  Here you can write the code or call function to pop up Modal window |
      e.target.id is the comment button id which is same as character id  |
  */
  e.stopPropagation();
};

export default btnCommentClicked;