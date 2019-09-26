import React from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql, Link } from "gatsby";
import { Location } from "@reach/router";
import { Header, QuestionProvider } from "../components";
import "./layout.css";
import { colors, fonts, spacing } from "../constants";
import { ProgressTracker } from "../components/progress-tracker";
import { ObservableRuntime, FontLayout } from "../components";

const Wrapper = styled("div")`
  font-family: ${fonts.Helvetica};
`;

const Container = styled("div")`
  font-family: ${fonts.Helvetica};
  display: flex;
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
  display: inline;
  color: ${colors.white};
  padding: ${spacing[1]};
`;

const Layout: React.FC = ({ children }) => (
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
        <link href="https://fonts.googleapis.com/css?family=Montserrat|Oswald|Raleway|Roboto&display=swap" rel="stylesheet"/>
        <Container>
        <Location>
          {({ location }) => (
            <ProgressTracker
              linkProps={[
                {path: "/", label: "Home"},
                {path: "/prescreen-1a/", label: "Background"},
                {path: "/prescreen-1b/", label: "Earnings"},
                {path: "/prescreen-1c/", label: "Employment History"},
                {path: "/screen-2/", label: "Results"}
              ]}
              activePath={location.pathname}
            />
          )}
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
        </Container>
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