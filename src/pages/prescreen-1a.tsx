import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as ObsFuncs from "../library/observable-functions";
import { colors } from "../constants";
import dayjs from "dayjs";

import { useUserState } from "../library/user-state-context";
import { useUserStateActions } from "../library/user-state-actions-context";

import { TextBlock, SEO, Card, WarningBox, H2 } from "../components";

const StyledDatePicker = styled(DatePicker)`
  border: 2px solid ${colors.purple};
  height: 60px;
  font-size: 25px;
  min-width: 230px;
  border-radius: 3px;
  padding-left: 10px;
  &::placeholder {
    font-size: 18px;
    font-family: "Montserrat", sans-serif;
  }
`;

const H4 = styled.h4`
  margin: 5px 0;
`;

const Prescreen1a = () => {
  const userState = useUserState();
  const userStateActions = useUserStateActions();
  const { birthDate, retireDate, fullRetirementAgeYearsOnly, fullRetirementAgeMonthsOnly } = userState;
  const retireDateYear = retireDate ? retireDate.getFullYear() : null;

  const needsSSADetailCalc = retireDateYear && retireDateYear >= 2025;
  if (needsSSADetailCalc) {
    userStateActions.setPreferPiaUserCalc(true);
  }

  const handleDateChange = async (name: string, value: any) => {
    if (value && name === "birthDatePicked") {
      userStateActions.setBirthDate(value);
      const year62 = new Date(value).getFullYear() + 62;
      userStateActions.setYear62(year62);
      let fullRetirementAge = 0;

      /*
        TODO: use the getFullRetirementAge from whichever calculator is picked
       so we dont need to update the tables by hand
       use the raw value because of the delay in setting local/session storage.
       */
      fullRetirementAge = await ObsFuncs.getFullRetirementDateSimple(value);
      setRetireDate(value, fullRetirementAge);
    } else if (value === null) {
      userStateActions.setBirthDate(null);
      userStateActions.setRetireDate(null);
    }
  };

  const setRetireDate = async (dateOfBirth: Date, retireAge: number) => {
    /* dayjs cannot .add() fractional years that we put into the tables 
    but only months, so let us use rounded months. */
    const retireAgeInRoundedMonths = Math.round((await retireAge) * 12);
    const retireDate = dayjs(dateOfBirth).add(retireAgeInRoundedMonths, "month").toDate();
    userStateActions.setRetireDate(retireDate);
  };

  return (
    <div>
      <SEO title='Pre-Screen 1a' keywords={[`gatsby`, `application`, `react`]} />
      <H2>Step 1: Background Information</H2>
      <TextBlock>To calculate your Social Security benefit, please provide your birthdate.</TextBlock>
      <Card>
        <H4>Birthdate</H4>
        <StyledDatePicker
          id='birthDatePicked'
          placeholderText='Click to select a date'
          selected={birthDate}
          showYearDropdown
          openToDate={birthDate || dayjs().subtract(64, "year").toDate()}
          onChange={(value) => handleDateChange("birthDatePicked", value)}
        />
      </Card>
      {retireDateYear && (
        <Card>
          <H4>Retirement Age</H4>
          <div>
            Your Full Retirement Age (FRA) to collect Social Security Benefits is {fullRetirementAgeYearsOnly} years
            {fullRetirementAgeMonthsOnly ? " and " + fullRetirementAgeMonthsOnly + " months " : " "}
            old
            <a href='https://www.ssa.gov/OACT/ProgData/ar_drc.html'>
              <sup>1</sup>
            </a>
            , which is in year {retireDateYear}.
            {needsSSADetailCalc ? (
              <WarningBox>
                <label>
                  Your retirement eligibility may still be too many years away to calculate your benefit without making
                  some assumptions. To help, a recent Social Security&apos;s Trustees Report
                  <a href='https://www.ssa.gov/oact/tr/'>
                    <sup>2</sup>
                  </a>{" "}
                  is built into Detailed Calculator estimates.{" "}
                  <p>
                    At the results page, try the included SSA Detailed Calculator rather than our Windfall Awareness
                    Calculator.
                  </p>
                </label>
              </WarningBox>
            ) : (
              ""
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Prescreen1a;