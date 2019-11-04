import React from "react"
import styled from "@emotion/styled";
import { ButtonLink, SEO, H2, Card, WarningBox, HelperText, Glossary } from "../components";
import * as ObsFuncs from "../library/observable-functions";
import { SessionStore } from "../library/session-store";

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
    }

    componentDidMount(){
        if(!this.state.isLoaded){
            this.performCalc()
            .catch(err => this.setState({
                isLoaded: true,
                error: 'Missing Info'}))
        }
    }

    async performCalc(){
        var earnings = JSON.parse(SessionStore.get("earnings"))['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings']

        var userYSE = ObsFuncs.getYearsSE(earnings)

        var year62 = JSON.parse(SessionStore.get("Year62"))

        var userDOB = new Date(JSON.parse(SessionStore.get("BirthDate"))).toLocaleDateString("en-US")

        var userDOR = new Date(JSON.parse(SessionStore.get("RetireDate"))).toLocaleDateString("en-US")

        if (SessionStore.get("coveredEmployment") && SessionStore.get("pensionOrRetirementAccount")) {
            let userWEP = true;
        } else {
            let userWEP = false;
        }

        var userPension = Number(SessionStore.get("pensionAmount"))

        var userAIME = ObsFuncs.getAIMEFromEarnings(earnings, year62)

        var userCalc = await ObsFuncs.finalCalculation(userDOB, userDOR, year62, userYSE, userPension, userAIME)

        SessionStore.push("UserProfile", JSON.stringify(userCalc))

        this.setState({
            isLoaded: true,
            userProfile: userCalc
        })
    }

    render() {
        return(
            <React.Fragment>
                <SEO title="Screen 2" />
                <ContentContainer>
                <H2>Results</H2>  
                {this.state.error?<WarningBox><label>Please go back and fill out all information to calculate results. </label></WarningBox>: <label>
                    WEP calculated values
                        <HelperText>Based on the information you provided, your retirement benefits will be calculated by Social Security as follows: </HelperText>
                        <strong><code>${this.state.userProfile["MPB"] || null} per month</code></strong>
                 </label> }
                {this.state.error ? null: <Card>
                  However, Social Security changes your monthly benefit amount if you retire before or after your full retirement age. 
                  Use the slider below to see how your planned date of retirement will affect your monthly benefit amount.
                </Card>}
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
