import React from "react"
import { ButtonLink, ButtonLinkRed, SEO, ObservableCell, Card, Message } from "../components";

export default () => (
    <>
        <SEO title="Screen 3" />
        <h2>Further Information</h2>
        <Message>
        <label>
            WEP calculated values
                <div>If you were NOT affected by the Windfall Elimination Provision, and retired at Full Retirement Age, your benefits would be: </div>
                <div>$<ObservableCell cellname='standardPIA'/> per month</div>
                <div>However, because you are affected by the Windfall Elimination Provision, if you retire at Full Retirement Age, your monthly benefits will be: </div>
                <div>$<ObservableCell cellname='wepPIA'/> per month</div>
                <div>This is a difference of: </div>
                <div>$<ObservableCell cellname='wepDifference'/> per month</div>
         </label>
        </Message>
        <Card>
          However, the Social Security Administration allows you to start taking retirement benefits any time between age 62 and age 70. If you retire before your Full Retirement Age, the Social Security Administration reduces your benefit. If you retire after your Full Retirement Age, the Social Security Administration increases your benefit.

          Use the sliders below to see how when you retire will affect your retirement benefits.
        </Card>
        <Card>
            <div>Windfall Elimination Maximum Payable Benefit calculated: </div>
            <div>$<ObservableCell cellname='wepMPB'/> per month</div>
            <label>
                    <ObservableCell cellname='viewof ageToRetirePicked'/>
                    <ObservableCell cellname='viewof ageToRetireExtraMonthsPicked'/>
            </label>
            <label>
                    Years of substantial earnings
                    <div><ObservableCell cellname='yearsSubstantialEarningsPicked' /></div>
            </label>
        </Card>
        <ButtonLinkRed to="/screen-1/">Go back!</ButtonLinkRed>
        <ButtonLink to="/">Go Home</ButtonLink>
    </>
);
