
import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Input from "../components/input";

const SecondPage = () => (
  <Layout>
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
  </Layout>
)

export default SecondPage
