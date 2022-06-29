const reqStarURL = 'https://thronesapi.com/api/v2/Characters/';
const StarURL = new Request(reqStarURL);

const InvBaseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/xawS6iCzVa4Gy6aUEnUI/';
const InvLikesUrl = new Request(`${InvBaseURL}likes/`);

const postLike = async (objLike) => {
  fetch(InvLikesUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objLike),
  })
    .then((response) => response.text())
    .then((likeData) => {
      console.log(likeData);
    });
};

const getLikes = async (callBack) => {
  const response = await fetch(InvLikesUrl);
  const starLikes = await response.json();
  callBack(starLikes);
};

const loadStarList = async (callBack) => {
  const response = await fetch(StarURL);
  const StarList = await response.json();
  callBack(StarList);
};

export { loadStarList, getLikes, postLike, InvBaseURL, reqStarURL };