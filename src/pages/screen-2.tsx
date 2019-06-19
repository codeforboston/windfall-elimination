import React from "react"
import { ButtonLink, ButtonLinkRed, SEO, ObservableCell, Card, Message } from "../components";

export default () => (
    <>
        <SEO title="Screen 3" />
        <h2>Further Information</h2>
        <Card>
            <label>
                    <ObservableCell cellname='viewof ageToRetirePicked'/>
                    <ObservableCell cellname='viewof ageToRetireExtraMonthsPicked'/>
            </label>
            <label>
                    Select years of substantial earnings
                    <ObservableCell cellname='viewof yearsSubstantialEarningsPicked' />
            </label>
        </Card>
        <Message>
        <label>
            WEP calculated values
                <ObservableCell cellname='calculationDisplay'/>
         </label>
        </Message>
        <ButtonLinkRed to="/screen-1/">Go back!</ButtonLinkRed>
        <ButtonLink to="/">Go Home</ButtonLink>
    </>
);
