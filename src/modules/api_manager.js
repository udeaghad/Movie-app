const reqStarURL = 'https://thronesapi.com/api/v2/Characters/';
const StarURL = new Request(reqStarURL);

const loadStarList = async (callBack) => {
  const response = await fetch(StarURL);
  const StarList = await response.json();
  callBack(StarList);
};

export default loadStarList;