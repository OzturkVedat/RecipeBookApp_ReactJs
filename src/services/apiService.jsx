import axios from 'axios';

const fetchRecipes = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export { fetchRecipes };