import React from "react"
import { Link } from "gatsby"
import { LinkWrapper, SEO } from "../components";

const IndexPage = () => (
    <>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>DEMO</h1>
        <h2>This is a demo of the Windfall Elimination Project.<br/>Check out our demo or the admin page!</h2>
        <LinkWrapper>
            <Link to="/admin/">Admin</Link>
            <Link to="/screen-0/">Demo</Link>
            <a href="https://github.com/codeforboston/windfall-elimination">Github Repo</a>
        </LinkWrapper>
    </>
)

export default IndexPage
