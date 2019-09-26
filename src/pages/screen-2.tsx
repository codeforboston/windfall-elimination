import React from "react"
import { ButtonLink, ButtonLinkGreen, SEO, ObservableCell, Card, Message, HelperText } from "../components";
import * as ObsFuncs from "../library/observable-functions";
import { SessionStore } from "../library/session-store";

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
            <>
                <SEO title="Screen 2" />
                <h2>Results</h2>
                <Message>
                {this.state.error?<label>Please go back and fill out all information to calculate results. </label>: <label>
                    WEP calculated values
                        <HelperText>Based on the information you provided, your retirment benefits will be calculated by Social Security as follows: </HelperText>
                        <strong><code>${this.state.userProfile["MPB"] || null} per month</code></strong>
                 </label> }
                </Message>
                {this.state.error ? null: <Card>
                  However, Social Security changes your monthly benefit amount if you retire before or after your full retirement age. 
                  Use the slider below to see how your planned date of retirement will affect your monthly benefit amount.
                </Card>}
                <ButtonLinkGreen to="/prescreen-1c/">Go back!</ButtonLinkGreen>
                <ButtonLink to="/print/" disabled={this.state.error}>Print Results</ButtonLink>
                <ButtonLink to="/">Go Home</ButtonLink>
                <ButtonLink to="/">Further Info</ButtonLink>
            </>       
        )
    }

}
