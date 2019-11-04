import React from "react"
import styled from "@emotion/styled";
import { ButtonLink, SEO, H2, Card, Message, HelperText, Glossary } from "../components";
import * as ObsFuncs from "../library/observable-functions";
import { SessionStore } from "../library/session-store";
import { colors } from "../constants";


import Slider, { Range } from 'rc-slider';
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

export default class Screen2 extends React.Component {
    constructor(props, context){
        super(props, context)

        this.performCalc = this.performCalc.bind(this);

        this.state = {
            isLoaded: false,
            userProfile: {}
        }

        this.handleRetireChange = this.handleRetireChange.bind(this);
        this.computeUserCalc = this.computeUserCalc.bind(this);

      }

    componentDidMount(){
        if(!this.state.isLoaded){
            this.performCalc()
            .catch(err => this.setState({
                isLoaded: true,
                error: 'Missing Info'}))
        }
    }

    async computeUserCalc(userDOR) {
      var earnings = JSON.parse(SessionStore.get("earnings"))['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings']
      var userYSE = ObsFuncs.getYearsSE(earnings)
      var year62 = JSON.parse(SessionStore.get("Year62"))
      var userDOB = new Date(JSON.parse(SessionStore.get("BirthDate"))).toLocaleDateString("en-US")
      if (SessionStore.get("coveredEmployment") && SessionStore.get("pensionOrRetirementAccount")) {
        let userWEP = true;
      } else {
          let userWEP = false;
      }
      var userPension = Number(SessionStore.get("pensionAmount"))
      var userAIME = ObsFuncs.getAIMEFromEarnings(earnings, year62)
      var userCalc = await ObsFuncs.finalCalculation(userDOB, userDOR, year62, userYSE, userPension, userAIME)
      return userCalc
    }

    async performCalc(){
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
        return(
            <React.Fragment>
                <SEO title="Screen 2" />
                <ContentContainer>
                <H2>Results</H2>  
                {this.state.error?<label>Please go back and fill out all information to calculate results. </label>:
                <>
                 <HelperText>Based on the information you provided, your retirement benefits will be calculated by Social Security as follows: </HelperText>
                 <Card>
                  Monthly benefit at full retirement age:
                  <p><strong><code>${this.state.userProfile["MPB"] || null} per month</code></strong></p>
                  </Card>
                 </>
                 }
                {this.state.testAge ?
                <>
                <HelperText>
                  However, Social Security changes your monthly benefit amount if you retire before or after your full retirement age. 
                  Use the slider below to see how your planned date of retirement will affect your monthly benefit amount.
                </HelperText>
                <Slider
                  style = {{
                    marginTop: 60,
                    marginBottom: 60
                  }}
                  defaultValue = {this.state.testAge}
                  min={62} max={70}
                  marks=
                  {{
                    62:{
                      label: <strong>62</strong>,
                      style: {
                        color: colors.black,
                      }
                    },
                    70:{
                      label: <strong>70</strong>,
                      style: {
                        color: colors.black,
                      }
                    }
                  }}
                  step={1}
                  trackStyle={{ backgroundColor: colors.gray }}
                  handleStyle={{
                    borderRadius: 0,
                    height: 24,
                    width: 15,
                    marginTop: -10,
                    backgroundColor: colors.purple,
                    boxShadow: '0 0 0 0',
                    borderColor: 'transparent'
                  }}
                  dotStyle={{ visibility: 'hidden' }}
                  activeDotStyle={{ visibility: 'hidden' }}
                  railStyle={{ backgroundColor: colors.gray }}
                  onAfterChange={this.handleRetireChange}
                />
                <Card>
                Monthly benefit at age { this.state.testAge }:
                <p><strong><code>${this.state.testProfile && this.state.testProfile["MPB"]} per month</code></strong></p>
                </Card>
                </> : null
                }
                <ButtonContainer>
                <ButtonLink to="/print/" disabled={this.state.error}>Print Results</ButtonLink>
                </ButtonContainer>
                </ContentContainer>
                <Glossary 
                  title='“NON-COVERED” EMPLOYMENT'
                  link="https://www.ssa.gov/planners/retire/retirechart.html"
                  linkText=""
                >
                  Your Full Retirement Age for Social Security is based on when you were born.
                </Glossary>
          </React.Fragment>
        )
    }

}
