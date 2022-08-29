const fetchCurrencies = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchCurrencies;
