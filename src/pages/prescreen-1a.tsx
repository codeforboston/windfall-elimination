import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as ObsFuncs from "../library/observable-functions";
import { colors } from "../constants";
import { SessionStore } from "../library/session-store";
import dayjs from "dayjs";

import {UserState, useUserState} from '../library/user-state-context'
import {UserStateActions, useUserStateActions} from '../library/user-state-actions-context'

import {
  TextBlock,
  SEO,
  Card,
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

interface Prescreen1aState {
  retireAge: number | null
}

class Prescreen1a extends React.Component<Prescreen1aProps, Prescreen1aState> {
  public state: Prescreen1aState = {
    retireAge: null,
  }
  constructor(props, context){
    super(props, context)
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    if (this.state.retireAge === null) {
      if (SessionStore.get("RetireAge") !== null) {
        var retireAge = JSON.parse(SessionStore.get("RetireAge"))
      } else {
        retireAge = 62
      }
      this.setState({
        retireAge: retireAge
      })
    }
  }

  async handleDateChange(name, value) {
    const {userStateActions, userState} = this.props
    const {birthDate} = userState
    if (name === "birthDatePicked") {
      userStateActions.setBirthDate(value)
      var year62 = new Date(value).getFullYear() + 62;
      SessionStore.push("Year62", year62)
      var fullRetirementAge = await ObsFuncs.getFullRetirementDateSimple(birthDate)
      this.setRetireDate(value, fullRetirementAge)
    }
  }

  async setRetireDate(dateOfBirth, retireAge) {
    const {userStateActions} = this.props
    var retireDate = dayjs(dateOfBirth).add(await retireAge, 'years').toDate()
    userStateActions.setRetireDate(retireDate)
    this.setState({
      retireAge: JSON.stringify(retireAge),
    })
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
        const {userState} = this.props
        const {birthDate, retireDate} = userState
        const retireDateYear = retireDate ? retireDate.getFullYear() : null
        return (
            <div>
                <SEO title="Pre-Screen 1a" keywords={[`gatsby`, `application`, `react`]} />
                <H2>Step 1: Background Information</H2>
                <TextBlock>
                    To calculate your Social Security benefit, please input the following dates.
                </TextBlock>
                  <Card>
                    <H4>Birthdate</H4>
                    <StyledDatePicker
                    id="birthDatePicked"
                    placeholderText="Click to select a date"
                    selected={birthDate}
                    showYearDropdown
                    openToDate={birthDate || dayjs().subtract(64, 'years').toDate()}
                    onChange={(value) => this.handleDateChange("birthDatePicked", value)}
                    />
                  </Card>
                  { retireDateYear && 
                    <Card>
                    <H4>Retirement Age</H4>
                    <p>Your Full Retirement Age (FRA) to collect Social Security
                       Benefits is {this.state.retireAge} years old, which is in
                        year {retireDateYear}.</p>
                  </Card>
                  }
            </div>
         )
    }
}

export default function Prescreen1aWrapper() {
  const userStateActions = useUserStateActions()
  const userState = useUserState()
  return (
    <Prescreen1a userState={userState} userStateActions={userStateActions} />
  )
}
