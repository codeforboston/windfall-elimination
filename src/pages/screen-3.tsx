import React from "react"
import { Link } from "gatsby";

import { SEO } from "../components";

const ThirdPage = () => (
    <>
        <SEO title="Page two" />
        <h1>Screen 3!</h1>
        <p>* WEP-Adjusted MPB</p>
        <p>PIA (slider)</p>
        <p>Visual formula walkthrough?</p>
        <Link to="/">Go Home</Link>
    </>
);

export default ThirdPage;
