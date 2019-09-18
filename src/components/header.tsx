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
`;

type Props = {
  siteTitle?: string;
};
export const Header: React.FC<Props> = ({ siteTitle }) => (
  <Wrapper>
    <div
      style={{
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
        >
          {siteTitle || "Windfall Awareness Calculator"}
        </Link>
      </h1>
    </div>
    <FontPad />
  </Wrapper>
);
