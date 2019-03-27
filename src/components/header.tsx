import { Link } from "gatsby"
import React from "react"
import styled from "@emotion/styled";

const Wrapper = styled("header")`
    background: blue;
    display: flex;
    justify-content: center;
`;

type Props = {
    siteTitle?: string;
}
export const Header: React.FC<Props> = ({ siteTitle }) => (
    <Wrapper>
        <div
            style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1.45rem 1.0875rem`,
            }}
        >
            <h1 style={{ margin: 0 }}>
                <Link
                    to="/"
                    style={{
                        color: `white`,
                        textDecoration: `none`,
                    }}
                >
                    {siteTitle || "Windfall Elimination"}
                </Link>
            </h1>
        </div>
    </Wrapper>
);
