import React from "react"
import { ButtonLink, Form, Input, SEO } from "../components"

const Screen1 = () => (
    <>
        <SEO title="Page one" />
        <h2>Screen 1!</h2>
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
            <br />
            <label> Enter your planned retirement date
                <Input type="date" />
            </label>
        </Form>
        <ButtonLink to="/screen-2/">Submit</ButtonLink>
    </>
);

export default Screen1;
