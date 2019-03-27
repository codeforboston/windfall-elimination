import React from "react"
import { Link } from "gatsby";

import { Form, Input, SEO } from "../components";

const SecondPage = () => (
    <>
        <SEO title="Page two" />
        <h1>Screen 3!</h1>
        <p>* WEP-Adjusted MPB</p>
        <p>PIA (slider)</p>
        <p>Visual formula walkthrough?</p>
        <Link to="/">Go Home</Link>
    </>
);

export default SecondPage;
