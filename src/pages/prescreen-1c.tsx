import React from "react";
import { Link } from "gatsby";
import {
  ButtonLink,
  ButtonLinkGreen,
  Card,
  Form,
  HelperText,
  Message,
  QuestionText,
  SEO,
  RadioButton,
  AnswerBox, 
  LabelText,
  Glossary,
  AnswerInput
} from "../components";
import { SessionStore } from "../library/session-store";
import { FontControl } from "../library/font-control";

function trileanFromString(s:string|null) {
  if (s === null) {
    return undefined
  } else if (s === "null") {
    return null
  } else {
    return s === "true"
  }
}

export default class Prescreen1c extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelection = this.handleSelection.bind(this);

    this.state = {
      isLoaded: false,
      coveredEmployment: undefined,
      pensionOrRetirementAccount: undefined,
      pensionType: undefined,
      pensionAmount: null
    };
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      this.setState({
        isLoaded: true,
        coveredEmployment: trileanFromString(SessionStore.get("coveredEmployment")),
        pensionOrRetirementAccount: SessionStore.get("pensionOrRetirementAccount") === "true",
        pensionType: SessionStore.get("pensionType") ? SessionStore.get("pensionType") : undefined,
        pensionAmount: SessionStore.get("pensionAmount") ? SessionStore.get("pensionAmount") : 0
      })
    }
  }

  componentDidUpdate() {
        FontControl.loadFont()
    }

  handleSelection(e) {
    let selectValueString = e.target.value;
    let selectValue;

    switch (e.target.name) {
      case "coveredEmployment":
        selectValue = trileanFromString(selectValueString)
        SessionStore.push("coveredEmployment", selectValue)
        this.setState({
          coveredEmployment: selectValue
        });
        break;
      case "pensionOrRetirementAccount":
        selectValue = selectValueString === "true"
        SessionStore.push("pensionOrRetirementAccount", selectValue)
        this.setState({
          pensionOrRetirementAccount: selectValue
        });
        break;
      case "pensionOrRetirementAccount":
        selectValue = selectValueString === "true"
        SessionStore.push("pensionOrRetirementAccount", selectValue)
        this.setState({
          pensionOrRetirementAccount: selectValue
        });
        break;
      case "monthlyPension":
      case "lumpSum":
        SessionStore.push("pensionType", e.target.name)
        this.setState({
          pensionType: e.target.name
        });
        break;
      case "pensionAmount":
        SessionStore.push("pensionAmount", e.target.value)
        this.setState({
          pensionAmount: e.target.value
        });
        break;
    }
  }

  render() {
    let haveAllRequiredQuestionsBeenAnswered;
    switch (this.state.coveredEmployment) {
      case true:
        haveAllRequiredQuestionsBeenAnswered =
          this.state.pensionOrRetirementAccount !== undefined &&
          this.state.pensionType !== undefined ;
        break;
      case false:
        haveAllRequiredQuestionsBeenAnswered = true;
        break;
      case null:
          haveAllRequiredQuestionsBeenAnswered = false;
          break;
      case undefined:
        haveAllRequiredQuestionsBeenAnswered = false;
        break;
    }

    return (
      <>
        <SEO
          title="Prescreen 1c"
          keywords={[`gatsby`, `application`, `react`]}
        />
        <h2>Step 3: Employment History</h2>
        <Form>
          <Card>
            <QuestionText>
              Did you work in “non-covered” employment?
            </QuestionText>
            <AnswerBox>                 
              <RadioButton
                type="radio"
                name="coveredEmployment"
                id="ce1"
                value="true"
                {...(this.state.coveredEmployment ? { checked: true } : { checked: false })}
                onChange={this.handleSelection}
              />
              <LabelText>Yes</LabelText>
            </AnswerBox>
            <AnswerBox>
              <RadioButton
                type="radio"
                name="coveredEmployment"
                id="ce2"
                value="false"
                {...(this.state.coveredEmployment === false
                  ? { checked: true }
                  : { checked: false })}
                onChange={this.handleSelection}
              />
              <LabelText>No</LabelText>
              </AnswerBox>
          </Card>
          {this.state.coveredEmployment && (
            <Card>
              <QuestionText>
              Do you have a pension from your non-covered job?
              </QuestionText>
              <AnswerBox>
                <RadioButton
                  type="radio"
                  name="pensionOrRetirementAccount"
                  value="true"
                  {...(this.state.pensionOrRetirementAccount
                    ? { checked: true }
                    : { checked: false })}
                  onChange={this.handleSelection}
                />
                <LabelText>Yes</LabelText>
                </AnswerBox>
                <AnswerBox>
                
                <RadioButton
                  type="radio"
                  name="pensionOrRetirementAccount"
                  value="false"
                  {...(this.state.pensionOrRetirementAccount === false
                    ? { checked: true }
                    : { checked: false })}
                  onChange={this.handleSelection}
                />
                <LabelText>No</LabelText>
                </AnswerBox>
            </Card>
          )}
          { this.state.coveredEmployment &&
            this.state.pensionOrRetirementAccount && (
            <Card>
              <QuestionText>
              Do you have a monthly pension or a lump sum?
              </QuestionText>
              <AnswerBox>    
                <RadioButton
                  type="radio"
                  name="monthlyPension"
                  value="true"
                  {...(this.state.pensionType === "monthlyPension"
                    ? { checked: true }
                    : { checked: false })}
                  onChange={this.handleSelection}
                />
                <LabelText>Monthly Pension</LabelText>
              </AnswerBox>
              <AnswerBox>
                <RadioButton
                  type="radio"
                  name="lumpSum"
                  value="false"
                  {...(this.state.pensionType === "lumpSum"
                    ? { checked: true }
                    : { checked: false })}
                  onChange={this.handleSelection}
                />
                <LabelText>Lump Sum</LabelText>
                </AnswerBox>
            </Card>
          )}
          { this.state.pensionOrRetirementAccount &&
            this.state.pensionType && (
            <Card>
                <label>
                <h3>Please enter the amount of your pension or lump sum.</h3>
                <AnswerInput name="pensionAmount" defaultValue={this.state.pensionAmount} onChange={this.handleSelection}></AnswerInput>
                </label>
            </Card>
          )}
        </Form>
        <ButtonLinkGreen to="/prescreen-1b/">Go back!</ButtonLinkGreen>
        <ButtonLink
          to={"/screen-2/"}
          name="submitButton"
          disabled={!haveAllRequiredQuestionsBeenAnswered}
        >
          Next
        </ButtonLink>
      </>
    );
  }
}
