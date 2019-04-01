import React from "react"
import { ButtonLink, Form, HelperText, QuestionText, SEO, TextBlock } from "../components";

const PreScreen2 = () => (
    <>
        <SEO title="Prescreen" keywords={[`gatsby`, `application`, `react`]} />
        <h2>Getting your earnings record</h2>
        <h3>We'll need some information to get started.</h3>
        <Form>
            <QuestionText>Do you have a MySocialSecurity account?</QuestionText>
            <HelperText>
                If no: you can easily sign up online at this <a href="https://www.ssa.gov/myaccount/">link</a>. Your MySocialSecurity account will let you change your address, change your direct deposit, request an earnings statement or a 1099 form, or apply for a replacement SSA card.
                </HelperText>
            <label> Yes
                <input type="radio" name="mySocialSecurityAccount" value="true"></input>
            </label>
            <label> No
                <input type="radio" name="mySocialSecurityAccount" value="false"></input>
            </label>
            <QuestionText>Do you have a pension or retirement account?</QuestionText>
            <label> Yes
                <input type="radio" name="pensionOrRetirementAccount" value="true"></input>
            </label>
            <label> No
                <input type="radio" name="pensionOrRetirementAccount" value="false"></input>
            </label>
        </Form>
        <ButtonLink to="/screen-1/">Submit</ButtonLink>
    </>
)

export default PreScreen2;
