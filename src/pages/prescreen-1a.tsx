import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import * as ObsFuncs from "../library/observable-functions";
import { colors } from "../constants";
import { SessionStore } from "../library/session-store";
import dayjs from "dayjs";
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
  min-width: 230  px;
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

export default class Prescreen1c extends React.Component {
  constructor(props, context){
    super(props, context)
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      birthDate: null,
      retireAge: null,
      retireDate: null
    };
  }

  componentDidMount() {
    if (SessionStore.get("BirthDate") && (this.state.birthDate === null)){
      var birthdate = new Date(JSON.parse(SessionStore.get("BirthDate")))
      this.setState({
        birthDate: birthdate
      })

    }

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

  async handleDateChange(name, value){
    if (name === "birthDatePicked") {
      SessionStore.push("BirthDate", JSON.stringify(value))
      var year62 = new Date(value).getFullYear() + 62;
      SessionStore.push("Year62", year62)
      var fullRetirementAge = await ObsFuncs.getFullRetirementDateSimple(this.state.birthDate)
      this.setRetireDate(value, fullRetirementAge)
      var state = {birthDate: value}
      this.setState(state)
    }
  }

  async setRetireDate(dateOfBirth, retireAge) {
    var retireDate = dayjs(dateOfBirth).add(await retireAge, 'years').toDate()
    SessionStore.push("RetireDate", JSON.stringify(retireDate))
    this.setState({
      retireAge: JSON.stringify(retireAge),
      retireDate: JSON.stringify(retireDate),
      retireDateYear: JSON.stringify(retireDate.getFullYear()),
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
                    placeholderText="MM/YYYY"
                    dateFormat="MM/YYYY"
                    value={(this.state.birthDate)}
                    showYearDropdown
                    openToDate={this.state.birthDate || dayjs().subtract(64, 'years').toDate()}
                    onChange={async (value) => await this.handleDateChange("birthDatePicked", value)}
                    maxDetail="year"
                    />
                  </Card>
                  { this.state.retireDateYear && 
                    <Card>
                    <H4>Retirement Age</H4>
                    <p>Your Full Retirement Age (FRA) to collect Social Security
                       Benefits is {this.state.retireAge} years old, which is in
                        year {this.state.retireDateYear}.</p>
                  </Card>
                  }
            </div>
         )
    }
}
