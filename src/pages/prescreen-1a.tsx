import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { colors } from "../constants";
import { SessionStore } from "../library/session-store";
import dayjs from "dayjs";
import AgeSlider from '../components/age-slider'

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

export default class Prescreen1c extends React.Component {
  constructor(props, context){
    super(props, context)
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.state = {
      birthDate: null,
      retireAge: null
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

  handleDateChange(name, value){
    if (name === "birthDatePicked") {
      SessionStore.push("BirthDate", JSON.stringify(value))
      var year62 = new Date(value).getFullYear() + 62;
      SessionStore.push("Year62", year62)
      this.setRetireDate(value,this.state.retireAge)
      var state = {birthDate: value}
      this.setState(state)
    }
  }

  handleSliderChange(value) {
    this.setRetireDate(this.state.birthDate,value)
    SessionStore.push("RetireAge", value)
    this.setState({
      retireAge: value
    })
  }

  setRetireDate(dateOfBirth, retireAge) {
    var retireDate = dayjs(dateOfBirth).add(retireAge, 'years').toDate()
    SessionStore.push("RetireDate", JSON.stringify(retireDate))
  }

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
                    placeholderText="Click to select a date"
                    selected={this.state.birthDate}
                    showYearDropdown
                    openToDate={this.state.birthDate || dayjs().subtract(64, 'years').toDate()}
                    onChange={(value) => this.handleDateChange("birthDatePicked", value)}
                    />
                  </Card>
                  { this.state.retireAge !== null ?
                    <>
                    <Card>
                      <H4>Retirement Age</H4>
                      <p>You're retiring at age {this.state.retireAge}.</p>
                    </Card>
                    <AgeSlider age={this.state.retireAge} handleChange={this.handleSliderChange} />
                    </> : null
                  }
            </div>
         )
    }
}
