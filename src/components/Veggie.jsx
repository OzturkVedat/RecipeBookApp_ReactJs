import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { SplideWrapper, SplideCard } from "./StyledComponents.jsx";
import { Link } from "react-router-dom";

function Veggie() {
  // basically a copy-paste of the component Popular
  const [veggies, setVeggies] = useState([]);

  const getVeggies = async () => {
    const check = localStorage.getItem("veggies");
    if (check) setVeggies(JSON.parse(check));
    else {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?apiKey=${
            import.meta.env.VITE_REACT_APP_API_KEY
          }&number=9&tags=vegetarian`
        );

        const data = response.data;
        localStorage.setItem("veggies", JSON.stringify(data.recipes));
        setVeggies(data.recipes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    getVeggies();
  }, []);

  const [splideOptions, setSplideOptions] = useState({
    perPage: 4,
    arrows: true,
    pagination: false,
    drag: "free",
  });

  const handleResize = () => {
    if (window.innerWidth <= 760) {
      setSplideOptions((prevOptions) => ({
        ...prevOptions,
        perPage: 3,
      }));
    } else if (window.innerWidth > 1000) {
      setSplideOptions((prevOptions) => ({
        ...prevOptions,
        perPage: 5,
      }));
    } else {
      setSplideOptions((prevOptions) => ({
        ...prevOptions,
        perPage: 4,
      }));
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SplideWrapper>
      <h3>Vegetarian</h3>
      <Splide options={splideOptions}>
        {veggies.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <SplideCard>
              <Link to={"/recipe/" + recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
                <div className="text-container">
                  <p>{recipe.title}</p>
                </div>
              </Link>
            </SplideCard>
          </SplideSlide>
        ))}
      </Splide>
    </SplideWrapper>
  );
}

export default Veggie;
