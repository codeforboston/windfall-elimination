import React from "react";
import { Link } from "gatsby";
import { LinkWrapper } from "../components";

export default () => (
  <>
    <h1>Admin Page</h1>
    <h2>Links</h2>
    <LinkWrapper>
      <Link to="/data/">Benefit Formula Bendpoints</Link>
      <a href="https://observablehq.com/d/ebb6ecd0d81fc3bf">
        Windfall Awareness Calculator Prototype
      </a>
    </LinkWrapper>
  </>
);
