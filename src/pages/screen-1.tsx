import React from "react"
import { Link } from "gatsby"

import { Form, Input, SEO } from "../components"

const SecondPage = () => (
    <>
        <SEO title="Page two" />
        <h1>Screen 1!</h1>
        <Form>
            <label>
                Enter your DOB:
                <Input type="date"/>
            </label>
            <br />
            <label>
                Enter your MPB:
                <Input />
            </label>
        </Form>
        <Link to="/screen-2/">Submit</Link>
    </>
);

export default SecondPage;
