import React from "react"
import styled from "@emotion/styled";
import { ButtonLink, SEO, H2, Card, WarningBox, HelperText, Glossary } from "../components";
import * as ObsFuncs from "../library/observable-functions";
import { SessionStore } from "../library/session-store";
import { colors, fontSizes } from "../constants";

import AgeSlider from '../components/age-slider'
import MonthlyBenefit from '../components/monthly-benefit'
import 'rc-slider/assets/index.css';
import dayjs from "dayjs";

const ContentContainer = styled.div`
  max-width: 70%;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 330px;
  margin-top: 30px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`

const Text = styled.div`
  margin: 10px 5px 40px;
  font-size: ${fontSizes[1]};
`

export default class Screen2 extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.performCalc = this.performCalc.bind(this);

    this.state = {
      isLoaded: false,
      userProfile: {},
      userWEP: null
    }

    this.handleRetireChange = this.handleRetireChange.bind(this);
    this.computeUserCalc = this.computeUserCalc.bind(this);

  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      this.performCalc()
        .catch(err => {
          console.log('err', err)
          this.setState({
            isLoaded: true,
            error: 'Missing Info'
          })          
        } )
    }
  }

  async computeUserCalc(userDOR) {
    var earnings = JSON.parse(SessionStore.get("earnings"))['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings']
    var userYSE = ObsFuncs.getYearsSE(earnings)
    var year62 = JSON.parse(SessionStore.get("Year62"))
    var userDOB = new Date(JSON.parse(SessionStore.get("BirthDate"))).toLocaleDateString("en-US")
    if (SessionStore.get("coveredEmployment") && SessionStore.get("pensionOrRetirementAccount")) {
      this.state.userWEP = true;
      let userWEP = true;
    } else {
      this.state.userWEP = false;
      let userWEP = false;
    }
    
    let dob = dayjs(userDOB)
    let now = dayjs()
    let workerAge = now.diff(dob, "year")
    let userPension

    if (SessionStore.get("coveredEmployment")) {
      if (SessionStore.get("pensionOrRetirementAccount") === "MONTHLYPENSION") {
        // monthly
        userPension = Number(SessionStore.get("pensionAmount"))
      } else if (SessionStore.get("pensionOrRetirementAccount") === "LUMPSUMRETIREMENTACCOUNT") {
        // lump
        userPension = ObsFuncs.lumpSumToMonthly(
          SessionStore.get("pensionAmount"),
          dayjs(new Date(JSON.parse(SessionStore.get("dateAwarded"))).toLocaleDateString("en-US")),
          workerAge,
          dob
        )
        console.log('userPension', userPension)
      } else {
        // other
        userPension = undefined
      }
    } else {
      // no extra pension
      userPension = Number(SessionStore.get("pensionAmount"))
    }
    
    var userAIME = ObsFuncs.getAIMEFromEarnings(earnings, year62)
    var userCalc = await ObsFuncs.finalCalculation(userDOB, userDOR, year62, userYSE, userPension, userAIME)
    return userCalc
  }

  async performCalc() {
    var userDOB = new Date(JSON.parse(SessionStore.get("BirthDate"))).toLocaleDateString("en-US")
    var userDOR = new Date(JSON.parse(SessionStore.get("RetireDate"))).toLocaleDateString("en-US")
    var userCalc = await this.computeUserCalc(userDOR)
    SessionStore.push("UserProfile", JSON.stringify(userCalc))

    this.setState({
      isLoaded: true,
      userProfile: userCalc
    })

    var yearsDiff = dayjs(userDOR).year() - dayjs(userDOB).year()
    yearsDiff = yearsDiff < 62 ? 62 : yearsDiff > 70 ? 70 : yearsDiff
    this.handleRetireChange(yearsDiff)
  }

  async handleRetireChange(value) {
    var userDOB = new Date(JSON.parse(SessionStore.get("BirthDate"))).toLocaleDateString("en-US")
    var userDOR = dayjs(userDOB).add(value, 'years').toDate()
    var userCalc = await this.computeUserCalc(userDOR)
    this.setState({
      testAge: value,
      testProfile: userCalc
    })
  }

  render() {
    return (
      <React.Fragment>
        <SEO title="Screen 2" />
        <ContentContainer>
          <H2>Results</H2>
          {/* KNOWN ISSUE(tdk), if you change your WEP status, this does not update. We need a better state model */
          this.state.userWEP === true ?
            <WarningBox><label>Based on the information you provided,
            your benefits are affected by the Windfall Elimination Provision.
             The Windfall Elimination Provision is a Social Security rule that reduces retirement benefits for retirees
              with access to a pension based on non-covered employment. Click Benefit Formula at left to read more.
              </label></WarningBox>: ""}
          {this.state.error ? <WarningBox><label>Please go back and fill out all information to calculate results. </label></WarningBox> :



                  <Flex>
            <Text>Based on the information you provided, your retirement benefits will be calculated by Social Security as follows: </Text>
            <MonthlyBenefit text={'full retirement age'} number={this.state.userProfile["MPB"]} />
            {this.state.testAge ?
              <><Text>However, Social Security changes your monthly benefit amount if you begin to claim benefits before or after your full retirement age.
              Use the slider below to see how your planned date of retirement will affect your monthly benefit amount.
                    </Text>
                <AgeSlider age={this.state.testAge} handleChange={this.handleRetireChange} />
                <MonthlyBenefit text={`age ${this.state.testAge}`} number={this.state.testProfile && this.state.testProfile["MPB"]} /></> : null
            }
            <ButtonContainer>
              <ButtonLink to="/print/" disabled={this.state.error}>Print Results</ButtonLink>
            </ButtonContainer>
          </Flex>
          }
                </ContentContainer>
        <Glossary
          title='FULL RETIREMENT AGE'
          link="https://www.ssa.gov/planners/retire/retirechart.html"
          linkText=""
        >
          Your Full Retirement Age for Social Security is based on when you were born.
                </Glossary>
      </React.Fragment>
    )
  }

}
