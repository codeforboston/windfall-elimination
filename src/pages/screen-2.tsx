import React from "react"
import { ButtonLink, ButtonLinkRed, SEO, ObservableCell, Card, Message, HelperText } from "../components";
        const unquotedObserverFn = function (name) {
            return {fulfilled: (value) => {
                const node = document.getElementById(name);
                if (node !== null) {
                    node.innerHTML = value;
                    return true;
                } else {
                    return false;
                }
                }
            }
            
        }
export default () => (
    <>
        <SEO title="Screen 3" />
        <h2>Further Information</h2>
        <Message>
        <label>
            WEP calculated values
                <HelperText>If you were NOT affected by the Windfall Elimination Provision, and retired at Full Retirement Age, your benefits would be: </HelperText>
                <strong><code>$<ObservableCell cellname='standardPIA' customObserver={unquotedObserverFn} /> per month</code></strong>
                <HelperText>However, because you are affected by the Windfall Elimination Provision, if you retire at Full Retirement Age, your monthly benefits will be: </HelperText>
                <strong><code>$<ObservableCell cellname='wepPIA' customObserver={unquotedObserverFn}/> per month</code></strong>
                <HelperText>This is a difference of: </HelperText>
                <strong><code>$<ObservableCell cellname='wepDifference' customObserver={unquotedObserverFn}/> per month</code></strong>
         </label>
        </Message>
        <Card>
          However, the Social Security Administration allows you to start taking retirement benefits any time between age 62 and age 70. If you retire before your Full Retirement Age, the Social Security Administration reduces your benefit. If you retire after your Full Retirement Age, the Social Security Administration increases your benefit.

          Use the sliders below to see how when you retire will affect your retirement benefits.
        </Card>
        <Card>
            <div>Windfall Elimination Maximum Payable Benefit calculated: </div>
            <code>$<ObservableCell cellname='wepMPB'  customObserver={unquotedObserverFn}/> per month</code>
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
        <ButtonLink to="/print/">Print Results</ButtonLink>
        <ButtonLink to="/">Go Home</ButtonLink>
    </>
);
