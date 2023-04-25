import "./App.css";
import { Category } from "./components/Category";
import { Search } from "./components/Search";
import { Pages } from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiFoodTruck } from "react-icons/gi";
function App() {
  return (
    <BrowserRouter>
      <Nav className="nav">
        <GiFoodTruck />
        <Logo to={"/"}>Delicious</Logo>
      </Nav>
      <div className="App">
        <Search />
        <Category />
        <Pages />
      </div>
    </BrowserRouter>
  );
}

let Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Poppins", sans-serif;

  ::first-letter {
    color: red;
    font-size: 2.7rem;
  }
`;

let Nav = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  svg {
    font-size: 2.4rem;
  }
`;

export default App;
