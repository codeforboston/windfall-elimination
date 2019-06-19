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
  SEO,
  SessionStore,
  FontControl
} from "../components";

export default class Prescreen1b extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelection = this.handleSelection.bind(this);

    this.state = {
      coveredEmployment: undefined,
      pensionOrRetirementAccount: undefined
    };
  }

  componentDidMount() {
    if (SessionStore.get("pensionOrRetirementAccount")) {
      this.setState({
        coveredEmployment: SessionStore.get("coveredEmployment") === "true",
        pensionOrRetirementAccount: SessionStore.get("pensionOrRetirementAccount") === "true"
      })
    }
  }

  componentDidUpdate() {
        FontControl.loadFont()
    }

  handleSelection(e) {
    var selectValue = e.target.value === "true"
    if (e.target.name === "coveredEmployment") {
      SessionStore.push("coveredEmployment", selectValue)
      this.setState({
        coveredEmployment: selectValue
      });
    } else if (e.target.name === "pensionOrRetirementAccount") {
      SessionStore.push("pensionOrRetirementAccount", selectValue)
      this.setState({
        pensionOrRetirementAccount: selectValue
      });
    }
  }

  render() {
    let haveAllRequiredQuestionsBeenAnswered;
    switch (this.state.coveredEmployment) {
      case true:
        haveAllRequiredQuestionsBeenAnswered =
          this.state.pensionOrRetirementAccount !== undefined;
        break;
      case false:
        haveAllRequiredQuestionsBeenAnswered = true;
        break;
      case undefined:
        haveAllRequiredQuestionsBeenAnswered = false;
        break;
    }

    return (
      <>
        <SEO
          title="Prescreen 1b"
          keywords={[`gatsby`, `application`, `react`]}
        />
        <h2>Am I affected by WEP?</h2>
        <Form>
          <Card>
            <QuestionText>
              Did you work in “non-covered” employment?
            </QuestionText>
            <HelperText>
              “Non-covered” employment is employment where your employer did not withhold Social Security taxes from your wages.
               These earnings will not show up on your Social Security earnings statement.
            </HelperText>
            <label>
              {" "}
              Yes
              <input
                type="radio"
                name="coveredEmployment"
                id="ce1"
                value="true"
                {...(this.state.coveredEmployment ? { checked: true } : {})}
                onClick={this.handleSelection}
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
                  : {})}
                onClick={this.handleSelection}
              />
            </label>
          </Card>
          {this.state.coveredEmployment && (
            <Card>
              <QuestionText>
                If yes: Do you have a pension or retirement account?
              </QuestionText>
              <HelperText>
              This can be either a monthly pension or a lump sum like a $401K. 
              It can be an employee-contribution-only plan or an employer/employee-matching contribution plan. 
              The important thing is whether you paid Social Security taxes on the money that went into this resource.
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
                    : {})}
                  onClick={this.handleSelection}
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
                    : {})}
                  onClick={this.handleSelection}
                />
              </label>
            </Card>
          )}
          {haveAllRequiredQuestionsBeenAnswered && (
            <Message>
              {this.state.coveredEmployment
                ? "You are probably affected by WEP. Proceed to the next screen."
                : "Congratulations! You’re probably not affected by WEP. Make sure that your earnings record is correct with the SSA to make sure you get the right amount of SSA benefits you’re entitled to, and report any significant changes in your income."}
            </Message>
          )}
        </Form>
        <ButtonLinkRed to="/prescreen-1/">Go back!</ButtonLinkRed>
        <ButtonLink
          to={this.state.coveredEmployment ? "/prescreen-1c/" : "/congrats/"}
          name="submitButton"
          disabled={!haveAllRequiredQuestionsBeenAnswered}
        >
          Submit
        </ButtonLink>
      </>
    );
  }
}
