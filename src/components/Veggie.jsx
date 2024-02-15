import { useState, useEffect } from "react";

import RecipeSplide from './RecipeSplide.jsx';
import { fetchRecipes } from '../services/apiService.jsx';

const Veggie = () => {
  const fetchData = async () => {
    return fetchRecipes(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }&number=9&tags=vegetarian`
    );
  };

  const [veggies, setVeggies] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setVeggies(data));
  }, []);

  return <RecipeSplide recipes={veggies} />;
};

export default Veggie;
