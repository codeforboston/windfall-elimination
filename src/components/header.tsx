import { Link } from "gatsby";
import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled("header")`
  background: #433A74;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding: .75rem 1rem;
  font-family: 'Merriweather', serif;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const AboutLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 20px;
  line-height: 2;
  vertical-align: middle;
`;

export const Header = () => (
  <Wrapper>
      <h1 style={{ margin: 0 }}>
        <StyledLink
          to="/"
        >
          Social Security Benefit Calculator
        </StyledLink>
      </h1>
      <AboutLink to="/about">About</AboutLink>
  </Wrapper>
);
