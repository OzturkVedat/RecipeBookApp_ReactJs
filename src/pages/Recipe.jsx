import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  DetailsWrapper,
  Info,
  DetailsButton,
} from "../components/StyledComponents.jsx";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${
          import.meta.env.VITE_REACT_APP_API_KEY
        }`
      );
      setDetails(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.id]);

  return (
    <DetailsWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <DetailsButton
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </DetailsButton>
        <DetailsButton
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </DetailsButton>
        {activeTab === "instructions" && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>{" "}
            {/** writing out an html paragraph */}
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                <p>{ingredient.original}</p>
              </li>
            ))}
          </ul>
        )}
      </Info>
    </DetailsWrapper>
  );
}

export default Recipe;
