const reqStarURL = 'https://thronesapi.com/api/v2/Characters/';
const StarURL = new Request(reqStarURL);

const InvBaseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ds6TCr8BGZystL3mKFPz/';
const InvLikesUrl = new Request(`${InvBaseURL}likes/`);

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

export { loadStarList, getLikes };