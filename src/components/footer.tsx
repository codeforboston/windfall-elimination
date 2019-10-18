import { Link } from "gatsby";
import React from "react";
import styled from "@emotion/styled";
import { colors } from "../constants";

const Wrapper = styled("footer")`
  background: rgba(128, 128, 128, 0.3);
  display: flex;
  bottom: 0;
  width: 100%;
  z-index: 2;
  position: absolute;
  min-width: 760px;
`;

type Props = {
  siteTitle?: string;
};

export const Footer = ({ children }) => (
  <Wrapper>
      {children}
  </Wrapper>
);
