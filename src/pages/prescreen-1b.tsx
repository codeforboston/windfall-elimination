import React from "react"
import { ButtonLink, ButtonLinkRed, Card, Form, HelperText, Message, QuestionText, SEO } from "../components";

export default () => (
    <>
        <SEO title="Prescreen 1b" keywords={[`gatsby`, `application`, `react`]} />
        <h2>Am I affected by WEP?</h2>
        <Form>
            <Card>
                <QuestionText>Did you work in “non-covered” employment?</QuestionText>
                <HelperText>
                    “Non-covered” employment is employment where your employer did not withhold Social Security taxes from your wages. These earnings will not show up on your Social Security earnings statement. [skip ahead to downloading your earnings statement?]
                </HelperText>
                <label> Yes
                    <input type="radio" name="coveredEmployment" value="true"></input>
                </label>
                <label> No
                    <input type="radio" name="coveredEmployment" value="false"></input>
                </label>
            </Card>
            <Card>
                <QuestionText>If yes: Do you have a pension or retirement account?</QuestionText>
                <HelperText>
                    This can be either a monthly pension or a lump sum like a $401K. It can be an employee-contribution-only plan or an employer/employee-matching contribution plan. The important thing is whether you paid Social Security taxes on the money that went into this resource.
                </HelperText>
                <label> Yes
                    <input type="radio" name="pensionOrRetirementAccount" value="true"></input>
                </label>
                <label> No
                    <input type="radio" name="pensionOrRetirementAccount" value="false"></input>
                </label>
            </Card>
            <Message>
                If yes: You are probably affected by WEP. Proceed to the next screen.
            </Message>
            <Message>
                If no: Congratulations! You’re probably not affected by WEP. Make sure that your earnings record is correct with the SSA to make sure you get the right amount of SSA benefits you’re entitled to, and report any significant changes in your income.
            </Message>
        </Form>
        <ButtonLinkRed to="/prescreen-1/">Go back!</ButtonLinkRed>
        <ButtonLink to="/prescreen-2/">Submit</ButtonLink>
    </>
)
