import React from "react"
import { Link } from "gatsby"

import { Input, SEO } from "../components";

const SecondPage = () => (
    <>
        <SEO title="Page two" />
        <h1>Screen 2!</h1>
        <p>* Calculated AIME</p>
        <form>
            <label>
                Enter # of years of substantial earnings
        <Input />
            </label>
            <br />
            <label>
                Enter amount of non-covered pension
        <Input />
            </label>
        </form>
        <Link to="/screen-3/">Submit</Link>
    </>
);

export default SecondPage;
