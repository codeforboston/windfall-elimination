import React from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql, Link } from "gatsby";
import { Location } from "@reach/router";
import { Header, QuestionProvider } from "../components";
import "./layout.css";
import { colors, fonts, spacing } from "../constants";
import { ProgressTracker } from "../components/progress-tracker";
import { ObservableRuntime, FontLayout } from "../components";
import { Flex, Box } from '@rebass/grid/emotion';

const Wrapper = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: ${fonts.Helvetica};
  height: 100%;
`;

const Main = styled("main")`
  margin: ${spacing[1]};
  display: flex;
`;

const ChildrenWrapper = styled("div")`
  max-width: 1000px;
  justify-content: center;
`;

const Footer = styled("footer")`
  background-color: ${colors.white};
  color: ${colors.black};
  border-top: 1px solid black;
  width: 100%;
  bottom: 0;
  verical-align: baseline;
  text-align: center;
  padding: ${spacing[1]} 0;
`;

const FooterLink = styled("footer")`
  background-color: ${colors.white};
  display: inline;
  color: ${colors.black};
  float: left;
  padding-left: 10px;
`;

const Layout: React.FC = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `}
    render={data => (
      <Wrapper>
        <Header />
        <Location>
          <div>
          { location  => (
            <ProgressTracker
              linkProps={[
                {path: "/", label: "HOME"},
                {path: "/prescreen-1c/", label: "BACKGROUND"},
                {path: "/prescreen-2/", label: "EARNINGS"},
                {path: "/prescreen-1b/", label: "Qualification"},
                {path: "/screen-1/", label: "Input Pension"},
                {path: "/screen-2/", label: "RESULTS"}
              ]}
              activePath={location.pathname}
            />
          )}
          </div>
        </Location>
        <ObservableRuntime children={children}>
          <Main>
          <FontLayout>
            <ChildrenWrapper id='child-wrapper'>
              {/* TODO test out this provider */}
              <QuestionProvider>{children}</QuestionProvider>
            </ChildrenWrapper>
           </FontLayout>
          </Main>
        </ObservableRuntime>


        <Footer>
          <FooterLink>
            <Link to="/admin/" style={{ textDecoration: `none`, justify: 'left'}}>Admin Page</Link>
          </FooterLink>
          <FooterLink>
            <a href="https://github.com/codeforboston/windfall-elimination" target="__blank" style={{ textDecoration: `none`,}}>Github</a>
          </FooterLink>

          © {new Date().getFullYear()} | {data.author ? data.author : "Windfall Elimination Project"}
        </Footer>
      </Wrapper>
    )}
  />
);

export default Layout;
