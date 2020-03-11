import React from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";
import { Header, QuestionProvider, Footer, ButtonLink, ButtonLinkGreen } from "../components";
import "./layout.css";
import { ProgressTracker } from "../components/progress-tracker";
import UserStateManager from "../library/user-state-manager"
import { breakPoints } from "../constants";

const Wrapper = styled("div")`
  display: block;
  position: relative;
  display: flex;
  justify-center: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Container = styled("div")`
  font-family: 'Montserrat', sans-serif;
  display: block;
  min-height: 95vh;
  max-width: ${breakPoints[4]};
  width: 100%;
  height: 100%;
`;

const ChildWrapper = styled.div`
  margin:  10px 70px 15px 30px;
  padding:  10px 10px 15px 10px;
  flex: 1 1 auto;
  min-width: 0;
  display: flex;

  @media (max-width: 767px) {
    display: block;
    margin: 10px;
    padding: 0;
  }

`;

const Main = styled("main")`
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px 95px 15px;
  @media (max-width: 767px) {
    overflow: scroll;
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  min-height: 90vh;
  display: flex;
  width: 100%;
  @media (max-width: 1024px) {
    min-height: 94vh;
}
`;

const ButtonContainer = styled.div`
  margin: 10px auto 10px 20vw;
  @media (max-width: 1024px) {
    display: flex;
    width: 100%;
    margin: 10px 10px 10px 21.5vw;
  }
  @media (max-width: 768px) {
    display: flex;
    width: 100vw;
    margin: 10px 10px 10px 28.5vw;
  }
`;

/* There must be an entry for each of these in indexToSessionStorageKeys
    of progress-tracker.tsx */
const LINKSPATH = [
  {path: "/", label: "HOME"},
  {path: "/prescreen-1a/", label: "BACKGROUND"},
  {path: "/prescreen-1b/", label: "EARNINGS"},
  {path: "/prescreen-1c/", label: "EMPLOYMENT STATUS"},
  {path: "/screen-2/", label: "RESULTS"},
  {path: "/screen-2a/", label: "BENEFIT FORMULA"},
  // {path: "/screen-2b/", label: "OVERPAYMENT"},
  // {path: "/screen-2c/", label: "TAKE ACTION"}
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

      <Container>
      <link href="https://fonts.googleapis.com/css?family=Merriweather|Montserrat&display=swap" rel="stylesheet"/>
      <ContentContainer>
        <Location>
          {({ location }) => (
            <ProgressTracker
              linkProps={LINKSPATH}
              activePath={location.pathname}
            />
          )}
        </Location>
        <Main id='child-wrapper'>
          <UserStateManager>
            {/* TODO test out this provider */}
            <QuestionProvider>
              <ChildWrapper>
                {children}
              </ChildWrapper>
            </QuestionProvider>
          </UserStateManager>
        </Main>
      </ContentContainer>
      </Container>

        <Footer>
        <Location>
        {({ location }) => {
          const index = LINKSPATH.findIndex(path => path.path === location.pathname)
          if(location.pathname === "/print/"){
            return (
              <ButtonContainer>
              <ButtonLinkGreen to="/screen-2/">Return to Results</ButtonLinkGreen>
              <ButtonLink to="/screen-2a/">Continue to Benefit Formula</ButtonLink>
              </ButtonContainer>
            )
          }
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
            return (
              <ButtonContainer>
              <ButtonLink to="/prescreen-1a/">Get Started</ButtonLink>
              </ButtonContainer>
            )
          }
          return (
            <ButtonContainer>
            <ButtonLinkGreen to={LINKSPATH[index -1].path}>{`Previous: ${LINKSPATH[index -1].label[0] + LINKSPATH[index -1].label.slice(1).toLowerCase()}`}</ButtonLinkGreen>
            <ButtonLink to={LINKSPATH[index +1].path}>{`Next: ${LINKSPATH[index +1].label[0] + LINKSPATH[index +1].label.slice(1).toLowerCase()}` }</ButtonLink>
            </ButtonContainer>
          )
        }}
        </Location>
        </Footer>
      </Wrapper>
    )}
  />
);

export default Layout;
