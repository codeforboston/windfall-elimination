import { Link } from "gatsby"
import React from "react"

type Props = {
    siteTitle?: string;
}
export const Header: React.FC<Props> = ({ siteTitle }) => (
    <header
        style={{
            background: `rebeccapurple`,
            marginBottom: `1.45rem`,
        }}
    >
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
                    {siteTitle || "Home"}
                </Link>
            </h1>
        </div>
    </header>
);
