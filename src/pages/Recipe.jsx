import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

export let Recipe = () => {
  let [details, setdetails] = useState({});
  let [activeTab, setActiveTab] = useState("instructions");
  let params = useParams();

  let fetchDetails = async () => {
    let data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    let detailData = await data.json();
    setdetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);
  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="recipeimg" />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instruction
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

let DetailWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  height: auto;
  column-gap: 0.4rem;
  @media screen and (max-width: 750px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  div:first-child {
  }
  img {
    width: 300px;
    margin: 0;
    padding: 0;
    border-radius: 30px;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
    @media screen and (max-width: 750px) {
      font-size: 0.95rem;
    }
  }
  li {
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin: auto;
  }

  ul {
    margin: 2rem;
  }
`;

let Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;
  margin-left: 8rem;
  margin-bottom: 1rem;
  @media screen and (max-width: 750px) {
    margin: 0;
    padding: 0.5rem 1rem;
    margin-left: 2rem;
  }
`;
let Info = styled.div`
  margin-top: 1rem;
  p {
    margin-top: 1rem;
    line-height: 1.5rem;
    padding: 0 1rem;
    @media screen and (max-width: 750px) {
      height: auto;
      font-size: 0.8rem;
    }
  }
  p ~ p {
    display: none;
  }

  li {
    @media screen and (max-width: 750px) {
      font-size: 0.8rem;
    }
  }
`;
