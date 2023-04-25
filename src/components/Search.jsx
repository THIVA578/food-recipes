import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export let Search = () => {
  let [input, setinput] = useState("");
  let navigate = useNavigate();

  let submitHandler = (e) => {
    e.preventDefault();
    navigate("./searched/" + input);
  };
  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          onChange={(e) => {
            setinput(e.target.value);
          }}
          type="text"
          value={input}
        />
      </div>
    </FormStyle>
  );
};

let FormStyle = styled.form`
  div {
    width: 100%;
    position: relative;
  }
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 100%;
    @media screen and (max-width: 750px) {
      height: 40px;
      width: 80%;
      font-size: 1.1rem;
    }
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
    font-size: 1.2rem;

    @media screen and (max-width: 750px) {
      font-size: 0.8rem;
    }
  }
`;
