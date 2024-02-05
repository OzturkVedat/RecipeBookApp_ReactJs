import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Grid, CuisineCard } from "../components/StyledComponents.jsx";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams(); // for fetching the corresponding cuisine (parameter we got from routing)

  const getCuisine = async (cuisineName) => {
    try {
      const storedData = localStorage.getItem(`cuisine_${cuisineName}`);

      if (storedData) {
        setCuisine(JSON.parse(storedData));
      } else {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
            import.meta.env.VITE_REACT_APP_API_KEY
          }&number=12&cuisine=${cuisineName}`
        );
        const recipes = response.data.results;
        setCuisine(recipes);

        localStorage.setItem(`cuisine_${cuisineName}`, JSON.stringify(recipes)); // Cache data in localStorage
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]); // mount the corresponding cuisine everytime the routing parameter changes

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((item) => (
        <CuisineCard key={item.id}>
          <Link to={"/recipe/" + item.id}>
            <img src={item.image} alt={item.title} />
          </Link>
          <h4>{item.title}</h4>
        </CuisineCard>
      ))}
    </Grid>
  );
}

export default Cuisine;
