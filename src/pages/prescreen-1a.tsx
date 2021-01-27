import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as ObsFuncs from "../library/observable-functions";
import { colors } from "../constants";
import dayjs from "dayjs";

import { UserState, useUserState } from '../library/user-state-context'
import { UserStateActions, useUserStateActions } from '../library/user-state-actions-context'

import {
  TextBlock,
  SEO,
  Card,
  WarningBox,
  H2,
} from "../components";

const StyledDatePicker = styled(DatePicker)`
  border: 2px solid ${colors.purple};
  height: 60px;
  font-size: 25px;
  min-width: 230px;
  border-radius: 3px;
  padding-left: 10px;
  &::placeholder {
    font-size: 18px;
    font-family: 'Montserrat',sans-serif;
  }
`;

const H4 = styled.h4`
margin: 5px 0;
`

interface Prescreen1aProps {
  userState: UserState
  userStateActions: UserStateActions
}

class Prescreen1a extends React.Component<Prescreen1aProps, Prescreen1aState> {
  constructor(props, context) {
    super(props, context)
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
  }

  async handleDateChange(name, value) {
    const { userStateActions } = this.props;

    if (value && name === "birthDatePicked") {
      userStateActions.setBirthDate(value)
      var year62 = new Date(value).getFullYear() + 62;
      userStateActions.setYear62(year62)
      var fullRetirementAge = 0;

      //TODO: use the getFullRetirementAge from whichever calculator is picked
      // so we dont need to update the tables by hand
      //use the raw value because of the delay in setting local/session storage.
      fullRetirementAge = await ObsFuncs.getFullRetirementDateSimple(value)
      this.setRetireDate(value, fullRetirementAge)
    } else if (value === null) {
      userStateActions.setBirthDate(null);
      userStateActions.setRetireDate(null);
    }
  }

  async setRetireDate(dateOfBirth, retireAge) {
    const { userStateActions } = this.props
    /* dayjs cannot .add() fractional years that we put into the tables
       but only months, so let us use rounded months. */
      const retireAgeInRoundedMonths = Math.round(await retireAge * 12)
      var retireDate = dayjs(dateOfBirth).add(retireAgeInRoundedMonths, 'month').toDate()
      userStateActions.setRetireDate(retireDate)
    
  }

  //TODO: remove the decimal years and display YY years and MM months.
  //this.friendlyRetirementAge(this.state.birthDate, this.state.retireDate, this.state.retireAge)
  // friendlyRetirementAge(dobDayJS,retireDateString, retireAge) {
  //     if (dobDayJS !== null && retireDateString && retireAge ) {
  //       return dayjs(dobDayJS).diff(dayjs(retireDateString),'months') % Number(retireAge)
  //     } else {
  //       return
  //     }
  //   }

  render() {
    const { userState, userStateActions } = this.props
    const { birthDate, retireDate, fullRetirementAgeYearsOnly, fullRetirementAgeMonthsOnly } = userState
    const retireDateYear = retireDate ? retireDate.getFullYear() : null

    // 1959 doesn't work in 2020 on our WA calculator
    //TODO: determine what the threshold is using retire or birthdate
    const needsSSADetailCalc = retireDateYear && retireDateYear >= 2025;
    if( needsSSADetailCalc ) {
      userStateActions.setPreferPiaUserCalc(true)
    }

    return (
      <div>
        <SEO
          title="Pre-Screen 1a"
          keywords={[`gatsby`, `application`, `react`]}
        />
        <H2>Step 1: Background Information</H2>
        <TextBlock>
          To calculate your Social Security benefit, please input the
          following dates.
            </TextBlock>
        <Card>
          <H4>Birthdate</H4>
          <StyledDatePicker
            id="birthDatePicked"
            placeholderText="Click to select a date"
            selected={birthDate}
            showYearDropdown
            openToDate={
              birthDate ||
              dayjs()
                .subtract(64, "year")
                .toDate()
            }
            onChange={(value) =>
              this.handleDateChange("birthDatePicked", value)
            }
          />
        </Card>
        {retireDateYear && (
          <Card>
            <H4>Retirement Age</H4>
            <div>
              Your Full Retirement Age (FRA) to collect Social Security
                  Benefits is {fullRetirementAgeYearsOnly} years
                  {fullRetirementAgeMonthsOnly
                ? " and " + fullRetirementAgeMonthsOnly + " months "
                : " "}
                  old
                  <a href="https://www.ssa.gov/OACT/ProgData/ar_drc.html">
                <sup>1</sup>
              </a>
                  , which is in year {retireDateYear}.
                  {
                 needsSSADetailCalc ? ( 
                  <WarningBox>
                    <label>
                      Your retirement eligibility may still be too many years away to calculate
                      your benefit without making some assumptions. To help, a recent Social
                      Security&apos;s Trustees Report<a href="https://www.ssa.gov/oact/tr/">
                <sup>2</sup>
              </a> is built into Detailed Calculator estimates. <p>At the results 
              page, try the included SSA Detailed Calculator rather than
                       our Windfall Awareness Calculator.</p></label>
                  </WarningBox>
                ) : (
                    ""
                  )}
            </div>
          </Card>
        )}
      </div>
    );
  }
}

export default function Prescreen1aWrapper() {
  const userStateActions = useUserStateActions()
  const userState = useUserState()
  return (
    <Prescreen1a userState={userState} userStateActions={userStateActions} />
  )
}
