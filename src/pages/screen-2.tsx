import React from "react"
<<<<<<< HEAD
import { ButtonLink, ButtonLinkRed, Form, Input, SEO, ObservableFunction, ObservableDock } from "../components";
=======
import { ButtonLink, ButtonLinkRed, Form, Input, SEO, ObservableCell } from "../components";
>>>>>>> otherrep/master

export default () => (
    <>
        <SEO title="Screen 2" />
        <h2>Screen 2!</h2>
        <Form>
            <label>
                Select your AIME
<<<<<<< HEAD
                <ObservableFunction cellname='viewof AIMEPicked' widgetmax='5000'/>
=======
                <ObservableCell cellname='viewof AIMEPicked'/>
            </label>
            <label>
                Select years of substantial earnings
                <ObservableCell cellname='viewof birthDatePicked' />
>>>>>>> otherrep/master
            </label>

            <label>
                Select years of substantial earnings
<<<<<<< HEAD
                <ObservableFunction cellname='viewof birthDatePicked' widgetmax='50'/>
            </label>
            <label>
                Calculation display
=======
                <ObservableCell cellname='viewof yearsSubstantialEarningsPicked' />
            </label>
            <label>
                <ObservableCell cellname='viewof pensionNonCoveredMonthly'/>
>>>>>>> otherrep/master
            </label>
            <label>
                Enter amount of non-covered pension
                <ObservableCell cellname='viewof retireDatePicked'/>            </label>
            <label>
                Select years of substantial earnings
                <ObservableCell cellname='calculationDisplay' />
            </label>
        </Form>
        <ButtonLinkRed to="/screen-1/">Go back!</ButtonLinkRed>
        <ButtonLink to="/screen-3/">Submit</ButtonLink>
    </>
);
