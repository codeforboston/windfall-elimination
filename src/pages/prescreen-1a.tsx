import React from "react";
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
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { SessionStore } from "../library/session-store";

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
                <SEO title="Pre-Screen 1a" keywords={[`gatsby`, `application`, `react`]} />
                <h2>Step 1: Background Information</h2>
                <TextBlock>
                    To calculate your Social Security benefit, please input the following dates.
                </TextBlock>
                <Card>
                  <div style={{marginBottom: "10px"}}>
                    <div>Birthdate</div>
                    <DatePicker
                    id="birthDatePicked"
                    placeholderText="Click to select a date"
                    selected={this.state.birthDate}
                    onChange={this.handleDateChange}
                    showYearDropdown
                    openToDate={dayjs().subtract(65, 'years').toDate()}
                    onChange={(value) => this.handleDateChange("birthDatePicked", value)}
                    />
                    <label style={{marginLeft: '10px'}}>{this.state.birthDate !== null ? this.state.birthDate.toLocaleDateString("en-US") : null}</label>
                  </div>
                  <div>
                    <div>Retire Date</div>
                    <DatePicker
                    id="retireDatePicked"
                    placeholderText="Click to select a date"
                    selected={this.state.retireDate}
                    showYearDropdown
                    openToDate={dayjs().subtract(3, 'years').toDate()}
                    onChange={(value) => this.handleDateChange("retireDatePicked", value)}
                    />
                    <label style={{marginLeft: '10px'}}>{this.state.retireDate !== null ? this.state.retireDate.toLocaleDateString("en-US") : null}</label>
                  </div>
                </Card>
                <ButtonLinkRed to="/">Go back!</ButtonLinkRed>
                <ButtonLink to="/prescreen-1b/" style={{disabled: 'disabled-link'}}>Start</ButtonLink>
            </>
         )
    }
}
