import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";
import { Header, QuestionProvider, Footer, ButtonLink } from "../components";
import "./layout.css";
import { ProgressTracker } from "../components/progress-tracker";
import UserStateManager from "../library/user-state-manager"


const Wrapper = styled("div")`
  display: block;
  overflow: hidden;

  // TEMP: This ensures that mobile users can still scroll horizontally. Replace
  // with "overflow: hidden" once UI is fully responsive. See #180. ~ RM
  overflow-x: scroll;

  position: relative;
`;

const Container = styled("div")`
  font-family: 'Montserrat', sans-serif;
  display: block;
  min-height: 95vh;

  @media (max-width: 767px) {
    overflow: scroll;
    width: 767px;
  }
`;

const ChildWrapper = styled.div`
  margin:  10px 70px 15px 30px;
  padding:  10px 10px 15px 10px;
  flex: 1 1 auto;
  min-width: 0;
`;

const Main = styled("main")`
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px 95px 15px;
  @media (max-width: 767px) {
    overflow: scroll;
    width: 530px;
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

/* There must be an entry for each of these in indexToSessionStorageKeys
    of progress-tracker.tsx */
const LINKSPATH = [
  {path: "/", label: "Home"},
  {path: "/prescreen-1a/", label: "Background"},
  {path: "/prescreen-1b/", label: "Earnings"},
  {path: "/prescreen-1c/", label: "Employment Status"},
  {path: "/screen-2/", label: "Results"},
  {path: "/screen-2a/", label: "Benefit Forumula"}
  // {path: "/screen-2b/", label: "Overpayment"},
  // {path: "/screen-2c/", label: "Take Action"}
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
        <Container>
        <Header />
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
        <Footer>
        <Location>
          {({ location }) => {
            const index = LINKSPATH.findIndex(path => (
              path.path === location.pathname
            ));

            const linkNext = LINKSPATH[index + 1];
            const linkPrev = LINKSPATH[index - 1];
            const isPageFirst = index === 0;
            const isPageLast = index === LINKSPATH.length - 1;
            let labelLeft, labelRight, urlLeft, urlRight;
            let labelLeftMobile = isPageFirst ? "" : "PREV";
            let labelRightMobile = (
              isPageFirst ? "START" : isPageLast ? "HOME" : "NEXT"
            );

            if (index === -1) return null;
            if (isPageFirst) {
              labelLeft = "";
              labelRight = "Get Started";
              urlLeft = "";
              urlRight = "/prescreen-1a/";
            } else if (location.pathname === "/print/") {
              labelLeft = "Return to Results";
              labelRight = "Continue to Benefit Formula";
              urlLeft = "/screen-2/";
              urlRight = "/screen-2a/";
            } else if (isPageLast) {
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
                {(!isPageFirst) && (
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
        </Container>
      </Wrapper>
    )}
  />
);

export default Layout;
