import React from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql, Link } from "gatsby";
import { Location } from "@reach/router";
import { Header, QuestionProvider, Footer, ButtonLink, ButtonLinkGreen } from "../components";
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

const FooterLink = styled("footer")`
  display: inline;
  color: ${colors.white};
  padding: ${spacing[1]};
`;

const ButtonContainer = styled.div`
`;

const LINKSPATH = [
  {path: "/", label: "HOME"},
  {path: "/prescreen-1a/", label: "BACKGROUND"},
  {path: "/prescreen-1b/", label: "EARNINGS"},
  {path: "/prescreen-1c/", label: "EMPLOYMENT STATUS"},
  {path: "/screen-2/", label: "RESULTS"}
]

const Layout = ({ children }) => (
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
        <link href="https://fonts.googleapis.com/css?family=Merriweather|Montserrat&display=swap" rel="stylesheet"/>
        <Container>
        <Location>
          {({ location }) => (
            <ProgressTracker
              linkProps={LINKSPATH}
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
        <Location>
          {({ location }) => {
            const index = LINKSPATH.findIndex(path => path.path === location.pathname)
            if(index === -1){
              return null;
            }
            if(index === LINKSPATH.length -1){
              return (
              <ButtonContainer>
              <ButtonLinkGreen to={LINKSPATH[index -1].path}>
               {`Previous: ${LINKSPATH[index -1].label[0] + LINKSPATH[index -1].label.slice(1).toLowerCase()}`}
              </ButtonLinkGreen>
              <ButtonLink to="/">Go Home</ButtonLink>
              </ButtonContainer>
              )
            }
            if(index === 0 ){
              return <ButtonLink to="/prescreen-1a/">Get Started</ButtonLink>

            }
            return (
            <React.Fragment>
            <ButtonLinkGreen to={LINKSPATH[index -1].path}>{`Previous: ${LINKSPATH[index -1].label[0] + LINKSPATH[index -1].label.slice(1).toLowerCase()}`}</ButtonLinkGreen>
            <ButtonLink to={LINKSPATH[index +1].path}>{`Next: ${LINKSPATH[index +1].label[0] + LINKSPATH[index +1].label.slice(1).toLowerCase()}` }</ButtonLink>
            </React.Fragment>
          )
          }}
        </Location>
        </Footer>
      </Wrapper>
    )}
  />
);

export default Layout;