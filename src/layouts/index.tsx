import React from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";
import { Header, QuestionProvider, Footer, ButtonLink, ButtonLinkGreen } from "../components";
import "./layout.css";
import { ProgressTracker } from "../components/progress-tracker";
import { ProgressTrackerMobile} from "../components/progress-tracker-mobile";
import UserStateManager from "../library/user-state-manager";
import { breakPoints } from "../constants";
import useWindowWidth from "../library/useWindowWidth";

const breakPoint = Number(breakPoints[2].slice(0, -2));

const Wrapper = styled("div")`
  display: block;
  position: relative;
  display: flex;
  justify-center: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  z-index: 1; // Ensures scrollbar isn't clipped by header
`;

const Container = styled("div")`
  display: flex;
  font-family: 'Montserrat', sans-serif;
  min-height: 95vh;
  max-width: ${breakPoints[2]};
  width: 100%;
  height: 100%;
  max-width: ${breakPoints[5]};
`;

const Main = styled("main")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  height: fit-content;
  margin-top: 6rem;
  box-sizing: border-box;
  min-height: calc(100% - 3.75rem);
  margin-left: 0;
  width: 100%;
  padding: 1rem;
  @media (min-width: ${breakPoints[2]}) {
    --progress-tracker-width: 14rem;
    margin-left: var(--progress-tracker-width);
    margin-top: 3.75rem;
    padding: 2rem;
    width: calc(100% - var(--progress-tracker-width));
  }
  @media (min-width: ${breakPoints[3]}) {
    padding: 3rem;
  }
  @media (min-width: ${breakPoints[4]}) {
    --progress-tracker-width: 19.25rem;
    margin-left: var(--progress-tracker-width);
    width: calc(100% - var(--progress-tracker-width));
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
];

const Layout = ({ children }) => {
  const windowWidth = useWindowWidth();

  return (
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
            <link href="https://fonts.googleapis.com/css?family=Merriweather|Montserrat&display=swap" rel="stylesheet"/>
            <Header />

            <Container>
                <Location>
                  {({ location }) => windowWidth >= breakPoint ? (
                    <ProgressTracker
                      activePath={location.pathname}
                      linkProps={LINKSPATH}
                    />
                  ) : (
                    <ProgressTrackerMobile
                      activePath={location.pathname}
                      linkProps={LINKSPATH}
                    />
                  )}
                </Location>
                <Main id='child-wrapper'>
                  <UserStateManager>
                    {/* TODO test out this provider */}
                    <QuestionProvider>
                      {children}
                    </QuestionProvider>
                  </UserStateManager>
                </Main>
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
  )
};

export default Layout;
