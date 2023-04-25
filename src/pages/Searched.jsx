import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

export let Searched = () => {
  let [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();
  let getSearched = async (name) => {
    let data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    let recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <Grid>
      {searchedRecipes !== undefined && searchedRecipes.length > 0 ? (
        searchedRecipes.map((item) => {
          return (
            <Card key={item.id} style={{ overflow: "hidden" }}>
              <Link to={"/recipe/" + item.id}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })
      ) : (
        <h1>Please check the food name! </h1>
      )}
      {}
    </Grid>
  );
};

let Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2.5rem;
  @media screen and (max-width: 750px) {
    grid-template-columns: 1fr;
  }

  h1 {
    text-align: center;
    color: #c7c754;
  }
`;

let Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
    transition: 0.3s;

    :hover {
      transform: scale(1.2);
      overflow: hidden;
    }
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;
