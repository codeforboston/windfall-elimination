import React from "react"
import { ButtonLink, ButtonLinkRed, Card, Form, Input, Message, SEO, TextBlock, HelperText } from "../components"

const Screen1 = () => (
    <>
        <SEO title="Screen 1" />
        <h2>Background information</h2>
        <div>This section will gather some information necessary to calculate your retirement benefits.</div>
        <Form>
            <h3>Demographics</h3>
            <Card>
                <label>
                    What year were you born?
                    <Input type="date"/>
                </label>
                <div>Your full retirement age is: RESULT</div>
                <div>You turned/will turn 62 in: RESULT YEAR</div>
                <HelperText>Because 62 is the earliest you can start to draw your Social Security retirement benefits, the SSA uses the year you turned 62 to calculate your benefits.</HelperText>
            </Card>
            <h3>Financial Information</h3>
            <Card>
                <div>MPB</div>
                <label>
                    Enter the amount the SSA says you will receive in retirement benefits at full retirement age: 
                    <Input />
                </label>
            </Card>
            <Message>
                <div>[if did not upload earnings record]</div>
                The SSA says that <b>without taking into account Windfall Elimination Provision</b>, if you were to retire at your full retirement age, your benefit would be $MPB.
            </Message>
            <Card>
                <div>Years of substantive earnings</div>
                <HelperText>
                    The amount your benefit is reduced in the Windfall Elimination Provision formula depends on how many years you worked in “covered employment,” or how many years you paid into Social Security. Social Security only counts years where you earned a “substantial amount” in covered wages. The amount for “substantial” is set by the Social Security Administration every year.
                    [table of substantial earnings]
                </HelperText>
            </Card>
            <Message>
                [if uploaded earnings record] It looks like you had XYZ years of substantial earnings with the SSA. 
            </Message>
        </Form>
        <ButtonLinkRed to="/prescreen-2/">Go back!</ButtonLinkRed>
        <ButtonLink to="/screen-2/">Submit</ButtonLink>
    </>
);

export default Screen1;
