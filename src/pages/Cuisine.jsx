import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export let Cuisine = () => {
  let [cuisine, setCuisine] = useState([]);
  let params = useParams();
  let getCuisine = async (name) => {
    let data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    let recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);
  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {cuisine.map((item) => {
        return (
          <Card key={item.id} style={{ overflow: "hidden" }}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
};

let Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2.5rem;
  @media screen and (max-width: 750px) {
    grid-template-columns: 1fr;
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
    font-size: 1.2rem;
    @media screen and (max-width: 750px) {
      font-size: 0.9rem;
    }
  }
`;
