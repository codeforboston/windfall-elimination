import { Link } from "gatsby";
import React from "react";
import styled from "@emotion/styled";
import { colors, spacing, fontSizes } from "../constants";
import { HamburgerHelper, FontPad } from "../components";

const Wrapper = styled("header")`
  background: ${colors.darkGreen};
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
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
            color: `white`,
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
