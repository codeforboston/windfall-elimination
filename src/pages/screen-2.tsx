import React from "react";
import styled from "@emotion/styled";
import {
  ButtonLink,
  SEO,
  H2,
  WarningBox,
  Glossary,
  AnswerBox,
  LabelText,
  RadioButton,
  QuestionText,
  Card,
  ContentContainer,
  CardGlossaryContainer,
} from "../components";
import * as ObsFuncs from "../library/observable-functions";
import { fontSizes } from "../constants";
import {
  UserState,
  useUserState,
  PensionEnum,
  UserProfile,
} from "../library/user-state-context";
import {
  UserStateActions,
  useUserStateActions,
} from "../library/user-state-actions-context";

import AgeSlider from "../components/age-slider";
import MonthlyBenefit from "../components/monthly-benefit";
import "rc-slider/assets/index.css";
import dayjs from "dayjs";
import { finalCalculation } from "../library/pia/index";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 330px;
  margin-top: 30px;
`;

const LeaveGutterAtRight = styled.div`
  width: 68%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Text = styled.div`
  margin: 10px 5px 40px;
  font-size: ${fontSizes[1]};
`;

const GlossaryContainer = styled.div`
  margin-left: 20px;
`;

interface Screen2Props {
  userState: UserState;
  userStateActions: UserStateActions;
}

interface Screen2State {
  desiredRetireDate: Date | null;
  userWEP: boolean | null;
  error: string | null;
  testAge: number | null;
  testAgeMonthsOnly: number | null;
  testAgeYearsOnly: number | null;
  testProfile: UserProfile | null;
}

export class Screen2 extends React.Component<Screen2Props, Screen2State> {

  public state: Screen2State = {
    desiredRetireDate: this.props.userState.retireDate,
    userWEP: null,
    error: null,
    testAge: null,
    testAgeMonthsOnly: this.props.userState.fullRetirementAgeMonthsOnly,
    testAgeYearsOnly: this.props.userState.fullRetirementAgeYearsOnly,
    testProfile: null,
  };

  componentDidMount() {
    const { userState } = this.props;
    const { preferPiaUserCalc, retireDate } = userState;

    this.performCalc(retireDate, preferPiaUserCalc).catch((err) => {
      console.error("err", err);
      this.setState({
        error: "Missing Info",
      });
    });
  }

  computeUserCalc = async (
    userDOR: Date,
    preferPiaUserCalcValue: boolean | null
  ): Promise<UserProfile> => {
    const {
      userState: {
        birthDate,
        earnings,
        year62,
        isEmploymentCovered,
        pensionOrRetirementAccount,
        pensionAmount,
        pensionDateAwarded,
        expectedLastEarningYear,
        awiTrendOrManualPrediction,
        awiTrendSelection,
        expectedPercentageWageIncrease
        // preferPiaUserCalc, //use the one passed in, in order to avoid localStorage delay.
      },
    } = this.props;
    if (!birthDate) throw Error();
    const userYSE = ObsFuncs.getYearsSE(earnings);
    const userDOB = birthDate.toLocaleDateString("en-US");

    this.setState({
      userWEP: isEmploymentCovered && pensionOrRetirementAccount !== null,
    });

    const dob = dayjs(userDOB);
    const now = dayjs();
    const workerAge = now.diff(dob, "year");
    let userPension;

    if (isEmploymentCovered) {
      if (pensionOrRetirementAccount === PensionEnum.PENSION) {
        // monthly
        userPension = pensionAmount;
      } else if (
        pensionDateAwarded &&
        pensionOrRetirementAccount === PensionEnum.LUMPSUM
      ) {
        // lump
        userPension = ObsFuncs.lumpSumToMonthly(
          pensionAmount,
          dayjs(pensionDateAwarded.toLocaleDateString("en-US")),
          workerAge,
          dob
        );
      } else {
        // other
        userPension = undefined;
      }
    } else {
      // no extra pension
      userPension = pensionAmount;
    }

    if (preferPiaUserCalcValue) {
      // Uses the wrapped Social Security AnyPIA.exe Detailed Calculator
      return await finalCalculation(userDOB, userDOR, userPension, earnings, expectedLastEarningYear, awiTrendOrManualPrediction,
        awiTrendSelection, expectedPercentageWageIncrease);
    } else {

      // Uses our Windfall Awareness Calculator implementation
      /* from https://github.com/feross/fromentries implements
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries */
      function ObjectFromEntries (iterable: any) {
        return [...iterable].reduce((obj, [key, val]) => {
          obj[key] = val
          return obj
        }, {})
      }
      //Windfall Calculator cannot handle years in the future
      //truncate away future earnings before passing it in.
      // Do not include the current year, because it will not be in maximum earnings table.
      const truncatedEarnings = ObjectFromEntries(Object.entries(earnings).filter(a => parseInt(a[0], 10) < dayjs().year()));
      const userAIME = ObsFuncs.getAIMEFromEarnings(truncatedEarnings, year62);
      //be aware: this userDOR may be accepting a string: ambiguous.
      return await ObsFuncs.finalCalculation(
        userDOB,
        userDOR,
        year62,
        userYSE,
        userPension,
        userAIME
      );
    }
  };

