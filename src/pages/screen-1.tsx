import React from "react";
import {
  ButtonLink,
  ButtonLinkRed,
  Card,
  Form,
  Input,
  Message,
  SEO,
  TextBlock,
  HelperText,
  ObservableCell
} from "../components";

export default () => (
    <>
        <SEO title="Screen 1" />
        <h2>Financial Information</h2>
        <div>This section will gather some information necessary to calculate your retirement benefits.</div>
        <Form>
            <Card>
                <div>MPB</div>
                <label>
                    Enter the amount the SSA says you will receive in retirement benefits at full retirement age: 
                    <ObservableCell cellname='viewof MBPFullRetirementPicker' />
                </label>
            </Card>
            <Card>
                <div>Years of substantive earnings</div>
                <HelperText>
                    ADDDDDD WIDGETS
                    The amount your benefit is reduced in the Windfall Elimination Provision formula depends 
                    on how many years you worked in “covered employment,” or how many years you paid into 
                    Social Security. Social Security only counts years where you earned a “substantial amount” 
                    in covered wages. The amount for “substantial” is set by the Social Security Administration 
                    every year.
                </HelperText>
            </Card>
        </Form>
        <ButtonLinkRed to="/prescreen-2/">Go back!</ButtonLinkRed>
        <ButtonLink to="/screen-2/">Submit</ButtonLink>
    </>
);
