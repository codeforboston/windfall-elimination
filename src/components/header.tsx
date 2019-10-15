import { Link } from "gatsby";
import React from "react";
import styled from "@emotion/styled";
import { FontPad } from "../components";

const Wrapper = styled("header")`
  background: #433A74;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  font-family: 'Montserrat', sans-serif;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

export const Header = () => (
  <Wrapper>
    <div
      style={{
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`
      }}
    >
      <h1 style={{ margin: 0 }}>
        <StyledLink
          to="/"
        >
          Windfall Awareness Calculator
        </StyledLink>
      </h1>
    </div>
  </Wrapper>
);