  performCalc = async (
    desiredRetireDateValue: Date,
    preferPiaUserCalcValue: boolean | null
  ) => {
    const {
      userState: { birthDate, retireDate },
      userStateActions: { setUserProfile },
    } = this.props;
    if (!birthDate || !retireDate) throw Error();

    const userDOB = birthDate.toLocaleDateString("en-US");
    const userCalc = await this.computeUserCalc(
      retireDate,
      preferPiaUserCalcValue
    );
    setUserProfile(userCalc);

    const yearsDiff = dayjs(desiredRetireDateValue).diff(dayjs(userDOB),'year');
    const monthsDiff = dayjs(desiredRetireDateValue).diff(dayjs(userDOB),'month') - (yearsDiff * 12);
    const clampedYearsDiff =
      yearsDiff < 62 ? 62 : yearsDiff > 70 ? 70 : yearsDiff;
    this.handleRetireChange(clampedYearsDiff, monthsDiff, preferPiaUserCalcValue);
  };

  handleRetireChange = async (
    ageYearsOnly: number,
    ageMonthsOnly: number,
    preferPiaUserCalcValue: boolean | null
  ) => {
    const {
      userState: { birthDate, preferPiaUserCalc },
    } = this.props;
    if (!birthDate) return;

    // use the passed in value for fast updating, fall back to sessionStorage.
    const preferPiaUserCalcValueFastOrSlow =
      preferPiaUserCalcValue || preferPiaUserCalc;

    const is62ZeroMonths = (ageYearsOnly === 62) && (ageMonthsOnly === 0);

    const is70Already = ageYearsOnly === 70;

    //if 70 yo, set month of retirement to 0, as 70 yo is the maximum retirement age. If 62 yo, set minimum months to 1, as 62 and 1 month is the minimum retirement age.
    const ageMonthsOnlyToUse = is70Already ? 0 : is62ZeroMonths ? 1 : ageMonthsOnly;

    const retireAge = ageYearsOnly + (ageMonthsOnlyToUse / 12);

    const userDOB = birthDate.toLocaleDateString("en-US");

    const userDOR = dayjs(userDOB)
      .add(ageYearsOnly, "year")
      .add(ageMonthsOnlyToUse, "month")
      .toDate();

    const userCalc = await this.computeUserCalc(
      userDOR,
      preferPiaUserCalcValueFastOrSlow
    );

    if (userCalc)
      this.setState({
        desiredRetireDate: userDOR,
        testAge: retireAge,
        testAgeYearsOnly: ageYearsOnly,
        testAgeMonthsOnly: ageMonthsOnlyToUse,
        testProfile: userCalc,
      });
  };

