import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import "./popularStyle.css";

export let Popular = () => {
  let [popular, setpopular] = useState([]);
  let getPopular = async () => {
    let check = localStorage.getItem("popular");

    if (check) {
      setpopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      let data = await api.json();

      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setpopular(data.recipes);
    }
  };
  useEffect(() => {
    getPopular();
  }, []);
  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "20rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title}></img>
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
};

let Wrapper = styled.div`
  margin: 4rem 0rem;
  h3 {
    @media screen and (max-width: 750px) {
      font-size: 1.1rem;
      text-align: center;
    }
  }
`;

let Card = styled.div`
  height: 300px;
  width: 300px;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  @media screen and (max-width: 750px) {
    height: 150px;
    width: 150px;
  }

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 750px) {
      font-size: 0.7rem;
    }
  }
`;

let Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;
