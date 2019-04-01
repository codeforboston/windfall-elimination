import React from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql } from "gatsby"
import { Header } from "../components";
import "./layout.css";

const Wrapper = styled("div")`
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto;
    gap: 30px;
    font-family: sans-serif;
    height: 100%;
`;

const Main = styled("main")`
    margin: 15px;
    display: grid;
    justify-content: center;
    align-content: baseline;
    text-align: center;
`;

const ChildrenWrapper = styled("div")`
    max-width: 1000px;
    justify-content: center;
`;

const Footer = styled("footer")`
    background-color: #000;
    color: white;
    width: 100%;
    bottom: 0;
    text-align: center;
    padding: 15px 0;
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
                <Main>
                    <ChildrenWrapper>
                        {children}
                    </ChildrenWrapper>
                </Main>
                <Footer>
                    © {new Date().getFullYear()} | {data.author ? data.author : "Windfall Elimination Project"}
                </Footer>
            </Wrapper>
        )}
    />
);

export default Layout;
