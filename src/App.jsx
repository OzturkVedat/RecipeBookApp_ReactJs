import Pages from "./pages/Pages.jsx";
import Category from "./components/Category.jsx";
import Search from "./components/Search.jsx";

import { BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";

function App() {
  return (
    <BrowserRouter>
      <Nav>
        <GiKnifeFork />
        <Logo to={"/"}>deliciousss</Logo>
        <div>
          <SignButton to="/register/">Sign Up</SignButton>
          <SignButton to="/login/">Log In</SignButton>
        </div>
      </Nav>
      <Search />
      <Category />
      <Pages />
    </BrowserRouter>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.7rem;
  font-weight: 500;
  font-family: "Lobster Two", cursive;
`;
const Nav = styled.div`
  padding: 5%;
  position: relative;
  margin-bottom: 5%;
  svg {
    font-size: 4rem;
  }
  div {
    position: absolute;
    right: 0;
    display: flex;
    gap: 5%;
    width: 30%;
  }
`;
const SignButton = styled(Link)`
  background-color: #494949;
  color: #fff;
  padding: 3% 6%;
  font-size: 1.1rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
`;

export default App;
