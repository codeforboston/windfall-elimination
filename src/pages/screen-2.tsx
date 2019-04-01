import React from "react"
import { ButtonLink, Form, Input, SEO } from "../components";

const Screen2 = () => (
    <>
        <SEO title="Page two" />
        <h2>Screen 2!</h2>
        <p>* Calculated AIME</p>
        <Form>
            <label>
                Enter # of years of substantial earnings
                <Input />
            </label>
            <label>
                Enter amount of non-covered pension
                <Input />
            </label>
        </Form>
        <ButtonLink to="/screen-3/">Submit</ButtonLink>
    </>
);

export default Screen2;
