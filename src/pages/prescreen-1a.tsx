import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
    this.state = {
      birthDate: null,
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

    if (SessionStore.get("RetireDate") && (this.state.retireDate === null)){
      var retiredate = new Date(JSON.parse(SessionStore.get("RetireDate")))
      this.setState({
        retireDate: retiredate
      })
    }
  }

  handleDateChange(name, value){
    if (name === "birthDatePicked") {
      SessionStore.push("BirthDate", JSON.stringify(value))
      var year62 = new Date(value).getFullYear() + 62;
      SessionStore.push("Year62", year62)
      var state = {birthDate: value}
      if (dayjs(value).isAfter(dayjs(this.state.retireDate).subtract(18, 'years'))) {
        state.retireDate = dayjs(value).add(18, 'years').toDate()
      }
      this.setState(state)
    } else {
      SessionStore.push("RetireDate", JSON.stringify(value))
      this.setState({
        retireDate: value
      })
    }
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
                  <Card>
                    <H4>Retire Date</H4>
                    <StyledDatePicker
                    disabled={ this.state.birthDate === null }
                    id="retireDatePicked"
                    placeholderText="Click to select a date"
                    selected={this.state.retireDate}
                    showYearDropdown
                    openToDate={ this.state.retireDate || dayjs(this.state.birthDate).add(62, 'years').toDate() }
                    minDate={dayjs(this.state.birthDate).add(18,'years').toDate()}
                    onChange={(value) => this.handleDateChange("retireDatePicked", value)}
                    />
                  </Card>
            </div>
         )
    }
}
