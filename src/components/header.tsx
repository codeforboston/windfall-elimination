import { Link } from "gatsby";
import React from "react";
import styled from "@emotion/styled";
import { colors, spacing, fontSizes } from "../constants";
import { HamburgerHelper, FontPad } from "../components";

const Wrapper = styled("header")`
  background: ${colors.white};
  display: flex;
  justify-content: center;
  border-bottom: 2px solid black;
`;

type Props = {
  siteTitle?: string;
};
export const Header: React.FC<Props> = ({ siteTitle }) => (
  <Wrapper>
    <div style={{ float: "left" }}>
      <HamburgerHelper />
    </div>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`
          }}
        >
          {siteTitle || "Windfall Awareness"}
        </Link>
      </h1>
    </div>
    <FontPad />
  </Wrapper>
);
