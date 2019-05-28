import React from "react";
import styled from "@emotion/styled";
import { StaticQuery, graphql, Link } from "gatsby"
import { Header, QuestionProvider } from "../components";
import "./layout.css";
import { colors, fonts, spacing } from "../constants";

const Wrapper = styled("div")`
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto;
    gap: ${spacing[2]};
    font-family: ${fonts.sansSerif};
    height: 100%;
`;

const Main = styled("main")`
    margin: ${spacing[1]};
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
    background-color: ${colors.darkGreen};
    color: ${colors.white};
    width: 100%;
    bottom: 0;
    verical-align: baseline;
    text-align: center;
    padding: ${spacing[1]} 0;
`;

const FooterLink = styled("footer")`
    display: inline;
    color: ${colors.white};
    padding: ${spacing[1]};
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
                        {/* TODO test out this provider */}
                        <QuestionProvider>
                            { children }
                        </QuestionProvider>
                    </ChildrenWrapper>
                </Main>
                <Footer>
                    © {new Date().getFullYear()} | {data.author ? data.author : "Windfall Elimination Project"}
                    <FooterLink><Link to="/admin/">Admin</Link></FooterLink>
                    <FooterLink><a href="https://github.com/codeforboston/windfall-elimination">Github Repo</a></FooterLink>
                </Footer>
            </Wrapper>
        )}
    />
);

export default Layout;
