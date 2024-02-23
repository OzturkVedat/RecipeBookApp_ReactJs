import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { SplideWrapper, SplideCard } from "./StyledComponents.jsx";

const RecipeSplide = ({ recipes }) => {
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
      <Splide options={splideOptions}>
        {recipes.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <SplideCard>
              <Link to={"/recipe/" + recipe.id}>
                {recipe.image ? (
                  <img src={recipe.image} alt={recipe.title} />
                ) : (
                  <img
                    src={"/food-placeholder.jpg"}
                    alt={"placeholder food img"}
                  />
                )}
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
};
RecipeSplide.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
};
export default RecipeSplide;
