import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";
import { Header, Footer, ButtonLink } from "../components";
import "./layout.css";
import { ProgressTracker } from "../components/progress-tracker";
import { ProgressTrackerMobile} from "../components/progress-tracker-mobile";
import UserStateManager from "../library/user-state-manager";
import { breakPoints } from "../constants";

const Wrapper = styled("div")`
  overflow: hidden;
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
  width: 100%;
  height: 100%;

  /* The following line sets the max width of the design
  breakPoint[5] is around 1440px so that creates whitespace at left */
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
  padding: 1rem 1rem 5rem 1rem;
  @media (min-width: ${breakPoints[2]}) {
    --progress-tracker-width: 14rem;
    margin-left: var(--progress-tracker-width);
    margin-top: 3.75rem;
    padding: 2rem 2rem 5rem;
    width: calc(100% - var(--progress-tracker-width));
  }
  @media (min-width: ${breakPoints[3]}) {
    padding: 3rem 3rem 5rem;
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
  {path: "/", label: "Home"},
  {path: "/prescreen-1a/", label: "Background"},
  {path: "/prescreen-1b/", label: "Earnings"},
  {path: "/prescreen-1c/", label: "Employment Status"},
  {path: "/prescreen-1d/", label: "Future Earnings"},
  {path: "/screen-2/", label: "Results"},
  {path: "/screen-2a/", label: "Benefit Formula"},
  // {path: "/screen-2b/", label: "OVERPAYMENT"},
  // {path: "/screen-2c/", label: "TAKE ACTION"}
];

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
        <link href="https://fonts.googleapis.com/css?family=Merriweather|Montserrat&display=swap" rel="stylesheet"/>
        <Header />

        <Container>
          <Location>
            {({ location }) => (
              <>
                <ProgressTracker
                  activePath={location.pathname}
                  linkProps={LINKSPATH}
                />
                <ProgressTrackerMobile
                  activePath={location.pathname}
                  linkProps={LINKSPATH}
                />
              </>
            )}
          </Location>
          <Main id='child-wrapper'>
            <UserStateManager>
                {children}
            </UserStateManager>
          </Main>
        </Container>

        <Footer>
          <Location>
            {({ location }) => {
              const index = LINKSPATH.findIndex(path => (
                path.path === location.pathname
              ));
              
              var toTitleCase = function (str) {
                str = str.toLowerCase().split(' ');
                for (var i = 0; i < str.length; i++) {
                    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
                }
                return str.join(' ');
            };
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
        </Footer>
    </Wrapper>
    )}
  />
);

export default Layout;
