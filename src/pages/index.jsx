import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Input from "../components/input";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Pre-Screen!</h1>
    <form>
      <label>
        Did you work in covered employment?
        <Input />
      </label>
      <br />
      <label>
        Do you have a pension or retirement account?
        <Input />
      </label>
    </form>
    <Link to="/screen-1/">Go to page 1</Link>
  </Layout>
)

export default IndexPage
