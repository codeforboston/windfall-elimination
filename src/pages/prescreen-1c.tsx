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
  HelperText,
  StyledDatePicker
} from "../components";

export default class Prescreen1c extends React.Component {

    render() {
        return (
            <>
                <SEO title="Pre-Screen" keywords={[`gatsby`, `application`, `react`]} />
                <h2>Step 1: Background Information</h2>
                <TextBlock>
                    To calculate your Social Security benefit, please input the following dates.
                </TextBlock>
                <Card>
                  <StyledDatePicker
                  id="birthDatePicked"
                  placeholderText="Click to select a date"
                  selected={this.state.birthDate}
                  showYearDropdown
                  openToDate={dayjs().subtract(64, 'years').toDate()}
                  onChange={(value) => this.handleDateChange("birthDatePicked", value)}
                  />
                </Card>
                <Card>
                  <StyledDatePicker
                  id="retireDatePicked"
                  placeholderText="Click to select a date"
                  selected={this.state.retireDate}
                  showYearDropdown
                  openToDate={dayjs().subtract(2, 'years').toDate()}
                  onChange={(value) => this.handleDateChange("retireDatePicked", value)}
                  />
                </Card>
                <ButtonLinkRed to="/">Go back!</ButtonLinkRed>
                <ButtonLink to="/prescreen-2/">Start</ButtonLink>
            </>
         )
    }
}
