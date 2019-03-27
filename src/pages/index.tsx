import React from "react"
import { Link } from "gatsby"
import { SEO } from "../components";

const IndexPage = () => (
    <>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>DEMO</h1>
        <h2>This is a demo of the Windfall Elimination Project. Check out our demo or the admin page!</h2>
        <ul>
            <li>
                <Link to="/admin/">Admin</Link>
            </li>
            <li>
                <Link to="/screen-0/">Demo</Link>
            </li>
            <li>
                <a href="https://github.com/codeforboston/windfall-elimination">Github Repo</a>
            </li>
        </ul>
    </>
)

export default IndexPage
