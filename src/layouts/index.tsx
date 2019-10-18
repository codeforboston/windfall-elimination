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
  display: block;
  position: relative;
`;

const Container = styled("div")`
  font-family: 'Montserrat', sans-serif;
  display: block;
  width: 100vw;
  min-height: 100vh;
`;

const Main = styled("main")`
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px 95px 15px;

`;

const FooterLink = styled("footer")`
  display: inline;
  color: ${colors.white};
  padding: ${spacing[1]};
`;

const ContentContainer = styled.div`
min-height: 90vh;
display: flex;
width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 10px auto 10px 23vw;
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    margin: 10px auto 10px 30vw;
  }
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
          <FontLayout>
              {/* TODO test out this provider */}
              <QuestionProvider>{children}</QuestionProvider>
           </FontLayout>
          </Main>
          </ContentContainer>
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
        </Container>
      </Wrapper>
    )}
  />
);

export default Layout;