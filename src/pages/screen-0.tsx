import React from "react"
import { Link } from "gatsby"

import { Input, SEO } from "../components";

const IndexPage = () => (
    <>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Pre-Screen!</h1>
        <form>
            <label>
                Did you work in covered employment?
        <Input />
            </label>
            <br />
            <label>
                Do you have a pension or retirement account?
        <Input />
            </label>
        </form>
        <Link to="/screen-1/">Submit</Link>
    </>
)

export default IndexPage
