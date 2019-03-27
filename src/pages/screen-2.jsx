
import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Input from "../components/input";

const SecondPage = () => (
  <Layout>
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
    <Link to="/screen-3/">Go to screen 3!</Link>
  </Layout>
)

export default SecondPage
