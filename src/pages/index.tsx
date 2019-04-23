import React from "react"
import { Link } from "gatsby"
import { LinkWrapper, SEO, ButtonLink } from "../components";

export default () => (
    <>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h2>Windfall Elimination Awareness Demo</h2>
        <p>This is a demo of the Windfall Elimination Project.<br/>Check out our demo or the admin page!</p>
        <LinkWrapper>
            <ButtonLink to="/prescreen-1/">Demo</ButtonLink>
            <Link to="/admin/">Admin</Link>
            <a href="https://github.com/codeforboston/windfall-elimination">Github Repo</a>
        </LinkWrapper>
    </>
)
