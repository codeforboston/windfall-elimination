import { Link } from "gatsby";
import React from "react";
import styled from "@emotion/styled";
import { colors } from "../constants";

const Wrapper = styled("footer")`
  background: rgba(128, 128, 128, 0.3);
  display: flex;
  margin: 0 auto;
  max-width: 960;
  padding: 1rem 0 1rem 285px;
`;

type Props = {
  siteTitle?: string;
};

export const Footer = ({ children }) => (
  <Wrapper>
      {children}
  </Wrapper>
);
