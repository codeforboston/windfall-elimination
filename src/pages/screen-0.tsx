import React from "react"
import { Link } from "gatsby"

import { Input, Form, SEO } from "../components";

const IndexPage = () => (
    <>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Pre-Screen!</h1>
        <Form>
            <p>Did you work in covered employment?</p>
            <label> Yes
                <input type="checkbox" value="true"></input>
            </label>
            <label> No
                <input type="checkbox" value="false"></input>
            </label>
            <br />
            <p>Do you have a pension or retirement account?</p>
            <label> Yes
                <input type="checkbox" value="true"></input>
            </label>
            <label> No
                <input type="checkbox" value="false"></input>
            </label>
        </Form>
        <Link to="/screen-1/">Submit</Link>
    </>
)

export default IndexPage
