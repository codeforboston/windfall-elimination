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

const H1 = styled.h1`
  @media (max-width: 767px) {
    font-size: 1rem;
  }
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;
const ExtraLinks = styled("div")`
  justify-content: flex-end
`
const ExtraLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 20px;
  line-height: 2;
  padding-left: 20px;
  padding-right: 10px;
  vertical-align: middle;
`;

export const Header = () => (
  <Wrapper>
      <H1 style={{ margin: 0 }}>
        <StyledLink
          to="/"
        >
          Social Security Benefit Calculator
        </StyledLink>
      </H1>
      <ExtraLinks>
        <ExtraLink to="/about">About</ExtraLink>
        <ExtraLink to="/faq">FAQ</ExtraLink>
      </ExtraLinks>
  </Wrapper>
);
