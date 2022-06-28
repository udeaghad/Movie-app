const getList = async () => {
  const baseUrl = 'https://thronesapi.com/api/v2/Characters/';
  const request = new Request(baseUrl);
  const response = await fetch(request);
  const result = await response.json();
  console.log(result);
};

export default getList;