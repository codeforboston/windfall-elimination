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
            let labelLeft, labelRight, urlLeft, urlRight;

            if (index === -1) return;
            if (index === 0) {
              labelLeft = ""
              labelRight = "Get Started";
              urlLeft = ""
              urlRight = "/prescreen-1a/";
            } else if (location.pathname === "/print/") {
              labelLeft = "Return to Results";
              labelRight = "Continue to Benefit Formula";
              urlLeft = "/screen-2/";
              urlRight = "/screen-2a/";
            } else if (index === LINKSPATH.length - 1) {
              labelLeft = `Previous: ${
                LINKSPATH[index - 1].label[0] +
                LINKSPATH[index - 1].label.slice(1).toLowerCase()
              }`;
              labelRight = "Go Home";
              urlLeft = LINKSPATH[index - 1].path;
              urlRight = "/";
            } else {
              labelLeft = `Previous: ${
                LINKSPATH[index - 1].label[0] +
                LINKSPATH[index - 1].label.slice(1).toLowerCase()
              }`;
              labelRight = `Next: ${
                LINKSPATH[index + 1].label[0] +
                LINKSPATH[index + 1].label.slice(1).toLowerCase()
              }`;
              urlLeft = LINKSPATH[index - 1].path;
              urlRight = LINKSPATH[index + 1].path;
            }

            let labelLeftMobile = index === 0 ? "" : "PREV";
            let labelRightMobile = (
              index === 0 ? "START" :
              index === LINKSPATH.length - 1 ? "HOME" :
              "NEXT"
            );

            return (
              <Fragment>
                {(index !== 0) && (
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
