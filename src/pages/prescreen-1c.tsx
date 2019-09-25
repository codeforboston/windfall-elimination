import React from "react";
import { Link } from "gatsby";
import {
  ButtonLink,
  ButtonLinkRed,
  Card,
  Form,
  HelperText,
  Message,
  QuestionText,
  SEO
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
      coveredEmployment: undefined,
      pensionOrRetirementAccount: undefined,
      pensionType: undefined,
      pensionAmount: null
    };
  }

  componentDidMount() {
    if (SessionStore.get("pensionOrRetirementAccount")) {
      this.setState({
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
            <HelperText>
              “Non-covered” employment is employment where your employer did not
              withhold Social Security taxes from your wages. These earnings
              will not show up on your Social Security earnings statement.
              If you don't have your Social Security earnings statement, we
              will show you how to find it in the next step.
            </HelperText>
            <label>
              {" "}
              Yes
              <input
                type="radio"
                name="coveredEmployment"
                id="ce1"
                value="true"
                {...(this.state.coveredEmployment ? { checked: true } : { checked: false })}
                onChange={this.handleSelection}
              />
            </label>
            <label>
              {" "}
              No
              <input
                type="radio"
                name="coveredEmployment"
                id="ce2"
                value="false"
                {...(this.state.coveredEmployment === false
                  ? { checked: true }
                  : { checked: false })}
                onChange={this.handleSelection}
              />
              </label>
              <label>
              {" "}
              Not Sure
              <input
                type="radio"
                name="coveredEmployment"
                id="ce3"
                value="null"
                {...(this.state.coveredEmployment === null
                  ? { checked: true }
                  : { checked: false })}
                onChange={this.handleSelection}
              />
              </label>
          </Card>
          {this.state.coveredEmployment === null
            ? (<Message>
                <HelperText><div>You can contact your state’s Social Security Administrator
                to find out if your employment was covered.</div>
                <div>Find your state at&nbsp;
                <a href='http://www.ncsssa.org/statessadminmenu.html'>this website</a>.</div>
                <div>You should have your Social Security number ready when you call.</div>
                </HelperText>
              </Message>)
            : <div></div>
            }
          {this.state.coveredEmployment && (
            <Card>
              <QuestionText>
                Do you have a monthly pension, a 401(k), or
                other lump sum pension from that job?
              </QuestionText>
              <HelperText>
              It can be an employee-contribution-only plan or an employer/employee-matching contribution plan.
              </HelperText>
              <label>
                {" "}
                Yes
                <input
                  type="radio"
                  name="pensionOrRetirementAccount"
                  value="true"
                  {...(this.state.pensionOrRetirementAccount
                    ? { checked: true }
                    : { checked: false })}
                  onChange={this.handleSelection}
                />
              </label>
              <label>
                {" "}
                No
                <input
                  type="radio"
                  name="pensionOrRetirementAccount"
                  value="false"
                  {...(this.state.pensionOrRetirementAccount === false
                    ? { checked: true }
                    : { checked: false })}
                  onChange={this.handleSelection}
                />
              </label>
            </Card>
          )}
          { this.state.coveredEmployment &&
            this.state.pensionOrRetirementAccount && (
            <Card>
              <QuestionText>
                Are you receiving a:
              </QuestionText>
              <HelperText>
              It can be an employee-contribution-only plan or an employer/employee-matching contribution plan.
              </HelperText>
              <label>
                {" "}
                Monthly Pension
                <input
                  type="radio"
                  name="monthlyPension"
                  value="true"
                  {...(this.state.pensionType === "monthlyPension"
                    ? { checked: true }
                    : { checked: false })}
                  onChange={this.handleSelection}
                />
              </label>
              <label>
                {" "}
                Lump Sum
                <input
                  type="radio"
                  name="lumpSum"
                  value="false"
                  {...(this.state.pensionType === "lumpSum"
                    ? { checked: true }
                    : { checked: false })}
                  onChange={this.handleSelection}
                />
              </label>
            </Card>
          )}
          { this.state.pensionOrRetirementAccount &&
            this.state.pensionType && (
            <Card>
                <label>
                <h3>Pension Amount</h3>
                {this.state.pensionType === "monthlyPension"
                ? "Enter the amount of your monthly noncovered pension: "
                : "Enter the amount of your lump sum pension: "}
                <input name="pensionAmount" defaultValue={this.state.pensionAmount} onChange={this.handleSelection}></input>
                </label>
            </Card>
          )}
          {haveAllRequiredQuestionsBeenAnswered && (
            <Message>
              {this.state.coveredEmployment &&
              this.state.pensionOrRetirementAccount &&
              this.state.pensionType
                ? "You are probably affected by WEP. Proceed to the next screen."
                : "Congratulations! You’re probably not affected by WEP. Click 'Next' to calculate your Social Secuirty benefit."}
            </Message>
          )}
        </Form>
        <ButtonLinkRed to="/prescreen-1b/">Go back!</ButtonLinkRed>
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
