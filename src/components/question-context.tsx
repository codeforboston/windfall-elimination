import React from "react";
import { Card } from "../components";

type ContextProps = {
    // TODO flesh out values
    hasSocialSecurityAccount: boolean;
    nonCoveredEmployment: boolean;
    pensionOrRetirementAccount: boolean;
    dateOfBirth: string;
    socialSecurityBenefitsAmount: number;
    yearsOfSubstantialEarnings: number;
    amountOfNonCoveredPension: number;
};

const QuestionContext = React.createContext<ContextProps>(null!);

type Props = {};
type State = ContextProps;
export class QuestionProvider extends React.Component<Props, State> {
    public state: State = {
        hasSocialSecurityAccount: false,
        nonCoveredEmployment: false,
        pensionOrRetirementAccount: false,
        dateOfBirth: "",
        socialSecurityBenefitsAmount: 0,
        yearsOfSubstantialEarnings: 0,
        amountOfNonCoveredPension: 0,
    };
    public render() {
        const { children } = this.props;
        return (
            <QuestionContext.Provider value={{
                // TODO flesh out values
                hasSocialSecurityAccount: this.state.hasSocialSecurityAccount,
                nonCoveredEmployment: this.state.nonCoveredEmployment,
                pensionOrRetirementAccount: this.state.pensionOrRetirementAccount,
                dateOfBirth: this.state.dateOfBirth,
                socialSecurityBenefitsAmount: this.state.socialSecurityBenefitsAmount,
                yearsOfSubstantialEarnings: this.state.yearsOfSubstantialEarnings,
                amountOfNonCoveredPension: this.state.yearsOfSubstantialEarnings
            }}>
                {/* <QuestionValues values={this.state} /> */}
                { children }
            </QuestionContext.Provider>
        )
    }
}

export const QuestionConsumer = QuestionContext.Consumer;

type QuestionValuesProps = {
    values: ContextProps;
}
const QuestionValues: React.FC<QuestionValuesProps> = ({ values }) => (
    <Card>
        <div style={{ justifyContent: "left", display: "grid", textAlign: "left" }}>
            <b style={{ marginBottom: "15px" }}>Context values</b>
            <div>Social Security: {values.hasSocialSecurityAccount.toString()}</div>
            <div>Non-covered Employment: {values.nonCoveredEmployment.toString()}</div>
            <div>Pension or retirement Account: {values.pensionOrRetirementAccount.toString()}</div>
            <div>Date of birth: {values.dateOfBirth}</div>
            <div>Social Security benefits amount: {values.socialSecurityBenefitsAmount}</div>
            <div>Years of earnings: {values.yearsOfSubstantialEarnings}</div>
            <div>Amount of non-covered pension: {values.amountOfNonCoveredPension}</div>
        </div>
    </Card>
)