  render() {
    const { userState, userStateActions } = this.props;
    const { setPreferPiaUserCalc } = userStateActions;
    const { fullRetirementAge, fullRetirementAgeYearsOnly, fullRetirementAgeMonthsOnly, userProfile, preferPiaUserCalc, retireDate, birthDate } = userState;

    return (
      <React.Fragment>
        <SEO title="Screen 2" />
        <ContentContainer>
          <CardGlossaryContainer>
            <LeaveGutterAtRight>
              <H2>Results</H2>

              {this.state.userWEP === true ? (
                <WarningBox>
                  <label>
                    Based on the information you provided, your benefits are
                    affected by the Windfall Elimination Provision. The Windfall
                    Elimination Provision is a Social Security rule that reduces
                    retirement benefits for retirees with access to a pension
                    based on non-covered employment. Click Benefit Formula at
                    left to read more.
                  </label>
                </WarningBox>
              ) : null}
              {(this.state.error || !userProfile) && (
                <WarningBox>
                  <label>
                    Please go back and fill out all information to calculate
                    results.{" "}
                  </label>
                </WarningBox>
              )}
              <QuestionText>
                Which calculator would you like to see results of?
              </QuestionText>

              <Card>
                <AnswerBox>
                  <RadioButton
                    type="radio"
                    name="preferPiaUserCalc"
                    value="true"
                    onChange={() => {
                      setPreferPiaUserCalc(true);
                      this.performCalc(this.state.desiredRetireDate, true);
                    }}
                    checked={preferPiaUserCalc === true}
                  />
                  <LabelText>
                    SSA Detailed <br />
                    Calculator (AnyPIA-JS)
                  </LabelText>
                </AnswerBox>

                <AnswerBox>
                  <RadioButton
                    type="radio"
                    name="preferPiaUserCalc"
                    value="false"
                    onChange={() => {
                      setPreferPiaUserCalc(false);
                      this.performCalc(this.state.desiredRetireDate, false);
                    }}
                    checked={preferPiaUserCalc === false}
                  />
                  <LabelText>
                    Windfall Awareness
                    <br /> Calculator
                  </LabelText>
                </AnswerBox>
              </Card>
            </LeaveGutterAtRight>
              <Glossary title="Choice of Calculators">
                There are two calculators available to you. Choose the Social
                Security Detailed calculator if you are younger than 60 years
                old. Windfall Awareness calculator is more stable and so is the
                default, for now.
              </Glossary>
          </CardGlossaryContainer>

          {(!this.state.error && userProfile) && (
            <React.Fragment>
            <CardGlossaryContainer>
            <LeaveGutterAtRight>
              <Text>
                Based on the information you provided, your retirement benefits
                will be calculated by Social Security as follows:{" "}
              </Text>
                <MonthlyBenefit
                  text={"Full Retirement Age"}
                  number={userProfile["MPB"]}
                  isFRA={true}
                />
                </LeaveGutterAtRight>
                <Glossary title="FULL RETIREMENT AGE">
                  Your Full Retirement Age for Social Security is based on when
                  you were born.
                </Glossary>
              </CardGlossaryContainer>
              <CardGlossaryContainer>
              <LeaveGutterAtRight>
              {this.state.testAge ? (
                <>
                  <Text>
                    However, Social Security changes your monthly benefit amount
                    if you begin to claim benefits before or after your full
                    retirement age. Use the slider below to see how your planned
                    date of retirement will affect your monthly benefit amount.
                  </Text>
                  <AgeSlider
                    ageMonthsOnly={this.state.testAgeMonthsOnly}
                    ageYearsOnly={this.state.testAgeYearsOnly}
                    handleChange={this.handleRetireChange}
                    fullRetirementAge={fullRetirementAge ?? undefined}
                    fullRetirementAgeYearsOnly={fullRetirementAgeYearsOnly ?? undefined}
                    fullRetirementAgeMonthsOnly={fullRetirementAgeMonthsOnly ?? undefined}
                    fullRetirementDate={retireDate}
                    birthDate={birthDate}
                    preferPiaUserCalcValue={preferPiaUserCalc}
                  />
                  <MonthlyBenefit
                    text={`age ${this.state.testAgeYearsOnly} and ${this.state.testAgeMonthsOnly} months`}
                    number={
                      this.state.testProfile && this.state.testProfile["MPB"]
                    }
                    isFRA={this.state.testAge === fullRetirementAge}
                  />
                </>
              ) : null}
              </LeaveGutterAtRight>
              {preferPiaUserCalc && (
                <GlossaryContainer>
                <Glossary
                  title="Detailed Calculator"
                  link="https://www.ssa.gov/oact/anypia/anypia.html"
                  linkText="Info on the Detailed Calculator on SSA.gov"
                >
                  {userProfile.calculatorApp?.Description}
                </Glossary>
              </GlossaryContainer>
              )}
                              </CardGlossaryContainer>


              <ButtonContainer>
                <ButtonLink to="/print/" isDisabled={this.state.error !== null}>
                  Print Results
                </ButtonLink>
              </ButtonContainer>


            </React.Fragment>
          )}
        </ContentContainer>
      </React.Fragment>
    );
  }
}

export default function Screen2Wrapper(): JSX.Element {
  const userState = useUserState();
  const userStateActions = useUserStateActions();
  return <Screen2 userState={userState} userStateActions={userStateActions} />;
}
