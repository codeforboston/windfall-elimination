import React from "react"
import { ButtonLink, ButtonLinkRed, ButtonLinkWhite, Card, Form, HelperText, Message, QuestionText, Radio, SEO } from "../components";

export default () => (
    <>
        <SEO title="Prescreen 1b" keywords={[`gatsby`, `application`, `react`]} />
        <Form>
          <h2>Am I affected by WEP?</h2>
            <Card id="question1">
                <QuestionText>Did you work in “non-covered” employment?</QuestionText>
                <HelperText>
                    “Non-covered” employment is employment where your employer did not withhold Social Security taxes from your wages. These earnings will not show up on your Social Security earnings statement. [skip ahead to downloading your earnings statement?]
                </HelperText>
                <ButtonLinkWhite onclick="hideButton()">Yes</ButtonLinkWhite>
                <ButtonLinkWhite id="no">No</ButtonLinkWhite>
                <label> Yes
                    <input type="radio" name="coveredEmployment" value="true" required></input>
                </label>
                <label> No
                    <input type="radio" name="coveredEmployment" value="false"></input>
                </label>
            </Card>
            <Card id="question2">
                <QuestionText>If yes: Do you have a pension or retirement account?</QuestionText>
                <HelperText>
                    This can be either a monthly pension or a lump sum like a $401K. It can be an employee-contribution-only plan or an employer/employee-matching contribution plan. The important thing is whether you paid Social Security taxes on the money that went into this resource.
                </HelperText>
                <label> Yes
                    <input type="radio" name="pensionOrRetirementAccount" value="true" required></input>
                </label>
                <label> No
                    <input type="radio" name="pensionOrRetirementAccount" value="false"></input>
                </label>
            </Card>
            <ButtonLinkRed to="/prescreen-1/">Go back!</ButtonLinkRed>
            <ButtonLink to="/prescreen-2/">Submit</ButtonLink>
        </Form>
    </>
)
