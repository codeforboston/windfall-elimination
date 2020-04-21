import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";
import { Header, QuestionProvider, Footer, ButtonLink } from "../components";
import "./layout.css";
import { ProgressTracker } from "../components/progress-tracker";
import { ProgressTrackerMobile} from "../components/progress-tracker-mobile";
import UserStateManager from "../library/user-state-manager";
import { breakPoints } from "../constants";
import useWindowWidth from "../library/useWindowWidth";

const breakPoint = Number(breakPoints[2].slice(0, -2));


const Wrapper = styled("div")`
  display: block;
  overflow: hidden;

  // TEMP: This ensures that mobile users can still scroll horizontally. Replace
  // with "overflow: hidden" once UI is fully responsive. See #180. ~ RM
  overflow-x: scroll;

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
        <Footer>
        <Location>
          {({ location }) => {
            const index = LINKSPATH.findIndex(path => (
              path.path === location.pathname
            ));

            const linkNext = LINKSPATH[index + 1];
            const linkPrev = LINKSPATH[index - 1];
            const isOnPageFirst = index === 0;
            const isOnPageLast = index === LINKSPATH.length - 1;
            let labelLeft, labelRight, urlLeft, urlRight;
            let labelLeftMobile = isOnPageFirst ? "" : "PREV";
            let labelRightMobile = (
              isOnPageFirst ? "START" : isOnPageLast ? "HOME" : "NEXT"
            );

            if (index === -1) return null;
            if (isOnPageFirst) {
              labelLeft = "";
              labelRight = "Get Started";
              urlLeft = "";
              urlRight = "/prescreen-1a/";
            } else if (location.pathname === "/print/") {
              labelLeft = "Return to Results";
              labelRight = "Continue to Benefit Formula";
              urlLeft = "/screen-2/";
              urlRight = "/screen-2a/";
            } else if (isOnPageLast) {
              labelLeft = `Previous: ${linkPrev.label}`;
              labelRight = "Go Home";
              urlLeft = linkPrev.path;
              urlRight = "/";
            } else {
              labelLeft = `Previous: ${linkPrev.label}`;
              labelRight = `Next: ${linkNext.label}`;
              urlLeft = linkPrev.path;
              urlRight = linkNext.path;
            }

            return (
              <Fragment>
                {(!isOnPageFirst) && (
                  <ButtonLink
                    labelMobile={labelLeftMobile}
                    to={urlLeft}
                  >
                    {labelLeft}
                  </ButtonLink>
                )}
                <ButtonLink
                  isRightmost
                  labelMobile={labelRightMobile}
                  to={urlRight}
                >
                  {labelRight}
                </ButtonLink>
              </Fragment>
            );
          }}
        </Location>
>>>>>>> 89afe346e5a91b219b058e067d720e4fcc2aae95
        </Footer>
      </Wrapper>
    )}
    />
  )
};

export default Layout;
