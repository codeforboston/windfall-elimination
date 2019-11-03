import styled from "@emotion/styled";
import React from "react";
import dayjs from "dayjs";
import DatePicker from "react-date-picker";
import { SessionStore } from "../library/session-store";
import {
  ButtonLink,
  ButtonLinkRed,
  TextBlock,
  SEO,
  ListText,
  LinkButton,
  Card,
  ObservableCell,
  HelperText
} from "../components";

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid #00003D;
  height: 60px;
  font-size: 25px;
  min-width: 150px;
  border-radius: 3px;
`;

export default class Prescreen1c extends React.Component {
  constructor(props, context){
    super(props, context)
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      birthDate: null,
      retireDate: null,
      today: new Date().toLocaleString()
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
      this.setState({
        birthDate: value
      })
    } else {
      SessionStore.push("RetireDate", JSON.stringify(value))
      this.setState({
        retireDate: value
      })
    }
  }

    render() {
        return (
            <>
                <SEO title="Pre-Screen" keywords={[`gatsby`, `application`, `react`]} />
                <h2>Step 1: Background Information</h2>
                <TextBlock>
                    To calculate your Social Security benefit, please input the following dates.
                </TextBlock>
                <Card>
                  Enter birth date here: <br></br>
                  <StyledDatePicker
                  id="birthDatePicked"
                  placeholderText="Click to select a date"
                  selected={this.state.birthDate}
                  showYearDropdown
                  openToDate={dayjs().subtract(64, 'years').toDate()}
                  onChange={(value) => this.handleDateChange("birthDatePicked", value)}
                  dayPlaceholder="01"
                  monthPlaceholder="01"
                  yearPlaceholder="1970"
                  />
                </Card>
                <Card>
                  Enter retire date here: <br></br>
                  <StyledDatePicker
                  id="retireDatePicked"
                  placeholderText="Click to select a date"
                  selected={this.state.retireDate}
                  showYearDropdown
                  openToDate={dayjs().subtract(2, 'years').toDate()}
                  onChange={(value) => this.handleDateChange("retireDatePicked", value)}
                  dayPlaceholder="01"
                  monthPlaceholder="01"
                  yearPlaceholder="2019"
                  />
                </Card>
                <ButtonLinkRed to="/">Go back!</ButtonLinkRed>
                <ButtonLink to="/prescreen-2/">Start</ButtonLink>
            </>
         )
    }
}
