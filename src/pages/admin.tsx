import React from "react";
import { Link } from "gatsby";
import { Ul } from "../components";

export default () => (
    <>
        <h1>Admin Page</h1>
        <h2>Links</h2>
        <Ul>
            <li><Link to="/data/">Benefit Formula Bendpoints</Link></li>
        </Ul>
    </>
)