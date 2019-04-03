import React from "react"
import { Link } from "gatsby"
import { LinkWrapper, SEO } from "../components";

export default () => (
    <>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h2>DEMO</h2>
        <h3>This is a demo of the Windfall Elimination Project.<br/>Check out our demo or the admin page!</h3>
        <LinkWrapper>
            <Link to="/admin/">Admin</Link>
            <Link to="/prescreen-1/">Demo</Link>
            <a href="https://github.com/codeforboston/windfall-elimination">Github Repo</a>
        </LinkWrapper>
    </>
)
