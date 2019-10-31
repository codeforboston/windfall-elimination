import React from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";
import { Header, QuestionProvider, Footer, ButtonLink, ButtonLinkGreen } from "../components";
import "./layout.css";
import { ProgressTracker } from "../components/progress-tracker";
import { FontLayout } from "../components";

const Wrapper = styled("div")`
  display: block;
  position: relative;
`;

const Container = styled("div")`
  font-family: 'Montserrat', sans-serif;
  display: block;
  width: 100vw;
  min-height: 95vh;
  @media (max-width: 767px) {
    overflow: scroll;
    width: 767px;
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

const LINKSPATH = [
  {path: "/", label: "HOME"},
  {path: "/prescreen-1a/", label: "BACKGROUND"},
  {path: "/prescreen-1b/", label: "EARNINGS"},
  {path: "/prescreen-1c/", label: "EMPLOYMENT"},
  {path: "/screen-2/", label: "RESULTS"},
  {path: "/screen-2/", label: "BENEFIT FORMULA"},
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
            if(location.pathname === "/print/"){
              return (
                <ButtonContainer>
                 <ButtonLinkGreen to="/prescreen-1c/">Previous: Employment Status</ButtonLinkGreen>
                 <ButtonLink to="/">Go Home</ButtonLink>
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
        </Container>
      </Wrapper>
    )}
  />
);

export default Layout;