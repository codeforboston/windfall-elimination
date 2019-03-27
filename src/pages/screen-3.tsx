import React from "react"
import { Link } from "gatsby";

import { Input, SEO } from "../components";

const SecondPage = () => (
    <>
        <SEO title="Page two" />
        <h1>Screen 3!</h1>
        <form>
            <label>
                Enter your DOB:
            <Input />
            </label>
            <br />
            <label>
                Enter your MPB:
            <Input />
            </label>
        </form>
        <Link to="/">Go Home</Link>
    </>
);

export default SecondPage;
