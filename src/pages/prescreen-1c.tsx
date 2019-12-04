import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Link } from "gatsby";
import { colors } from "../constants";
import dayjs from "dayjs";
import {
  Card,
  QuestionText,
  SEO,
  RadioButton,
  AnswerBox,
  LabelText,
  H2,
  Glossary,
  AnswerInput
} from "../components";
import { SessionStore } from "../library/session-store";
import { FontControl } from "../library/font-control";

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

const ContentContainer = styled.div`
  width: 100%;
`;

const CardGlossaryContainer = styled.div`
display: flex;
justify-content: space-between;
margin: auto 0;
`;

const TopQuestionAndTitle = styled.div`
width: 70%;
margin-bottom: 75px;
`;

function booleanFromString(s: string | null) {
  if (s) {
    return s === "true";
  } else {
    return null;
  }
}

enum PensionEnum {
	PENSION = "MONTHLYPENSION",
	LUMPSUM = "LUMPSUMRETIREMENTACCOUNT",
	NONEOFABOVE = "NONEOFABOVE",
}

export default class Prescreen1c extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleSelection = this.handleSelection.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      isLoaded: false,
      dateAwarded: null,
      coveredEmployment: null,
      pensionOrRetirementAccount: null,
      pensionType: null,
      pensionAmount: null
    }
  }

  componentDidMount() {
    if (SessionStore.get("dateAwarded") && (this.state.dateAwarded === null)){
      var dateAwarded = new Date(JSON.parse(SessionStore.get("dateAwarded")))
      this.setState({
        dateAwarded: dateAwarded
      })
    }

    if (!this.state.isLoaded) {
      this.setState({
        isLoaded: true,
        coveredEmployment:
          booleanFromString(SessionStore.get("coveredEmployment")),
        pensionOrRetirementAccount:
          SessionStore.get("pensionOrRetirementAccount"),
        pensionType: SessionStore.get("pensionType")
          ? SessionStore.get("pensionType")
          : null,
        pensionAmount: SessionStore.get("pensionAmount")
          ? SessionStore.get("pensionAmount")
          : 0
      });
    }
  }

  componentDidUpdate() {
    FontControl.loadFont();
  }
  
  handleDateChange(name, value){
    if (name === "dateAwardedPicked") {
      SessionStore.push("dateAwarded", JSON.stringify(value))
      var state = {dateAwarded: value}
      this.setState(state)
    }
  }
  
  handleSelection(e) {
    let selectValueString = e.target.value;
    let selectValue;

    switch (e.target.name) {
      case "coveredEmployment":
        selectValue = booleanFromString(selectValueString);
        SessionStore.push("coveredEmployment", selectValue);
        this.setState({
          coveredEmployment: selectValue
        });
        break;
      case "pensionOrRetirementAccount":
        SessionStore.push("pensionOrRetirementAccount", selectValueString);
        this.setState({
          pensionOrRetirementAccount: selectValueString
        });
        break;
      case "monthlyPension":
      case "lumpSum":
        SessionStore.push("pensionType", e.target.name);
        this.setState({
          pensionType: e.target.name
        });
        break;
      case "pensionAmount":
        SessionStore.push("pensionAmount", e.target.value);
        this.setState({
          pensionAmount: e.target.value
        });
        break;
    }
  }

  render() {
    return (
      <React.Fragment>
        <SEO
          title="Prescreen 1c"
          keywords={[`gatsby`, `application`, `react`]}
        />
        <ContentContainer>
          <CardGlossaryContainer>
          <TopQuestionAndTitle><H2>Step 3: Employment</H2>
            <Card>
              <QuestionText>
                Do you have earnings that do not show up on your Social Security
                record?
              </QuestionText>
              <AnswerBox>
                <RadioButton
                  type="radio"
                  name="coveredEmployment"
                  value="true"
                  {...(this.state.coveredEmployment === true
                    ? { checked: true }
                    : { checked: false })}
                  onChange={this.handleSelection}
                />
                <LabelText>Yes</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type="radio"
                  name="coveredEmployment"
                  value="false"
                  {...(this.state.coveredEmployment === false
                    ? { checked: true }
                    : { checked: false })}
                  onChange={this.handleSelection}
                />
                <LabelText>No</LabelText>
              </AnswerBox>
            </Card>
            </TopQuestionAndTitle>
            <Glossary
          title="WHAT EARNINGS WOULD NOT BE ON MY SOCIAL SECURITY EARNINGS RECORD?"
          link="http://www.ncsssa.org/statessadminmenu.html"
          linkText=""
        >
          For example, you may have worked for a state or local government, like
          a city or town or school system. In many states, state and local jobs
          do not pay into Social Security, which means earnings from these jobs
          will not show up on a Social Security record.
        </Glossary>
            </CardGlossaryContainer>
            {this.state.coveredEmployment && (
            <CardGlossaryContainer>
              <Card>
                <QuestionText>
                Do you have a pension or retirement account from
the work you did that does not show up on your
Social Security record?
                </QuestionText>
                <AnswerBox>
                  <RadioButton type="radio" name="pensionOrRetirementAccount" value={PensionEnum.PENSION} onChange={this.handleSelection} checked={this.state.pensionOrRetirementAccount === PensionEnum.PENSION} />
                  <LabelText>Monthly pension</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton type="radio" name="pensionOrRetirementAccount" value={PensionEnum.LUMPSUM} onChange={this.handleSelection} checked={this.state.pensionOrRetirementAccount === PensionEnum.LUMPSUM} />
                  <LabelText>Retirement account</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton type="radio" name="pensionOrRetirementAccount" value={PensionEnum.NONEOFABOVE} onChange={this.handleSelection} checked={this.state.pensionOrRetirementAccount === PensionEnum.NONEOFABOVE} />
                  <LabelText>None of the above</LabelText>
                </AnswerBox>
              </Card>
              <Glossary
              title="WHAT COUNTS AS A PENSION?"
              link="https://secure.ssa.gov/apps10/poms.nsf/lnx/0300605364"
              linkText="Read the Social Security Administration’s guidance on what counts as a pension here."
              >
              A pension can be a monthly pension paid our of your employer’s retirement fund, or a lump sum like a 401(k) or other retirement account based on non-covered employment.
              </Glossary>
            </CardGlossaryContainer>
            )}
            {this.state.coveredEmployment &&  this.state.pensionOrRetirementAccount && this.state.pensionOrRetirementAccount !== PensionEnum.NONEOFABOVE && (
              <>
              <Card>
                <label>
                  <QuestionText>
                    Please enter the amount of your pension or retirement account.
                  </QuestionText>
                  <AnswerInput
                    name="pensionAmount"
                    defaultValue={this.state.pensionAmount}
                    onChange={this.handleSelection}
                  ></AnswerInput>
                </label>
              </Card>
              {this.state.pensionOrRetirementAccount === PensionEnum.LUMPSUM && (
                <Card>
                    <QuestionText>
                      Please enter the date you become eligible to start withdrawing from the your retirement account without penalty.
                    </QuestionText>
                    <StyledDatePicker
                    id="dateAwardedPicked"
                    placeholderText="Click to select a date"
                    selected={this.state.dateAwarded}
                    showYearDropdown
                    openToDate={this.state.dateAwarded || dayjs().subtract(3, 'years').toDate()}
                    onChange={(value) => this.handleDateChange("dateAwardedPicked", value)}
                    />
                </Card>
              )}
              </>
            )}
        </ContentContainer>
      </React.Fragment>
    );
  }
}
