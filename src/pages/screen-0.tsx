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
                <input type="radio" name="coveredEmployment" value="true"></input>
            </label>
            <label> No 
                <input type="radio" name="coveredEmployment" value="false"></input>
            </label>
            <br />
            <p>Do you have a pension or retirement account?</p>
            <label> Yes
                <input type="radio" name="pensionOrRetirementAccount" value="true"></input>
            </label>
            <label> No 
                <input type="radio" name="pensionOrRetirementAccount" value="false"></input>
            </label>
            <br />
        </Form>
        <Link to="/screen-1/">Submit</Link>
    </>
)

export default IndexPage
